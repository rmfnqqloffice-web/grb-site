import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import { SpinBadge } from "@/components/fx/SpinBadge";
import { CASES } from "@/lib/cases";
import content from "@/content/content.json";

// 히어로(메인 개편, 시안 2) — 왼쪽은 지금 제목 3줄, 오른쪽은 동의받은 첫 사례의 숫자를 크게.
// 공개할 사례가 아직 없으면 오른쪽은 서비스 5묶음 목록으로 대신한다(빈 공간을 남기지 않는다).
export function Hero() {
  const { intro, company, services } = content;
  // "마케팅의 차이를 만듭니다." → 마지막 어절만 네이비, 나머지는 아웃라인 처리
  const subWords = intro.headline_sub.trim().split(" ");
  const subTail = subWords.pop() ?? "";
  const subHead = subWords.join(" ");
  const proof = CASES[0];

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-primary text-white"
    >
      <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:min-h-[620px] lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <Reveal>
            <h1
              id="hero-heading"
              className="text-5xl font-black leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl"
            >
              {intro.headline_main}
              <br />
              <span className="text-stroke-white">{subHead}</span>
              <br />
              <span className="text-secondary">{subTail}</span>
            </h1>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 max-w-xl space-y-1.5 text-base text-white/90 sm:text-lg">
              {intro.body.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-8 py-3.5 text-base font-extrabold text-white transition hover:bg-secondary/85 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                문의하기 <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="#services"
                className="inline-flex items-center rounded-full border-2 border-white/75 px-7 py-3 text-base font-bold text-white transition hover:bg-white/10 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                서비스 살펴보기
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <SpinBadge className="absolute -right-3 -top-12 z-10 hidden h-28 w-28 items-center justify-center rounded-full bg-secondary text-center text-[11px] font-bold uppercase leading-relaxed tracking-[0.08em] text-text-on-dark shadow-xl ring-4 ring-primary md:flex">
            <span aria-hidden>
              {company.name_en}
              <br />
              Performance
              <br />
              MKT
            </span>
          </SpinBadge>

          {proof ? (
            <div className="rounded-[24px] bg-secondary p-7 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.55)] sm:p-9">
              <p className="pr-16 text-[13px] font-bold text-primary-bright">
                {proof.industry} · {proof.period}
              </p>
              {/* 첫 화면에 바로 보이는 숫자라 세지 않고 최종값을 그대로 둔다(공유 미리보기·검색에도 같은 값) */}
              <p className="mt-4 text-6xl font-black leading-none tracking-[-0.04em] text-white tabular-nums sm:text-7xl">
                {proof.headline.value}
              </p>
              <p className="mt-3 text-base font-bold text-white/90">{proof.headline.label}</p>
              <a
                href="#cases"
                className="mt-7 inline-flex items-center gap-1.5 border-t border-white/15 pt-5 text-sm font-bold text-primary-bright underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-bright"
              >
                사례 자세히 보기 <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          ) : (
            <nav
              aria-label="그룹비 서비스"
              className="rounded-[24px] bg-secondary p-7 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.55)] sm:p-9"
            >
              <p className="pr-16 text-[13px] font-bold text-primary-bright">그룹비가 맡는 일</p>
              <ul className="mt-4 divide-y divide-white/10">
                {services.items.map((s) => (
                  <li key={s.key}>
                    <a
                      href="#services"
                      className="flex items-center justify-between gap-4 py-3.5 text-lg font-extrabold tracking-[-0.02em] text-white transition hover:text-primary-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-bright"
                    >
                      {s.name}
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/50" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
