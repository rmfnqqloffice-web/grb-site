import { CountUp } from "@/components/fx/CountUp";
import { countable } from "@/lib/cases";

/**
 * 사례 대표 숫자 — 셀 수 있는 값이면 화면에 들어올 때 센다.
 * 세는 숫자는 서버 HTML·화면 밖에서 "0"이라 낭독기·검색에는 최종값을 따로 준다(세는 쪽은 aria-hidden).
 */
export function CaseNumber({ value }: { value: string }) {
  const n = countable(value);
  if (!n) return <>{value}</>;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden>
        <CountUp to={n.to} prefix={n.prefix} suffix={n.suffix} />
      </span>
    </>
  );
}
