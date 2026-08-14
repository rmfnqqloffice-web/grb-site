/**
 * View Transitions 회귀 테스트.
 *
 * 이 기능은 **조용히 죽는다** — 빌드도 타입체크도 통과하는데 전환만 안 일어난다.
 * 실제로 개발 중 두 번 그랬다:
 *   1) base-ui Tabs 가 onValueChange 직후 transition 밖에서 setValue 를 불러
 *      긴급 렌더가 startTransition 을 앞질렀다 → startViewTransition 호출 0회
 *   2) key 가 같은 로고를 React 가 재사용해 share 가 아니라 update 트리거였는데
 *      default="none" 이 그걸 막았다 → 이름조차 안 붙음
 * 둘 다 화면상으로는 "그냥 좀 밋밋하네" 정도라 눈으로는 놓치기 쉽다.
 *
 * 실행:
 *   npm i -D playwright-core          # 최초 1회 (상시 의존성으로는 넣지 않았다)
 *   npm run build && npm start        # 다른 터미널
 *   node scripts/verify-view-transitions.js
 *   BASE=http://localhost:3100 node scripts/verify-view-transitions.js   # 포트 변경 시
 *
 * 시스템 Chrome 을 쓴다(channel: "chrome"). playwright-core 는 전역/npx 로 충분하며
 * 이 저장소의 의존성에는 넣지 않았다.
 */
const { chromium } = require("playwright-core");

const BASE = process.env.BASE || "http://localhost:3000";
const ok = (b) => (b ? "PASS" : "FAIL");
let failures = 0;
function check(label, pass, detail) {
  if (!pass) failures += 1;
  console.log(`  [${ok(pass)}] ${label}${detail ? " — " + detail : ""}`);
}

/* startViewTransition 을 감싸 ①호출 여부 ②transition types ③전환 중 실제로 움직인 그룹을 기록한다.
   ★ view-transition-name 은 평상시 DOM 에 없다 — React 가 전환 시작 시점에 붙였다 끝나면 뗀다.
     그래서 정지 상태에서 getComputedStyle 로 찾으면 항상 0개다(첫 검증의 오판).
     대신 transition.ready 시점에 document.getAnimations() 로 생성된
     ::view-transition-group(<name>) 의사요소를 읽으면 무엇이 움직이는지 정확히 보인다. */
const PROBE = () => {
  window.__vt = { calls: [], groups: [] };
  const orig = document.startViewTransition;
  window.__vtSupported = typeof orig === "function";
  if (typeof orig === "function") {
    document.startViewTransition = function (arg) {
      const types =
        arg && typeof arg === "object" && arg.types ? Array.from(arg.types) : null;
      window.__vt.calls.push({ types });
      const t = orig.call(this, arg);
      if (t && t.ready && typeof t.ready.then === "function") {
        t.ready
          .then(() => {
            const groups = document
              .getAnimations()
              .map((a) => (a.effect && a.effect.pseudoElement) || "")
              .filter((p) => p.includes("view-transition"));
            window.__vt.groups.push(...groups);
          })
          .catch(() => {});
      }
      return t;
    };
  }
};

