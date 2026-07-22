import { cn } from "@/lib/utils";

/**
 * 무한 흐름 마키 스트립. 트랙을 2배로 복제해 translateX(-50%) 루프.
 * 장식용이므로 aria-hidden — 같은 정보는 본문 섹션에 존재해야 한다.
 */
export function Marquee({
  items,
  variant = "dark",
  speed = 26,
  className,
}: {
  items: string[];
  variant?: "dark" | "lite";
  speed?: number;
  className?: string;
}) {
  const track = [...items, ...items];
  return (
    <div
      aria-hidden
      className={cn(
        "overflow-hidden whitespace-nowrap",
        variant === "dark"
          ? "bg-secondary py-4 text-lg font-extrabold text-text-on-dark"
          : "border-y border-border/60 bg-white py-3 text-sm font-bold text-secondary",
        className,
      )}
    >
      <div
        className="animate-marquee inline-block"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {track.map((item, i) => (
          <span key={i} className="mx-4">
            {item}
            <span className="ml-8 text-primary">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
