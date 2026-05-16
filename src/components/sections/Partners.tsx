"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import content from "@/content/content.json";

const categories = content.partners.categories;
const totalLogos = categories.reduce((sum, c) => sum + c.logos.length, 0);

export function Partners() {
  const tabs = ["전체", ...Array.from(new Set(categories.map((c) => c.title)))];

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

        <Tabs defaultValue="전체" className="mt-12">
          <TabsList className="flex h-auto w-full flex-wrap justify-center gap-1 bg-white p-1">
            {tabs.map((t) => (
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

          {Array.from(new Set(categories.map((c) => c.title))).map((title) => {
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
          <div
            key={logo}
            className="flex h-20 items-center justify-center rounded-xl border border-border/60 bg-white px-3 text-center text-sm font-semibold text-text-default transition hover:border-primary/40 hover:shadow-sm"
          >
            <span className="line-clamp-2 leading-tight">{logo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
