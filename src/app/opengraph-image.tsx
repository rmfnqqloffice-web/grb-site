import { ImageResponse } from "next/og";

export const alt = "그룹비 | 사람의 차이가 마케팅의 차이를 만듭니다";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #1b2b44 0%, #243854 60%, #1b2b44 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* 상단 브랜드 마크 */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#3a8d63",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 900,
            }}
          >
            G
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: -0.5,
            }}
          >
            그룹비
          </div>
        </div>

        {/* 메인 카피 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#3a8d63",
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Performance Marketing Agency
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: "#3a8d63",
            }}
          >
            사람의 차이가
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: "white",
            }}
          >
            마케팅의 차이를 만듭니다.
          </div>
        </div>

        {/* 하단 메타 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "rgba(248,249,250,0.7)",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex" }}>
            검색 · 바이럴 · 모바일 · 온라인 · 오프라인 · 언론 · 영상
          </div>
          <div style={{ display: "flex", fontWeight: 700, color: "white" }}>
            grb-mkt.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
