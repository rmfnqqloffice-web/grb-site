import { ImageResponse } from "next/og";

// 파비콘 전용 작은 마크. 원본 로고(src/lib/logo.ts)의 5겹 B 는 16px 에서 선이 붙어 얼룩이 된다.
// 프레임·색은 그대로 두고 B 를 굵은 한 줄로 줄였다. 헤더(LogoMark)·OG 는 원본을 계속 쓴다.
// viewBox 를 프레임 바깥선(3~61)에 맞춰 원본처럼 28px·사방 2px 여백으로 들어가게 했다.
const MARK_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="3 3 58 58"><g fill="none" stroke="#5cb98a" stroke-linejoin="round">' +
  '<rect x="5" y="5" width="54" height="54" stroke-width="4"/>' +
  '<path d="M22 15 V49 M22 15 H35 A8.5 8.5 0 0 1 35 32 H22 M22 32 H37 A8.5 8.5 0 0 1 37 49 H22" stroke-width="5.5"/></g></svg>';
const MARK_SRC = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

/**
 * 배경 없이 브랜드 그린 심볼만. 로고가 이미 사각 프레임을 갖고 있어서
 * 색 바탕을 깔면 프레임이 이중으로 보이고 16px 에서 특히 빽빽해진다.
 * 투명 배경이면 그 프레임이 그대로 파비콘 테두리 역할을 한다.
 * 사방 2px 여백은 원형으로 마스킹하는 환경(일부 런처·탭)에서 잘리지 않게 두는 것.
 *
 * 색은 primary 가 아니라 **primary-bright(#5cb98a)** 다. 파비콘은 탭 배경을 고를 수 없어
 * 밝은 탭과 다크 탭 양쪽에서 견뎌야 하는데, primary(#3a8d63)는 다크 탭에서 배경에 묻혔다.
 * 4개 배경 × 16·24·32px 로 대조한 결과 이 값이 양쪽에서 가장 균형이 좋았다.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={MARK_SRC} width={28} height={28} alt="" />
      </div>
    ),
    size,
  );
}
