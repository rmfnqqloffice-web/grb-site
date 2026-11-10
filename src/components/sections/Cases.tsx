import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import { CaseNumber } from "@/components/fx/CaseNumber";
import { CASES, type CaseItem } from "@/lib/cases";
import content from "@/content/content.json";

// 성과 사례(메인 개편, 시안 2) — 큰 사례 1건(이전 → 그룹비 운영 후) + 작은 사례 최대 2건.
// 같은 모양 카드 3장을 늘어놓지 않는다. 서버에서만 그려 사례 데이터를 브라우저 묶음에 싣지 않는다.
// 공개할(광고주 동의를 받은) 사례가 없으면 구역 자체를 그리지 않는다 — 메뉴의 "성과"도 함께 빠진다.
// 히어로 카드가 첫 사례의 숫자를 맛보기로 보여 주고, 여기서 그 상세(표)를 보여 준다.
export function Cases() {
  if (CASES.length === 0) return null;
  const [lead, ...rest] = CASES;
  const small = rest.slice(0, 2);
  const c = content.cases;

  return (
    <section id="cases" aria-labelledby="cases-heading" className="bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <h2
            id="cases-heading"
            className="text-3xl font-black leading-[1.15] tracking-[-0.04em] text-secondary sm:text-4xl md:text-[44px]"
          >
            {c.heading}
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm text-text-muted sm:text-base">{c.description}</p>
        </Reveal>

        <div className={small.length ? "mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10" : "mt-10"}>
          <Reveal>
            <LeadCase item={lead} />
          </Reveal>
          {small.length > 0 && (
            // 오른쪽 열을 큰 카드 높이에 맞춰 위아래로 벌린다(큰 카드 옆이 비지 않게)
            <div className="grid gap-8 lg:content-between">
              {small.map((s, i) => (
                <Reveal key={s.id} delay={120 + i * 90}>
                  <SmallCase item={s} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-xs text-text-muted">{c.note}</p>
      </Container>
    </section>
  );
}

function LeadCase({ item }: { item: CaseItem }) {
  const hasBefore = item.metrics.some((m) => m.before);
  const labelId = `case-${item.id}`;
  return (
    <article
      aria-labelledby={labelId}
      className="h-full rounded-[24px] border border-border bg-white p-7 shadow-xl shadow-secondary/10 sm:p-9"
    >
      <h3 id={labelId} className="text-sm font-bold text-primary-strong">
        {item.industry} · {item.period}
      </h3>
      <p className="mt-4 text-6xl font-black leading-none tracking-[-0.04em] text-primary sm:text-7xl">
        <CaseNumber value={item.headline.value} />
      </p>
      <p className="mt-3 text-lg font-extrabold tracking-[-0.02em] text-secondary">{item.headline.label}</p>
      {item.summary && <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-text-muted">{item.summary}</p>}

      {hasBefore ? (
        <table className="mt-7 w-full border-collapse text-sm">
          <caption className="sr-only">{item.industry} 이전과 그룹비 운영 후 비교</caption>
          <thead>
            <tr className="text-left text-xs text-text-muted">
              <th scope="col" className="pb-2 font-semibold">항목</th>
              <th scope="col" className="pb-2 font-semibold">이전</th>
              <th scope="col" className="pb-2 font-semibold">그룹비 운영 후</th>
            </tr>
          </thead>
          <tbody>
            {item.metrics.map((m) => (
              <tr key={m.label} className="border-t border-border align-middle">
                <th scope="row" className="py-3 pr-3 text-left font-medium text-text-default">{m.label}</th>
                <td className="py-3 pr-3 text-text-muted tabular-nums">
                  {m.before ?? <span className="sr-only">없음</span>}
                </td>
                <td className="py-3 font-extrabold text-secondary tabular-nums">
                  <span className="inline-flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {m.after}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <dl className="mt-7 grid gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-3">
          {item.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-xs text-text-muted">{m.label}</dt>
              <dd className="mt-1 text-xl font-extrabold text-secondary tabular-nums">{m.after}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

function SmallCase({ item }: { item: CaseItem }) {
  const labelId = `case-${item.id}`;
  return (
    <article aria-labelledby={labelId} className="border-t-2 border-secondary pt-5">
      <h3 id={labelId} className="text-sm font-bold text-primary-strong">
        {item.industry} · {item.period}
      </h3>
      <p className="mt-2 text-4xl font-black leading-none tracking-[-0.04em] text-secondary">
        <CaseNumber value={item.headline.value} />
      </p>
      <p className="mt-2 text-sm text-text-muted">{item.headline.label}</p>
    </article>
  );
}
