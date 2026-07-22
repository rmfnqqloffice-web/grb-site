import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import content from "@/content/content.json";

export function Services() {
  const items = content.services.items;
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-neutral py-20 sm:py-24">
      <Container>
        <Reveal>
          <h2
            id="services-heading"
            className="text-3xl font-black leading-[1.15] tracking-[-0.04em] text-secondary sm:text-4xl md:text-[44px]"
          >
            광고주에게 필요한 것만,
            <br />
            정확하게 제안합니다
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm text-text-muted sm:text-base">
            검색·바이럴·모바일·온라인·오프라인·언론·영상 — 7대 마케팅 채널에서 가장
            적합한 믹스를 설계합니다.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, idx) => (
            <Reveal key={s.no} delay={(idx % 3) * 80}>
              <article className="h-full rounded-[22px] border-2 border-transparent bg-white p-6 transition duration-200 hover:-translate-y-1 hover:-rotate-[0.5deg] hover:border-primary sm:p-7">
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-white">
                  {s.name.replace("마케팅", "")}
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-[-0.02em] text-secondary">
                  {s.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
