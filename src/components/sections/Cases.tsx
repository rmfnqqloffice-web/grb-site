import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import { CaseNumber } from "@/components/fx/CaseNumber";
import { CASES, type CaseItem } from "@/lib/cases";
import content from "@/content/content.json";

// 성과 사례(메인 개편, 시안 2) — 큰 사례 1건(이전 → 그룹비 운영 후) + 작은 사례 최대 2건.
// 같은 모양 카드 3장을 늘어놓지 않는다. 서버에서만 그려 사례 데이터를 브라우저 묶음에 싣지 않는다.
// 공개할(광고주 동의를 받은) 사례가 없으면 구역 자체를 그리지 않는다 — 메뉴의 "성과"도 함께 빠진다.
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
            <div className="grid content-start gap-8">
              {small.map((s, i) => (
                <Reveal key={s.id} delay={120 + i * 90}>
                  <SmallCase item={s} />
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <p className="mt-8 text-xs text-text-subtle">{c.note}</p>
      </Container>
    </section>
  );
}

function LeadCase({ item }: { item: CaseItem }) {
  const hasBefore = item.metrics.some((m) => m.before);
  return (
    <article className="h-full rounded-[24px] border border-border bg-white p-7 shadow-[0_18px_50px_-30px_rgba(27,43,68,0.45)] sm:p-9">
      <p className="text-[13px] font-bold text-primary-strong">
        {item.industry} · {item.period}
      </p>
      <p className="mt-4 text-6xl font-black leading-none tracking-[-0.04em] text-primary sm:text-7xl">
        <CaseNumber value={item.headline.value} />
      </p>
      <p className="mt-3 text-lg font-extrabold tracking-[-0.02em] text-secondary">{item.headline.label}</p>
      {item.summary && <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-text-muted">{item.summary}</p>}

      {hasBefore ? (
        <table className="mt-7 w-full border-collapse text-sm">
          <caption className="sr-only">{item.industry} 이전과 그룹비 운영 후 비교</caption>
          <thead>
            <tr className="text-left text-xs text-text-subtle">
              <th scope="col" className="pb-2 font-semibold">항목</th>
              <th scope="col" className="pb-2 font-semibold">이전</th>
              <th scope="col" className="pb-2 font-semibold">
                <span className="sr-only">에서</span>
              </th>
              <th scope="col" className="pb-2 font-semibold">그룹비 운영 후</th>
            </tr>
          </thead>
          <tbody>
            {item.metrics.map((m) => (
              <tr key={m.label} className="border-t border-border align-middle">
                <th scope="row" className="py-3 pr-3 text-left font-medium text-text-default">{m.label}</th>
                <td className="py-3 pr-2 text-text-subtle tabular-nums">{m.before ?? ""}</td>
                <td className="py-3 pr-2 text-primary" aria-hidden>
                  <ArrowRight className="h-4 w-4" />
                </td>
                <td className="py-3 font-extrabold text-secondary tabular-nums">{m.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <dl className="mt-7 grid gap-x-6 gap-y-4 border-t border-border pt-5 sm:grid-cols-3">
          {item.metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-xs text-text-subtle">{m.label}</dt>
              <dd className="mt-1 text-xl font-extrabold text-secondary tabular-nums">{m.after}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}

function SmallCase({ item }: { item: CaseItem }) {
  return (
    <article className="border-t-2 border-secondary pt-5">
      <p className="text-[13px] font-bold text-primary-strong">
        {item.industry} · {item.period}
      </p>
      <p className="mt-2 text-4xl font-black leading-none tracking-[-0.04em] text-secondary">
        <CaseNumber value={item.headline.value} />
      </p>
      <p className="mt-2 text-sm text-text-muted">{item.headline.label}</p>
    </article>
  );
}
