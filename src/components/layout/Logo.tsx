import { LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo";

/**
 * 그룹비 브랜드 심볼. 색은 currentColor 라서 쓰는 쪽에서 text-* 로 정한다 —
 * 밝은 배경은 text-primary, 어두운 배경은 text-primary-bright.
 *
 * 기본은 장식(aria-hidden)이다. 헤더처럼 옆에 "그룹비" 텍스트가 함께 있으면
 * 로고까지 읽히면 중복이기 때문. 단독으로 쓸 때만 label 을 넘긴다.
 */
export function LogoMark({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      fill="currentColor"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {LOGO_PATHS.map((d) => (
        <path key={d.slice(0, 24)} fillRule="nonzero" d={d} />
      ))}
    </svg>
  );
}
