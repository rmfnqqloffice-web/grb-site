import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // View Transitions 는 별도 플래그가 필요 없다. Next 16.2 의
  // experimental.viewTransition 은 16.3 에서 **제거**됐고(있으면 타입 에러로 빌드 실패),
  // App Router 가 번들한 React canary 가 <ViewTransition> 을 그대로 제공한다.
};

export default nextConfig;
