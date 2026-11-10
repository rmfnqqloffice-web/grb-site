"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Tool = {
  key: string;
  name: string;
  body: string;
  image: string | null;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
  note: string;
};

// 도구 탭 — 탭 목록 규칙(WAI-ARIA Tabs): 고른 탭만 Tab 으로 닿고, 좌우 화살표·Home·End 로 옮긴다.
// 화면 캡처가 아직 없는 도구는 글만 넓게 보여 준다(가짜 화면을 그리지 않는다).
export function ToolTabs({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const n = (i + tools.length) % tools.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const t = tools[active];
  return (
    <div className="mt-10">
      <div role="tablist" aria-label="그룹비 도구" className="flex flex-wrap gap-2">
        {tools.map((tool, i) => (
          <button
            key={tool.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tool-tab-${tool.key}`}
            aria-selected={i === active}
            aria-controls={`tool-panel-${tool.key}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(i + 1);
              else if (e.key === "ArrowLeft") go(i - 1);
              else if (e.key === "Home") go(0);
              else if (e.key === "End") go(tools.length - 1);
              else return;
              e.preventDefault();
            }}
            className={cn(
              "min-h-11 rounded-full border px-5 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-bright",
              i === active
                ? "border-white bg-white text-secondary"
                : "border-white/30 text-white/85 hover:border-white/60 hover:text-white",
            )}
          >
            {tool.name}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`tool-panel-${t.key}`}
        aria-labelledby={`tool-tab-${t.key}`}
        tabIndex={0}
        className={cn(
          "mt-8 rounded-[24px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-bright",
          t.image && "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12",
        )}
      >
        <div className={cn(!t.image && "max-w-2xl")}>
          <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white">{t.name}</h3>
          <p className="mt-3 text-base leading-relaxed text-white/85">{t.body}</p>
          {t.note && <p className="mt-4 text-[13px] font-bold text-primary-bright">{t.note}</p>}
        </div>
        {t.image && (
          <div className="overflow-hidden rounded-[18px] border border-white/15 bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)]">
            <Image
              src={t.image}
              alt={t.alt ?? ""}
              width={t.imageWidth ?? 1600}
              height={t.imageHeight ?? 1000}
              sizes="(min-width: 1024px) 640px, 100vw"
              className="h-auto w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
