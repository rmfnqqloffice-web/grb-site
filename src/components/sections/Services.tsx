import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import { cn } from "@/lib/utils";
import content from "@/content/content.json";

type Service = {
  key: string;
  name: string;
  body: string;
  products?: { name: string; body: string }[];
  proof?: string;
};

// 칸마다 자리·바탕을 다르게(벤토 5칸, 빈 칸 없음) — 같은 크기 카드 7장이 늘어서 마지막 한 장이 혼자 남던 것을 대신한다.
// 넓은 화면 12열: 검색·쇼핑(5열, 두 줄) | 콘텐츠(7열) / SNS(4열) · 측정(3열) / 커머스(전체 폭, 가로형).
const CELL: Record<string, { box: string; tone: "green" | "navy" | "white" | "soft" }> = {
  search: { box: "md:col-span-2 lg:col-span-5 lg:row-span-2", tone: "green" },
  content: { box: "md:col-span-2 lg:col-span-7", tone: "navy" },
  sns: { box: "lg:col-span-4", tone: "white" },
  data: { box: "lg:col-span-3", tone: "soft" },
  commerce: { box: "md:col-span-2 lg:col-span-12", tone: "white" },
};

const TONE = {
  green: "bg-primary-strong text-white",
  navy: "bg-secondary text-white",
  white: "border border-border bg-white text-text-default",
  soft: "bg-primary-soft text-text-default",
} as const;

export function Services() {
  const s = content.services;
  const items = s.items as Service[];
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-neutral py-20 sm:py-24">
      <Container>
        <Reveal>
          <h2
            id="services-heading"
            className="text-3xl font-black leading-[1.15] tracking-[-0.04em] text-secondary sm:text-4xl md:text-[44px]"
          >
            {s.heading[0]}
            <br />
            {s.heading[1]}
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm text-text-muted sm:text-base">{s.description}</p>
        </Reveal>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {items.map((item, idx) => {
            const cell = CELL[item.key] ?? { box: "", tone: "white" as const };
            const dark = cell.tone === "green" || cell.tone === "navy";
            const wide = item.key === "commerce";
            return (
              <li key={item.key} className={cn(cell.box, "min-w-0")}>
                <Reveal delay={(idx % 3) * 80} className="h-full">
                  <article
                    className={cn(
                      "flex h-full flex-col rounded-[22px] p-6 sm:p-7",
                      TONE[cell.tone],
                      wide && "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-8",
                    )}
                  >
                    <h3
                      className={cn(
                        "text-xl font-extrabold tracking-[-0.02em] sm:text-2xl",
                        dark ? "text-white" : "text-secondary",
                      )}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed",
                        dark ? "text-white/85" : "text-text-muted",
                        wide && "lg:mt-0",
                      )}
                    >
                      {item.body}
                    </p>

                    {item.products && (
                      <dl className="mt-6 divide-y divide-white/15 border-t border-white/15">
                        {item.products.map((p) => (
                          <div key={p.name} className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-3 text-sm">
                            <dt className="font-bold text-white">{p.name}</dt>
                            <dd className="text-white/80">{p.body}</dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    {/* 근거 줄은 칸 맨 아래에 붙인다(위 글과 최소 20px) */}
                    {item.proof && <span aria-hidden className="block min-h-5 flex-1" />}
                    {item.proof && (
                      <p
                        className={cn(
                          "flex items-start gap-2 border-t pt-4 text-[13px] font-bold leading-relaxed",
                          dark ? "border-white/15 text-primary-bright" : "border-primary/25 text-primary-strong",
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2 py-0.5 text-[11px]",
                            dark ? "bg-white/10 text-white" : "bg-white text-primary-strong",
                          )}
                        >
                          근거
                        </span>
                        {item.proof}
                      </p>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
