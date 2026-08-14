import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/logo";

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
        <img src={logoDataUri("#3a8d63")} width={28} height={28} alt="" />
      </div>
    ),
    size,
  );
}
