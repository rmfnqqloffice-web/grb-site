"use client";

import { startTransition, useState, ViewTransition } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import content from "@/content/content.json";

const categories = content.partners.categories;
const totalLogos = categories.reduce((sum, c) => sum + c.logos.length, 0);

// view-transition-name 은 CSS 식별자라 로고명을 그대로 쓸 수 없다
// (L'OCCITANE·B*Hands·Dr.Jart+·KBS라디오 kong 처럼 따옴표·별표·플러스·공백이 섞여 있다).
// content.json 등장 순서로 안정적인 이름을 만든다 — 정적 JSON이라 서버·클라이언트 결과가 같다.
const LOGO_VT_NAME = new Map<string, string>();
for (const c of categories) {
  for (const logo of c.logos) {
    if (!LOGO_VT_NAME.has(logo)) LOGO_VT_NAME.set(logo, `logo-${LOGO_VT_NAME.size + 1}`);
  }
}

export function Partners() {
  const titles = Array.from(new Set(categories.map((c) => c.title)));
  const [tab, setTab] = useState("전체");

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

        <Tabs
          value={tab}
          // ★ 일반 setState 는 View Transition 을 발화시키지 않는다. startTransition 안에서
          //   바꿔야 브라우저가 전환을 시작하고, 살아남는 로고가 새 자리로 이동한다.
          //   (그래서 defaultValue 비제어 방식에서 value 제어 방식으로 바꿨다.)
          onValueChange={(value) => startTransition(() => setTab(String(value)))}
          className="mt-12"
        >
          <TabsList className="flex h-auto w-full flex-wrap justify-center gap-1 bg-white p-1">
            {["전체", ...titles].map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="rounded-md px-4 py-2 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="전체" className="mt-10">
            <div className="space-y-10">
              {categories.map((cat) => (
                <CategoryBlock
                  key={`${cat.slide}-${cat.title}`}
                  title={cat.title}
                  logos={cat.logos}
                />
              ))}
            </div>
          </TabsContent>

          {titles.map((title) => {
            const all = categories
              .filter((c) => c.title === title)
              .flatMap((c) => c.logos);
            return (
              <TabsContent key={title} value={title} className="mt-10">
                <CategoryBlock title={title} logos={all} hideTitle />
              </TabsContent>
            );
          })}
        </Tabs>
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
      {!hideTitle && (
        <h3 className="mb-4 text-base font-semibold text-text-strong">
          {title}
          <span className="ml-2 text-xs font-medium text-text-muted">
            ({logos.length})
          </span>
        </h3>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {logos.map((logo) => (
          // ViewTransition 은 DOM 을 만들지 않고 자식에 이름만 붙이므로 그리드 배치는 그대로다.
          // share: 다른 카테고리에도 있는 로고 → 새 자리로 이동
          // enter/exit: 이번 카테고리에만 있거나 빠지는 로고 → 페이드
          // default="none": 무관한 전환에서 78개가 한꺼번에 깜빡이는 걸 막는다
          <ViewTransition
            key={logo}
            name={LOGO_VT_NAME.get(logo)}
            share="logo-move"
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
