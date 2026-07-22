"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 스크롤 진입 시 페이드업으로 나타나는 래퍼.
 * 숨김 상태는 motion-safe에서만 적용되므로 prefers-reduced-motion 사용자는 항상 즉시 보인다.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "ease-out motion-safe:transition-all motion-safe:duration-700",
        !inView && "motion-safe:translate-y-6 motion-safe:opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
