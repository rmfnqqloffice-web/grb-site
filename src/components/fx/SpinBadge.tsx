import { cn } from "@/lib/utils";

/**
 * 스크롤에 따라 천천히 회전하는 스티커 배지. 회전은 CSS 스크롤 연동 애니메이션(globals.css `.spin-badge`)이
 * 맡는다 — 예전엔 window scroll 이벤트로 매 프레임 각도를 계산했다. 지원하지 않는 브라우저·움직임 줄이기는 고정 각도.
 */
export function SpinBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("spin-badge", className)}>{children}</div>;
}
