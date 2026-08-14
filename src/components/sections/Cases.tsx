"use client";

import { startTransition, useState, ViewTransition } from "react";
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

const items = content.achievements.items;

export function Cases() {
  const [open, setOpen] = useState<number | null>(null);
  // 상세를 한 번 열면 목록으로 돌아올 때 Reveal 을 다시 태우지 않는다.
  // 재마운트된 Reveal 은 opacity 0 에서 시작하는데, IntersectionObserver 콜백이
  // 전환 스냅샷보다 늦게 오면 빈 카드가 찍힌다.
  const [skipReveal, setSkipReveal] = useState(false);

  function show(next: number | null) {
    if (next !== null) setSkipReveal(true);
    // ★ 일반 setState 는 View Transition 을 발화시키지 않는다.
    startTransition(() => setOpen(next));
  }

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

        {open === null ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {items.map((c, idx) => {
              const card = (
                <CaseCard index={idx} client={c.client} onOpen={() => show(idx)} />
              );
              return skipReveal ? (
                <div key={c.client}>{card}</div>
              ) : (
                <Reveal key={c.client} delay={(idx % 3) * 90}>
                  {card}
                </Reveal>
              );
            })}
          </div>
        ) : (
          <CaseDetail index={open} onClose={() => show(null)} />
        )}
      </Container>
    </section>
  );
}

/* 카드 = 요약. 광고주·대표 수치·한 줄 캡션까지만 두어 3건이 한눈에 비교되게 한다.
   서술과 지표표는 상세로 넘긴다. */
function CaseCard({
  index,
  client,
  onOpen,
}: {
  index: number;
  client: string;
  onOpen: () => void;
}) {
  const hl = HIGHLIGHTS[index % HIGHLIGHTS.length];

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${client} 사례 자세히 보기`}
      className="h-full w-full rounded-[20px] border border-white/12 bg-white/5 p-6 text-left transition hover:border-primary-bright/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-bright focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:p-7"
    >
      <ViewTransition name={`case-client-${index}`} share="case-morph" default="none">
        <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-bright">
          {client}
        </p>
      </ViewTransition>

      <ViewTransition name={`case-kpi-${index}`} share="case-morph" default="none">
        <p className="mt-3 text-5xl font-black leading-none tracking-[-0.04em] text-white sm:text-[52px]">
          <CountUp to={hl.to} prefix={hl.prefix} suffix={hl.suffix} />
        </p>
      </ViewTransition>

      <p className="mt-2 text-xs text-white/55">{hl.caption}</p>

      <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-bold text-primary-bright">
        자세히 보기
        <span aria-hidden="true">→</span>
      </span>
    </button>
  );
}

/* 상세 = 카드에서 넘어온 서술 + 지표표. 카드에 뭉개져 있던 집행 추이(values)를
   단계로 펼쳐, 매체·예산을 어떻게 늘려갔는지가 읽히게 한다. */
function CaseDetail({ index, onClose }: { index: number; onClose: () => void }) {
  const c = items[index];
  const hl = HIGHLIGHTS[index % HIGHLIGHTS.length];
  const metrics = c.metrics as Metric[];
  const before = c.channels_before ?? null;
  const after = c.channels ?? c.channels_after ?? [];

  return (
    <div className="mt-10">
      <ViewTransition enter="case-fade" exit="case-fade" default="none">
        <button
          type="button"
          onClick={onClose}
          className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-[13px] font-bold text-white/75 transition hover:border-primary-bright/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-bright focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
        >
          <span aria-hidden="true">←</span>
          사례 전체 보기
        </button>
      </ViewTransition>

      <article className="rounded-[20px] border border-white/12 bg-white/5 p-6 sm:p-8">
        <ViewTransition name={`case-client-${index}`} share="case-morph" default="none">
          <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-primary-bright">
            {c.client}
          </p>
        </ViewTransition>

        <ViewTransition name={`case-kpi-${index}`} share="case-morph" default="none">
          <p className="mt-3 text-5xl font-black leading-none tracking-[-0.04em] text-white sm:text-[52px]">
            {/* 카드의 CountUp 과 같은 마크업·같은 포맷이라야 이어지는 게 자연스럽다.
                여기서 다시 세면 전환 도중에 숫자가 요동치므로 최종값을 고정한다. */}
            {hl.prefix}
            <span className="tabular-nums">{hl.to.toLocaleString("ko-KR")}</span>
            {hl.suffix}
          </p>
        </ViewTransition>

        <p className="mt-2 text-xs text-white/55">{hl.caption}</p>

        <ViewTransition enter="case-fade" default="none">
          <div className="mt-6 border-t border-white/12 pt-6">
            <p className="max-w-[68ch] text-sm leading-relaxed text-white/80">
              {c.summary}
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/45">
                  {before ? "집행 매체 변화" : "집행 매체"}
                </h4>
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  {before?.map((ch) => (
                    <span
                      key={`b-${ch}`}
                      className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white/45 line-through"
                    >
                      {ch}
                    </span>
                  ))}
                  {before && (
                    <span aria-hidden="true" className="px-0.5 text-white/40">
                      →
                    </span>
                  )}
                  {after.map((ch) => (
                    <span
                      key={`a-${ch}`}
                      className="rounded-full border border-primary-bright/40 bg-primary-bright/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary-bright"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/45">
                  지표
                </h4>
                <dl className="mt-2.5 space-y-2.5">
                  {metrics.map((m) => (
                    <div key={m.label} className="text-xs">
                      <dt className="font-medium text-white/60">{m.label}</dt>
                      <dd className="mt-1 flex flex-wrap items-center gap-1.5 font-mono">
                        {m.before && (
                          <>
                            <span className="text-white/45 line-through">{m.before}</span>
                            <span aria-hidden="true" className="text-white/35">
                              →
                            </span>
                          </>
                        )}
                        {m.after && (
                          <span className="text-sm font-bold text-primary-bright">
                            {m.after}
                          </span>
                        )}
                        {/* values 는 한 번에 오른 게 아니라 단계적으로 늘린 집행액이다.
                            join(" · ")로 뭉치면 그 순서가 사라져 단계로 펼친다. */}
                        {m.values?.map((v, i) => (
                          <span key={v} className="flex items-center gap-1.5">
                            {i > 0 && (
                              <span aria-hidden="true" className="text-white/35">
                                →
                              </span>
                            )}
                            <span
                              className={
                                i === m.values!.length - 1
                                  ? "text-sm font-bold text-primary-bright"
                                  : "text-white/55"
                              }
                            >
                              {v}
                            </span>
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </ViewTransition>
      </article>
    </div>
  );
}
