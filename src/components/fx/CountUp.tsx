"use client";

import { useEffect, useRef } from "react";

/** 화면 진입 시 0→목표값으로 세는 숫자. prefers-reduced-motion이면 최종값 고정. */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1300,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const format = (n: number) => n.toLocaleString("ko-KR");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = format(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span className={className}>
      {prefix}
      <span ref={ref} className="tabular-nums">
        0
      </span>
      {suffix}
    </span>
  );
}
