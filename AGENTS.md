<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# grb-site 상시 규칙

> 2026-08-14 전 앱 감사 결과. 상세: `~/sites/AGENTS-audit-2026-08-14.md`

**1. `next.config.ts`에 `experimental.viewTransition`을 넣지 말 것** — 16.3에서 제거돼 `TS2353`으로 Production 빌드가 통째로 죽는다(2026-08-14 실제 발생). 로컬 설치본과 `package.json` 선언이 다르면 로컬만 통과하므로 배포 전 버전 대조.

**2. 커밋 author는 `rmfnqql.office@gmail.com`** — `@grb-mkt.com`으로 커밋하면 Vercel이 "Not authorized"로 거부하고, 빌드 실패로 오독하기 쉽다.

**3. 카피·연락처·사례·팀은 `src/content/content.json` 단일 소스** — page/sections/jsonld/footer 등 10곳이 여기서 import한다. 컴포넌트에 하드코딩 금지. (**README의 "sections 컴포넌트만 수정" 안내는 틀렸다.**)

**4. ViewTransition은 조용히 죽는다** — 빌드·타입체크를 통과하고 화면도 멀쩡한데 애니메이션만 사라진다. `Cases.tsx`·`Partners.tsx` 수정 시 `npm run build && npm start` 후 `node scripts/verify-view-transitions.js` 회귀 필수(npm script에 미등록). base-ui `Tabs`로 탭 상태를 넘기지 말 것.

**5. 경계** — DB·서버액션·env가 없는 1페이지 마케팅 사이트다. 도메인은 Cloudflare **DNS-only**(프록시를 켜면 SSL 실패), `agency.grb-mkt.com`은 별개 프로젝트(adrrow-site)이니 건드리지 않는다.
