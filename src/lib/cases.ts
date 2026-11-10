import content from "@/content/content.json";

// 성과 사례 한 건. content.json cases.items 에는 **광고주 동의를 받은 사례만** 넣는다 —
// 이 파일은 브라우저 부품도 불러와 공개 자바스크립트에 실리므로 동의 전 후보를 두면 숫자가 밖으로 나간다.
export type CaseMetric = { label: string; before?: string; after: string };
export type CaseItem = {
  id: string;
  industry: string; // 업종만(예: "자전거·어패럴 브랜드")
  period: string; // "2026년 7월"
  service: string; // 어느 서비스의 성과인지
  headline: { value: string; label: string };
  metrics: CaseMetric[];
  summary?: string;
};

// 빈 배열은 JSON 타입이 never[] 로 잡혀 형식을 붙여 준다
export const CASES = content.cases.items as unknown as CaseItem[];

// "2,205%" · "265회" 처럼 정수에 앞뒤 글자가 붙은 값만 세는 숫자로 쓴다(소수·글자뿐인 값은 그대로 보여 준다)
export function countable(value: string): { prefix: string; to: number; suffix: string } | null {
  const m = value.match(/^([^\d]*)(\d[\d,]*)([^\d.]*)$/);
  if (!m) return null;
  const to = Number(m[2].replace(/,/g, ""));
  return Number.isSafeInteger(to) ? { prefix: m[1], to, suffix: m[3] } : null;
}