// 전환 중 잡힌 의사요소 목록에서 group 이름만 뽑는다.
const groupNames = (list) =>
  Array.from(
    new Set(
      list
        .map((p) => {
          const m = /::view-transition-(?:group|image-pair|old|new)\(([^)]+)\)/.exec(p);
          return m ? m[1] : null;
        })
        .filter(Boolean)
    )
  );

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const ctx = await browser.newContext({
    reducedMotion: "no-preference",
    viewport: { width: 1280, height: 900 },
  });
  await ctx.addInitScript(PROBE);
  const page = await ctx.newPage();

  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("console: " + m.text());
  });

  // 서버가 뜰 때까지 대기
  let up = false;
  for (let i = 0; i < 30 && !up; i += 1) {
    try {
      await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 4000 });
      up = true;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  if (!up) {
    console.log("서버에 접속하지 못했습니다:", BASE);
    process.exit(1);
  }

  console.log("\n== 환경 ==");
  const supported = await page.evaluate(() => window.__vtSupported);
  check("브라우저가 startViewTransition 지원", supported);

  /* ───────── 시안 A · Partners ───────── */
  console.log("\n== 시안 A · Partners (로고 타일 이동) ==");
  await page.locator("#partners").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const tilesBefore = await page.locator("#partners [role='tabpanel'] .grid > *").count();
  check("전체 탭에 78개 타일", tilesBefore === 78, `${tilesBefore}개`);

  // '뷰티' 탭으로 전환 — '전체'에도 있는 로고라 이동(share)이 형성돼야 한다.
  await page.evaluate(() => ((window.__vt.calls = []), (window.__vt.groups = [])));
  await page.locator('#partners [role="tab"]', { hasText: "뷰티" }).first().click();
  await page.waitForTimeout(1200);

  const vtA = await page.evaluate(() => window.__vt);
  check("탭 전환이 startViewTransition 을 발화시킴", vtA.calls.length > 0, `${vtA.calls.length}회 호출`);

  const gA = groupNames(vtA.groups);
  const logoGroups = gA.filter((n) => /^logo-\d+$/.test(n));
  check("전환 중 로고 그룹이 실제로 애니메이션됨", logoGroups.length > 0, `${logoGroups.length}개 그룹`);
  check("그룹 이름 중복 없음(중복 시 전환 취소됨)", new Set(gA).size === gA.length);

  const tilesAfter = await page.locator("#partners [role='tabpanel'] .grid > *").count();
  check("전환 후 타일 수가 바뀜", tilesAfter === 10, `${tilesBefore} → ${tilesAfter}개 (뷰티 10개)`);

  // 활성 탭이 브랜드 그린으로 표시되는지 (base-ui 시절 data-[state=active] 가 안 먹던 자리)
  const activeBg = await page.evaluate(() => {
    const el = document.querySelector('#partners [role="tab"][aria-selected="true"]');
    return el ? getComputedStyle(el).backgroundColor : null;
  });
  check("활성 탭이 브랜드 그린(#3a8d63)", activeBg === "rgb(58, 141, 99)", String(activeBg));

  // 전체로 복귀
  await page.evaluate(() => ((window.__vt.calls = []), (window.__vt.groups = [])));
  await page.locator('#partners [role="tab"]', { hasText: "전체" }).first().click();
  await page.waitForTimeout(1200);
  const vtBack = await page.evaluate(() => window.__vt);
  check("전체 탭 복귀도 전환 발화", vtBack.calls.length > 0, `${vtBack.calls.length}회`);

  // 키보드 접근성 — 화살표로 탭 이동이 되는지
  await page.locator('#partners [role="tab"][aria-selected="true"]').focus();
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(800);
  const afterKey = await page.locator('#partners [role="tab"][aria-selected="true"]').innerText();
  check("화살표 키로 탭 이동", afterKey.trim() !== "전체", `→ "${afterKey.trim()}"`);
  await page.locator('#partners [role="tab"]', { hasText: "전체" }).first().click();
  await page.waitForTimeout(700);

  /* ───────── 시안 B · Cases ───────── */
  console.log("\n== 시안 B · Cases (카드 → 상세 morph) ==");
  await page.locator("#cases").scrollIntoViewIfNeeded();
  // CountUp 이 1300ms 동안 0 → 목표값을 센다. 세는 도중에 누르면 카드와 상세의
  // 숫자가 달라 morph 가 어긋나므로, 실사용과 같게 완료를 기다린 뒤 클릭한다.
  await page.waitForTimeout(1800);

  const cardCount = await page.locator("#cases button[aria-label*='자세히 보기']").count();
  check("카드가 버튼으로 렌더(키보드 접근 가능)", cardCount === 3, `${cardCount}개`);

  // 첫 카드의 수치 텍스트를 기억해 상세에서 같은 값이 나오는지 본다.
  const kpiBefore = await page
    .locator("#cases button[aria-label*='자세히 보기']")
    .first()
    .locator("p")
    .nth(1)
    .innerText();

  await page.evaluate(() => ((window.__vt.calls = []), (window.__vt.groups = [])));
  await page.locator("#cases button[aria-label*='자세히 보기']").first().click();
  await page.waitForTimeout(1200);

  const vtB = await page.evaluate(() => window.__vt);
  check("카드 클릭이 startViewTransition 을 발화시킴", vtB.calls.length > 0, `${vtB.calls.length}회 호출`);
  const gB = groupNames(vtB.groups);
  check(
    "광고주명·수치가 공유 요소로 이어짐",
    gB.some((n) => n === "case-client-0") && gB.some((n) => n === "case-kpi-0"),
    gB.filter((n) => n.startsWith("case-")).join(", ") || "case-* 그룹 없음"
  );

  const backBtn = page.locator("#cases button", { hasText: "사례 전체 보기" });
  check("상세가 열림", (await backBtn.count()) === 1);

  const detailText = await page.locator("#cases article").innerText();
  check("상세에 서술(summary) 노출", detailText.includes("이전 대행사와 동일한 예산"));
  check("상세에 지표표 노출", detailText.includes("집행비용") && detailText.includes("전환단가"));

  const kpiAfter = await page.locator("#cases article p").nth(1).innerText();
  check("수치가 카드와 동일(morph 대상 일치)", kpiBefore.trim() === kpiAfter.trim(), `"${kpiBefore.trim()}" vs "${kpiAfter.trim()}"`);

  // B업체(2번째)의 집행 추이가 단계로 펼쳐지는지
  await backBtn.click();
  await page.waitForTimeout(700);
  await page.locator("#cases button[aria-label*='자세히 보기']").nth(1).click();
  await page.waitForTimeout(700);
  const bText = await page.locator("#cases article").innerText();
  check(
    "B업체 집행 추이가 단계로 펼쳐짐",
    bText.includes("4천만원") && bText.includes("1억원") && !bText.includes("4천만원 · 6천만원"),
    "join(' · ') 아님"
  );
  check("B업체 매체 before→after 노출", bText.includes("모비온") && bText.includes("집행 매체 변화"));

  // 목록 복귀 시 카드가 보이는 상태인지(Reveal 재실행으로 opacity 0 이 되지 않는지)
  await page.locator("#cases button", { hasText: "사례 전체 보기" }).click();
  await page.waitForTimeout(900);
  const opacities = await page.evaluate(() => {
    const btns = document.querySelectorAll("#cases button[aria-label*='자세히 보기']");
    return Array.from(btns).map((b) => {
      let el = b, o = 1;
      while (el && el !== document.body) {
        o = Math.min(o, parseFloat(getComputedStyle(el).opacity || "1"));
        el = el.parentElement;
      }
      return o;
    });
  });
  check(
    "목록 복귀 시 카드가 투명해지지 않음(Reveal 재실행 방지)",
    opacities.length === 3 && opacities.every((o) => o > 0.9),
    `opacity: ${opacities.map((o) => o.toFixed(2)).join(", ")}`
  );

  /* ───────── reduced-motion ───────── */
  console.log("\n== 접근성 ==");
  const ctx2 = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
  await ctx2.addInitScript(PROBE);
  const p2 = await ctx2.newPage();
  await p2.goto(BASE, { waitUntil: "domcontentloaded" });
  await p2.locator("#partners").scrollIntoViewIfNeeded();
  await p2.waitForTimeout(300);
  await p2.evaluate(() => (window.__vt.calls = []));
  await p2.locator('#partners [role="tab"]', { hasText: "뷰티" }).first().click();
  await p2.waitForTimeout(600);
  const callsRM = await p2.evaluate(() => window.__vt.calls);
  const tilesRM = await p2.locator("#partners .grid > *").count();
  check("reduced-motion 에서도 탭 전환 자체는 동작", tilesRM > 0, `${tilesRM}개 타일`);
  check("reduced-motion 에서 전환 호출은 유지(지속시간만 0)", callsRM.length > 0, `${callsRM.length}회`);
  await ctx2.close();

  console.log("\n== 페이지 오류 ==");
  check("JS 오류 없음", errors.length === 0, errors.slice(0, 3).join(" | ") || "없음");

  await browser.close();
  console.log(`\n결과: ${failures === 0 ? "전부 통과" : failures + "건 실패"}`);
  process.exit(failures === 0 ? 0 : 1);
})().catch((e) => {
  console.error("실행 오류:", e.message);
  process.exit(2);
});
