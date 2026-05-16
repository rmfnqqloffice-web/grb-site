import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import content from "@/content/content.json";

export function Services() {
  const items = content.services.items;
  return (
    <section id="services" aria-labelledby="services-heading" className="py-24 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Services"
          title={
            <span id="services-heading">
              7대 마케팅으로<br className="hidden sm:block" /> 광고주의 성과를 만듭니다
            </span>
          }
          description="검색·바이럴·모바일·온라인·오프라인·언론·영상 — 광고주에게 가장 적합한 채널 믹스를 제안합니다."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((s) => (
            <article
              key={s.no}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <span
                className="absolute -bottom-3 -right-1 text-8xl font-extrabold leading-none text-primary opacity-[0.08] transition group-hover:opacity-15"
                aria-hidden
              >
                {s.no}
              </span>
              <div className="relative">
                <span className="inline-block h-1.5 w-10 rounded-full bg-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-bold text-text-strong">
                  {s.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
