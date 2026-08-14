import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // React <ViewTransition> 활성화 — Partners 탭에서 로고 타일이 카테고리를
    // 옮겨 다니는 이동에 쓴다. 미지원 브라우저는 애니메이션만 건너뛴다.
    viewTransition: true,
  },
};

export default nextConfig;
