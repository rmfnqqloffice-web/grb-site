import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import { SpinBadge } from "@/components/fx/SpinBadge";
import content from "@/content/content.json";

export function Hero() {
  const { intro, company } = content;
  // "마케팅의 차이를 만듭니다." → 마지막 어절만 네이비, 나머지는 아웃라인 처리
  const subWords = intro.headline_sub.trim().split(" ");
  const subTail = subWords.pop() ?? "";
  const subHead = subWords.join(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-primary text-white"
    >
      <Container className="relative flex min-h-[600px] flex-col justify-center py-24 sm:py-28 md:py-32">
        <SpinBadge className="absolute right-6 top-16 hidden h-28 w-28 items-center justify-center rounded-full bg-secondary text-center text-[11px] font-bold uppercase leading-relaxed tracking-[0.08em] text-text-on-dark shadow-xl md:flex">
          <span aria-hidden>
            {company.name_en}
            <br />
            Performance
            <br />
            MKT
          </span>
        </SpinBadge>

        <Reveal>
          <h1
            id="hero-heading"
            className="text-5xl font-black leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl"
          >
            {intro.headline_main}
            <br />
            <span className="text-stroke-white">{subHead}</span>
            <br />
            <span className="text-secondary">{subTail}</span>
          </h1>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 max-w-2xl space-y-1.5 text-base text-white/88 sm:text-lg">
            {intro.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-8 py-3.5 text-base font-extrabold text-white transition hover:bg-secondary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              지금 문의하기 <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#services"
              className="inline-flex items-center rounded-full border-2 border-white/75 px-7 py-3 text-base font-bold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              서비스 살펴보기
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
