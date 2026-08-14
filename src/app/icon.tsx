import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/logo";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// 브랜드 그린 바탕에 흰 심볼. 16px 로 줄어들어도 B 가 식별되도록 여백을 넉넉히 둔다.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#3a8d63",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logoDataUri("#ffffff")} width={21} height={21} alt="" />
      </div>
    ),
    size,
  );
}
