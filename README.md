# grb-site

[grb-mkt.com](https://grb-mkt.com) — GROUPB 브랜드 메인. 회사 소개·서비스·사례·팀·연락처를 담은 공개 마케팅 사이트.

## 위치

| 도메인 | 역할 | Repo |
|--------|------|------|
| **grb-mkt.com** (이 repo) | 브랜드 메인 (공개) | rmfnqqloffice-web/grb-site |
| nvs.grb-mkt.com | 네이버 이슈 모니터링 (비공개 SaaS) | [nvs-site](https://github.com/rmfnqqloffice-web/nvs-site) |
| trend.grb-mkt.com | 커뮤니티 트렌드 분석 (비공개 SaaS) | [trend-site](https://github.com/rmfnqqloffice-web/trend-site) |
| blog.grb-mkt.com | 블로그 자동 발행 (비공개 SaaS) | [blog-site](https://github.com/rmfnqqloffice-web/blog-site) |

루트 도메인은 GROUPB 외부 노출용. 모든 서브도메인은 Cloudflare DNS로 Vercel에 매핑.

## 페이지 구성

단일 페이지 (one-page) 구조. `src/app/page.tsx`가 다음 섹션을 순서대로 렌더링:

1. **Hero** — 메인 비주얼·캐치프레이즈
2. **WhyUs** — 차별점·강점
3. **Services** — 제공 서비스 (퍼포먼스 마케팅·블로그 운영·트렌드 분석 등)
4. **Cases** — 고객사 성과 사례
5. **Team** — 팀 멤버 소개
6. **Partners** — 파트너십·협력사
7. **Contact** — 문의 폼·연락처

각 섹션 컴포넌트는 `src/components/sections/` 안에 모듈로 분리.

## 스택

Next.js 16 · React 19 · TypeScript · Tailwind v4 · shadcn (base-ui) · lucide-react

DB·인증·서버 액션 없음 — 정적 가까운 SSR 마케팅 페이지.

## 로컬 개발

```bash
npm install
npm run dev          # http://localhost:3000
```

## 빌드·배포

```bash
npm run build
vercel --prod --yes
```

Vercel 프로젝트 `grb-site`, 도메인 매핑 `grb-mkt.com` + `www.grb-mkt.com`. Cloudflare DNS에서 와일드카드 + 루트 A 레코드 모두 Vercel로 연결.

## 디렉토리

```
src/
  app/
    page.tsx        # 단일 페이지, 섹션 컴포넌트 조합
    layout.tsx      # 폰트·메타데이터·전역 레이아웃
    globals.css     # GroupB Ads Console 컬러 팔레트 (Pretendard, 그린/네이비)
  components/
    sections/       # Hero, WhyUs, Services, Cases, Team, Partners, Contact
    ui/             # shadcn 공통 컴포넌트
public/             # 정적 자산 (이미지·로고)
```

## 운영 가이드

- **콘텐츠 수정**: 카피·이미지·연락처 변경은 `src/components/sections/` 안의 해당 컴포넌트만 수정 후 `vercel --prod` 재배포.
- **새 섹션 추가**: `sections/` 안에 컴포넌트 만들고 `page.tsx`에 import·삽입.
- **컬러·폰트**: `globals.css`의 `:root` 색상 토큰과 Pretendard `@import`는 4개 사이트(grb·nvs·trend·blog)에서 동일하게 유지. 브랜드 일관성 변경 시 모두 동시 업데이트.

## 관련 사이트

- [nvs.grb-mkt.com](https://nvs.grb-mkt.com) — 네이버 이슈 모니터링
- [trend.grb-mkt.com](https://trend.grb-mkt.com) — 커뮤니티 트렌드 분석
- [blog.grb-mkt.com](https://blog.grb-mkt.com) — 블로그 자동 발행
