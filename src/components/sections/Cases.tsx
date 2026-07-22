import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import { CountUp } from "@/components/fx/CountUp";
import content from "@/content/content.json";

type Metric = {
  label: string;
  before?: string;
  after?: string;
  values?: string[];
};

// 각 사례의 대표 성과 수치 — content.json metrics의 최종값을 대형 카운터로 강조
const HIGHLIGHTS = [
  { to: 1532, prefix: "", suffix: "건", caption: "판매 1,095건 → 1,532건 · 동일 예산" },
  { to: 180, prefix: "", suffix: "%", caption: "ROAS 50% → 180% · 월 1억원 스케일업" },
  { to: 58, prefix: "+", suffix: "%", caption: "전환율 상승 · 단가 1.9만 → 1.2만원" },
] as const;

export function Cases() {
  const items = content.achievements.items;

  return (
    <section
      id="cases"
      aria-labelledby="cases-heading"
      className="bg-secondary py-20 text-text-on-dark sm:py-24"
    >
      <Container>
        <Reveal>
          <h2
            id="cases-heading"
            className="text-3xl font-black leading-[1.15] tracking-[-0.04em] text-white sm:text-4xl md:text-[44px]"
          >
            숫자가 증명합니다
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm text-white/65 sm:text-base">
            동일 예산으로 더 많은 전환을, 같은 채널에서 더 낮은 단가를 — 실제
            광고주의 Before / After 결과입니다.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {items.map((c, idx) => {
            const hl = HIGHLIGHTS[idx % HIGHLIGHTS.length];
            return (
              <Reveal key={c.client} delay={(idx % 3) * 90}>
                <article className="h-full rounded-[20px] border border-white/12 bg-white/5 p-6 sm:p-7">
                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-bright">
                    {c.client}
                  </p>
                  <p className="mt-3 text-5xl font-black leading-none tracking-[-0.04em] text-white sm:text-[52px]">
                    <CountUp to={hl.to} prefix={hl.prefix} suffix={hl.suffix} />
                  </p>
                  <p className="mt-2 text-xs text-white/55">{hl.caption}</p>

                  <p className="mt-4 text-[13px] leading-relaxed text-white/75">{c.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(c.channels ?? c.channels_after ?? []).map((ch) => (
                      <span
                        key={ch}
                        className="rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white/70"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2 border-t border-white/12 pt-4">
                    {(c.metrics as Metric[]).map((m) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between gap-4 text-xs"
                      >
                        <span className="font-medium text-white/60">{m.label}</span>
                        <div className="flex items-center gap-2 font-mono">
                          {m.before && (
                            <>
                              <span className="text-white/40 line-through">{m.before}</span>
                              <span className="text-white/40">→</span>
                            </>
                          )}
                          {m.after && (
                            <span className="font-bold text-primary-bright">{m.after}</span>
                          )}
                          {m.values && (
                            <span className="font-bold text-primary-bright">
                              {m.values.join(" · ")}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
