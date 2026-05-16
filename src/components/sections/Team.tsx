import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import content from "@/content/content.json";

// 4팀을 Primary / Secondary / Tertiary / Primary-strong 로 매핑
const TEAM_TOKENS = [
  { color: "#3a8d63", text: "text-primary", bg: "bg-primary", soft: "bg-primary-soft" },
  { color: "#1b2b44", text: "text-secondary", bg: "bg-secondary", soft: "bg-secondary/10" },
  { color: "#70778b", text: "text-tertiary", bg: "bg-tertiary", soft: "bg-tertiary/15" },
  { color: "#286042", text: "text-primary-strong", bg: "bg-primary-strong", soft: "bg-primary-soft" },
] as const;

export function Team() {
  const items = content.team.items;
  return (
    <section id="team" aria-labelledby="team-heading" className="py-24 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Member"
          title={
            <span id="team-heading">
              4개의 전문 팀이<br className="hidden sm:block" /> 하나의 결과를 만듭니다
            </span>
          }
          description="마케팅 · 전략기획 · 디자인 · 콘텐츠 — 각 분야 전문가들이 유기적으로 협업합니다."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, idx) => {
            const accent = TEAM_TOKENS[idx % TEAM_TOKENS.length];
            return (
              <article
                key={t.name}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`absolute right-0 top-0 h-24 w-24 rounded-bl-[60px] ${accent.soft}`}
                  aria-hidden
                />
                <div className="relative">
                  <div className="flex items-end gap-2">
                    <span className={`text-4xl font-extrabold leading-none ${accent.text}`}>
                      {t.ratio}
                    </span>
                    <span className="pb-1 text-sm font-semibold text-text-muted">%</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-text-strong">
                    {t.name}
                  </h3>
                  <p className="text-xs font-medium text-text-muted">{t.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{t.body}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* 비율 시각화 바 */}
        <div className="mt-10">
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-neutral">
            {items.map((t, idx) => {
              const accent = TEAM_TOKENS[idx % TEAM_TOKENS.length];
              return (
                <div
                  key={t.name}
                  className={accent.bg}
                  style={{ width: `${t.ratio}%` }}
                  aria-label={`${t.name} ${t.ratio}%`}
                />
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-text-muted">
            {items.map((t, idx) => {
              const accent = TEAM_TOKENS[idx % TEAM_TOKENS.length];
              return (
                <div key={t.name} className="flex items-center gap-1.5">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${accent.bg}`}
                    aria-hidden
                  />
                  {t.name} {t.ratio}%
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
