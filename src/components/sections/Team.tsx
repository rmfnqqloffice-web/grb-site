import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import content from "@/content/content.json";

// 4팀 비율 스트립 — 전부 브랜드 토큰 색상
const TEAM_TOKENS = [
  { bg: "bg-primary", dot: "bg-primary" },
  { bg: "bg-secondary", dot: "bg-secondary" },
  { bg: "bg-tertiary", dot: "bg-tertiary" },
  { bg: "bg-tertiary-strong", dot: "bg-tertiary-strong" },
] as const;

export function Team() {
  const items = content.team.items;
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <h2
            id="team-heading"
            className="text-3xl font-black leading-[1.15] tracking-[-0.04em] text-secondary sm:text-4xl md:text-[44px]"
          >
            성과를 만드는 사람들
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm text-text-muted sm:text-base">
            마케팅 · 전략기획 · 디자인 · 콘텐츠 — 4개의 전문 팀이 하나의 결과를
            만듭니다.
          </p>
        </Reveal>

        {/* 인원 비율 스트립 */}
        <Reveal delay={100}>
          <div className="mt-10 flex h-16 overflow-hidden rounded-2xl" role="img" aria-label="팀 인원 비율">
            {items.map((t, idx) => {
              const accent = TEAM_TOKENS[idx % TEAM_TOKENS.length];
              return (
                <div
                  key={t.name}
                  className={`flex items-center justify-center text-xs font-extrabold text-white ${accent.bg}`}
                  style={{ width: `${t.ratio}%` }}
                >
                  {t.ratio >= 30 ? (
                    <span className="px-2">
                      {t.name} {t.ratio}%
                    </span>
                  ) : (
                    <span className="sr-only">
                      {t.name} {t.ratio}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((t, idx) => {
            const accent = TEAM_TOKENS[idx % TEAM_TOKENS.length];
            return (
              <Reveal key={t.name} delay={idx * 70}>
                <div>
                  <p className="flex items-center gap-2 text-[15px] font-extrabold text-secondary">
                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${accent.dot}`} aria-hidden />
                    {t.name}
                    <span className="text-xs font-bold text-tertiary-strong">{t.ratio}%</span>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-text-subtle">{t.subtitle}</p>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-text-muted">{t.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
