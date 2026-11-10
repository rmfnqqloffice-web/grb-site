import { CountUp } from "@/components/fx/CountUp";
import { countable } from "@/lib/cases";

/** 사례 대표 숫자 — 셀 수 있는 값이면 화면에 들어올 때 세고, 아니면 글자 그대로. */
export function CaseNumber({ value }: { value: string }) {
  const n = countable(value);
  if (!n) return <>{value}</>;
  return <CountUp to={n.to} prefix={n.prefix} suffix={n.suffix} />;
}
