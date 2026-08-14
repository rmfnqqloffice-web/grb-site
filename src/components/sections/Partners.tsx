"use client";

import { startTransition, useRef, useState, ViewTransition } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { cn } from "@/lib/utils";
import content from "@/content/content.json";

const categories = content.partners.categories;
const totalLogos = categories.reduce((sum, c) => sum + c.logos.length, 0);
const TITLES = Array.from(new Set(categories.map((c) => c.title)));
const TABS = ["전체", ...TITLES];

// view-transition-name 은 CSS 식별자라 로고명을 그대로 쓸 수 없다
// (L'OCCITANE·B*Hands·Dr.Jart+·KBS라디오 kong 처럼 따옴표·별표·플러스·공백이 섞여 있다).
// content.json 등장 순서로 안정적인 이름을 만든다 — 정적 JSON이라 서버·클라이언트 결과가 같다.
const LOGO_VT_NAME = new Map<string, string>();
for (const c of categories) {
  for (const logo of c.logos) {
    if (!LOGO_VT_NAME.has(logo)) LOGO_VT_NAME.set(logo, `logo-${LOGO_VT_NAME.size + 1}`);
  }
}

function logosOf(title: string) {
  return categories.filter((c) => c.title === title).flatMap((c) => c.logos);
}

/**
 * ★ shadcn/base-ui Tabs 를 쓰지 않고 탭을 직접 구현한 이유
 *
 * base-ui TabsRoot 는 값이 바뀔 때 onValueChange(내 콜백)를 부른 **직후** 자체 setValue 를
 * transition 밖에서 호출한다. 그러면 긴급 렌더가 startTransition 렌더를 앞질러 커밋되고,
 * React 는 바꿀 게 없어져 startViewTransition 을 아예 호출하지 않는다.
 * (실측: 탭 전환 시 startViewTransition 호출 0회 → 전환이 통째로 죽어 있었다.)
 *
 * 콘텐츠 렌더를 순전히 이 컴포넌트의 state 에만 의존시켜야 전환이 살아난다.
 * 대신 WAI-ARIA 탭 패턴(roving tabIndex·화살표·Home/End)을 직접 구현한다.
 */
export function Partners() {
  const [tab, setTab] = useState("전체");
  const listRef = useRef<HTMLDivElement>(null);
  const activeIndex = TABS.indexOf(tab);
  // 전체든 개별이든 '카테고리 블록의 배열'로 같은 모양을 유지한다.
  const blocks = tab === "전체" ? categories : [{ title: tab, logos: logosOf(tab) }];

  function select(next: string) {
    if (next === tab) return;
    // 일반 setState 는 View Transition 을 발화시키지 않는다.
    startTransition(() => setTab(next));
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const i = TABS.indexOf(tab);
    let next: string | null = null;
    if (event.key === "ArrowRight") next = TABS[(i + 1) % TABS.length];
    else if (event.key === "ArrowLeft") next = TABS[(i - 1 + TABS.length) % TABS.length];
    else if (event.key === "Home") next = TABS[0];
    else if (event.key === "End") next = TABS[TABS.length - 1];
    if (!next) return;
    event.preventDefault();
    select(next);
    listRef.current
      ?.querySelector<HTMLButtonElement>(`[data-tab="${TABS.indexOf(next)}"]`)
      ?.focus();
  }

  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="bg-neutral py-24 sm:py-28"
    >
      <Container>
        <SectionHeader
          eyebrow="Partner & Client"
          title={
            <span id="partners-heading">
              <span className="text-primary-strong">{totalLogos}+</span> 브랜드와 함께해온 경험
            </span>
          }
          description="다양한 산업군의 광고주가 그룹비의 마케팅 역량을 신뢰합니다."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12">
          <div
            ref={listRef}
            role="tablist"
            aria-label="파트너 카테고리"
            onKeyDown={onKeyDown}
            className="flex w-full flex-wrap justify-center gap-1 rounded-lg bg-white p-1"
          >
            {TABS.map((t, i) => {
              const active = t === tab;
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  id={`partners-tab-${i}`}
                  data-tab={i}
                  aria-selected={active}
                  aria-controls="partners-panel"
                  // roving tabIndex — 탭 목록에는 Tab 키로 한 번만 들어오고, 안에서는 화살표로 이동한다.
                  tabIndex={active ? 0 : -1}
                  onClick={() => select(t)}
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                    active
                      ? "bg-primary text-white"
                      : "text-text-muted hover:bg-neutral hover:text-text-strong",
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="partners-panel"
            aria-labelledby={`partners-tab-${activeIndex}`}
            className="mt-10"
          >
            {/* ★ 전체 탭과 개별 탭의 DOM 모양이 같아야 한다. 한쪽만 래퍼가 있거나 제목이
                조건부로 빠지면 React 가 서브트리를 통째로 갈아끼우며 안쪽 ViewTransition 을
                추적하지 못한다(실측: 그 구조일 때 전환 중 view-transition-name 이 0개).
                그래서 양쪽 다 '카테고리 블록의 배열'로 두고, key 도 탭에 의존시키지 않아
                같은 카테고리는 재사용되게 한다. */}
            <div className="space-y-10">
              {blocks.map((cat) => (
                <CategoryBlock
                  key={cat.title}
                  title={cat.title}
                  logos={cat.logos}
                  hideTitle={tab !== "전체"}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CategoryBlock({
  title,
  logos,
  hideTitle = false,
}: {
  title: string;
  logos: string[];
  hideTitle?: boolean;
}) {
  return (
    <div>
      {/* ★ 제목은 조건부로 빼지 않고 항상 렌더한다. 조건부로 DOM 이 사라지면 전체/개별 탭의
          트리 모양이 갈라져 안쪽 ViewTransition 이 추적되지 않는다(실측 name 0개).
          개별 탭에서는 탭 라벨과 중복이므로 시각적으로만 숨긴다 — sr-only 는 레이아웃을
          차지하지 않고 스크린리더에는 그대로 읽힌다. */}
      <h3
        className={cn(
          "mb-4 text-base font-semibold text-text-strong",
          hideTitle && "sr-only",
        )}
      >
        {title}
        <span className="ml-2 text-xs font-medium text-text-muted">
          ({logos.length})
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {logos.map((logo) => (
          // ★ key 가 같은 로고는 React 가 재사용한다. 언마운트/마운트가 아니므로
          //   share 가 아니라 **update** 트리거다(자리만 옮기는 경우).
          //   update 를 빼면 default="none" 에 걸려 이름조차 붙지 않아 전환이 죽는다.
          //   share 는 짝으로 잡히는 경우, enter/exit 는 이번 탭에만 있거나 빠지는 로고용.
          <ViewTransition
            key={logo}
            name={LOGO_VT_NAME.get(logo)}
            share="logo-move"
            update="logo-move"
            enter="logo-in"
            exit="logo-out"
            default="none"
          >
            <div className="flex h-20 items-center justify-center rounded-xl border border-border/60 bg-white px-3 text-center text-sm font-semibold text-text-default transition hover:border-primary/40 hover:shadow-sm">
              <span className="line-clamp-2 leading-tight">{logo}</span>
            </div>
          </ViewTransition>
        ))}
      </div>
    </div>
  );
}
