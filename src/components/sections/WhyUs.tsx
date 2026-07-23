import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import content from "@/content/content.json";

// 3개 가치제안을 한 단어 키워드로 압축 — D안 빅 스테이트먼트 리스트
const KEYWORDS = ["전문", "데이터", "다름"] as const;

export function WhyUs() {
  const items = content.value_propositions.items;
  return (
    <section id="why" aria-labelledby="why-heading" className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <h2
            id="why-heading"
            className="text-3xl font-black leading-[1.15] tracking-[-0.04em] text-secondary sm:text-4xl md:text-[44px]"
          >
            비슷해 보이는 마케팅,
            <br />
            결과는 완전히 다릅니다
          </h2>
        </Reveal>

        <div className="mt-10">
          {items.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 80}>
              <div className="grid grid-cols-1 items-start gap-3 border-t-2 border-secondary py-6 sm:grid-cols-[9ch_1fr] sm:gap-6">
                <p className="text-2xl font-black tracking-[-0.03em] text-secondary sm:text-[28px]">
                  {KEYWORDS[idx] ?? item.title}
                  <span className="text-primary">.</span>
                </p>
                <div>
                  <h3 className="text-base font-bold text-text-strong">{item.title}</h3>
                  <p className="mt-2 max-w-[66ch] text-sm leading-relaxed text-text-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
