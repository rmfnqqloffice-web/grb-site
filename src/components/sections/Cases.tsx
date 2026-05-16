import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import content from "@/content/content.json";

type Metric = {
  label: string;
  before?: string;
  after?: string;
  values?: string[];
};

// A/B/C 사례를 Primary/Secondary/Tertiary로 매핑하여 4색 팔레트만으로 시각 구분
const ACCENT_TOKENS = [
  { bg: "bg-primary", text: "text-primary-strong", pill: "bg-primary-soft" },
  { bg: "bg-secondary", text: "text-secondary", pill: "bg-secondary/10" },
  { bg: "bg-tertiary", text: "text-tertiary-strong", pill: "bg-tertiary/15" },
] as const;

export function Cases() {
  const items = content.achievements.items;

  return (
    <section
      id="cases"
      aria-labelledby="cases-heading"
      className="bg-neutral py-24 sm:py-28"
    >
      <Container>
        <SectionHeader
          eyebrow="Achievement"
          title={
            <span id="cases-heading">
              숫자로 증명하는 <span className="text-primary-strong">퍼포먼스</span>
            </span>
          }
          description="동일 예산으로 더 많은 전환을, 같은 채널에서 더 낮은 단가를. 실제 광고주의 Before / After 결과입니다."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {items.map((c, idx) => {
            const accent = ACCENT_TOKENS[idx % ACCENT_TOKENS.length];
            return (
              <article
                key={c.client}
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-white p-7 shadow-sm"
              >
                <span
                  className={`absolute left-0 top-0 h-1 w-full ${accent.bg}`}
                  aria-hidden
                />
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-bold text-text-strong">{c.client}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${accent.pill} ${accent.text}`}
                  >
                    Case
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(c.channels ?? c.channels_after ?? []).map((ch) => (
                    <Badge
                      key={ch}
                      variant="secondary"
                      className="bg-neutral text-text-default"
                    >
                      {ch}
                    </Badge>
                  ))}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-text-muted">
                  {c.summary}
                </p>

                <div className="mt-6 space-y-3 rounded-xl bg-neutral p-4">
                  {(c.metrics as Metric[]).map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="font-medium text-text-default">
                        {m.label}
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        {m.before && (
                          <>
                            <span className="text-tertiary line-through">
                              {m.before}
                            </span>
                            <span className="text-tertiary">→</span>
                          </>
                        )}
                        {m.after && (
                          <span className={`font-bold ${accent.text}`}>
                            {m.after}
                          </span>
                        )}
                        {m.values && (
                          <span className={`font-bold ${accent.text}`}>
                            {m.values.join(" · ")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
