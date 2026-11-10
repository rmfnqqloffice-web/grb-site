import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import content from "@/content/content.json";

// 일하는 방식(메인 개편) — 팀 비율 막대 대신 실제 진행 순서. 순서가 정보라 번호를 쓴다.
// 넓은 화면은 가로 흐름(번호를 잇는 선), 휴대폰은 세로 흐름.
export function Process() {
  const p = content.process;
  return (
    // 보조 정보라 다른 구역보다 위아래 여백을 한 단계 줄인다(구역마다 강약)
    <section id="process" aria-labelledby="process-heading" className="bg-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <h2
            id="process-heading"
            className="text-3xl font-black leading-[1.15] tracking-[-0.04em] text-secondary sm:text-4xl md:text-[44px]"
          >
            {p.heading}
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm text-text-muted sm:text-base">{p.description}</p>
        </Reveal>

        {/* role="list": 목록 표시를 지운 ol 은 Safari·VoiceOver 가 목록으로 읽지 않는다 */}
        <ol role="list" className="mt-10 grid gap-8 lg:grid-cols-5 lg:gap-6">
          {p.items.map((step, i) => (
            <li key={step.name} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 lg:block">
              {/* 다음 단계로 잇는 선 — 휴대폰은 세로, 넓은 화면은 가로(장식) */}
              {i < p.items.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[1.375rem] top-12 h-[calc(100%-1rem)] w-0.5 bg-tertiary/40 lg:left-14 lg:right-0 lg:top-[1.375rem] lg:h-0.5 lg:w-auto"
                />
              )}
              <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-secondary bg-white text-base font-black text-secondary tabular-nums">
                {i + 1}
              </span>
              <Reveal delay={i * 70} className="lg:mt-5">
                <h3 className="text-lg font-extrabold tracking-[-0.02em] text-secondary">{step.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
