"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** 스크롤에 따라 천천히 회전하는 스티커 배지. prefers-reduced-motion이면 고정 각도. */
export function SpinBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotate(12deg)";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        el.style.transform = `rotate(${12 + window.scrollY * 0.04}deg)`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
