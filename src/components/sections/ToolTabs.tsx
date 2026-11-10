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
// 패널은 셋 다 그려 두고 고르지 않은 것은 hidden — aria-controls 가 늘 실제 패널을 가리킨다.
// 화면 캡처가 아직 없는 도구는 글만 보여 준다(가짜 화면을 그리지 않는다). 넓은 화면은 패널 최소 높이를 같게 해
// 탭을 바꿔도 아래 구역이 출렁이지 않는다.
export function ToolTabs({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const n = (i + tools.length) % tools.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

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
              "min-h-11 rounded-full border px-5 text-sm font-bold transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-bright motion-reduce:transition-none motion-reduce:active:scale-100",
              i === active
                ? "border-white bg-white text-secondary"
                : "border-white/30 text-white/85 hover:border-white/60 hover:text-white",
            )}
          >
            {tool.name}
          </button>
        ))}
      </div>

      {tools.map((t, i) => (
        <div
          key={t.key}
          role="tabpanel"
          id={`tool-panel-${t.key}`}
          aria-labelledby={`tool-tab-${t.key}`}
          hidden={i !== active}
          tabIndex={0}
          className={cn(
            "mt-8 rounded-[24px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-bright lg:min-h-[25rem]",
            t.image && "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12",
          )}
        >
          <div className={cn(!t.image && "max-w-2xl")}>
            <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-white">{t.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-white/85">{t.body}</p>
            {t.note && <p className="mt-4 text-sm font-bold text-primary-bright">{t.note}</p>}
          </div>
          {t.image && (
            // 화면마다 비율이 달라도 상자는 16:10 으로 같게(왼쪽 위 기준으로 채움). 이미지가 오기 전엔 옅은 면.
            <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-white/15 bg-white/10 shadow-2xl shadow-black/40">
              <Image
                src={t.image}
                alt={t.alt ?? ""}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-left-top"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
