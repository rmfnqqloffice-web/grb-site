# grb-site 디자인 토큰 (추출본) — www.grb-mkt.com

> `design-system-extract` 스킬로 기존 코드에서 추출. 소스: `src/app/globals.css`(Tailwind v4 `@theme`/`:root`), `src/app/layout.tsx`(폰트·skip-link), `src/app/page.tsx`·`src/components`.
> 목적: 신규 섹션·컴포넌트 작업 시 **여기 값을 참조**해 GROUPB 브랜드 룩을 유지. 발명값 없음 — 전부 코드 원본.
> ★ grb는 aeo와 달리 **의도적으로 설계된 브랜드 시스템**(4색 브랜드 → 시맨틱 레이어 → shadcn 매핑). 아래를 그대로 따를 것.

## 브랜드 팔레트 (사용자 지정 4색)

```css
--color-primary:   #3a8d63;  /* 메인 액센트·CTA (그린) */
--color-secondary: #1b2b44;  /* 다크 섹션·강조 헤딩 (네이비) */
--color-tertiary:  #70778b;  /* 보더·아이콘·인디케이터 (슬레이트) */
--color-neutral:   #f8f9fa;  /* 본문 배경 */
```

### 브랜드 보강 — WCAG AA 본문 가독성 확보
```css
--color-primary-soft:    #e6f1ec;  /* primary 옅게 — pill 배경 등 */
--color-primary-strong:  #286042;  /* primary 어둡게 — 작은 강조 텍스트(AA 4.5+) */
--color-tertiary-strong: #4f5567;  /* tertiary 어둡게 — 보조 본문 텍스트 */
```

## 시맨틱 레이어

```css
/* Surface */
--color-surface:       #ffffff;
--color-surface-muted: #f8f9fa;
--color-surface-dark:  #1b2b44;

/* Text (강→약) */
--color-text-strong:  #0f172a;
--color-text-default: #1f2937;
--color-text-muted:   #4f5567;
--color-text-subtle:  #70778b;
--color-text-on-dark: #f8f9fa;
--color-border:       #e5e7eb;
```

### shadcn 토큰 매핑(`:root`)
primary/secondary/muted/accent/ring/chart-1~5 등은 위 브랜드 팔레트로 매핑됨. `--destructive`만 `oklch(0.577 0.245 27.325)`. `color-scheme: light` 명시(라이트 전용).

## 타이포그래피

```css
--font-sans:    var(--font-noto-sans-kr), -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Segoe UI", Roboto, sans-serif;
--font-display: var(--font-noto-sans-kr), -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif;  /* sans와 동일 패밀리 */
```
- **Noto Sans KR** 단일 패밀리(`next/font/google`로 로드, `--font-noto-sans-kr`). 본문·디스플레이 공용.
- body: `font-feature-settings: "ss01","ss02"` · `word-break: keep-all`(한글 어절 유지) · `line-height: 1.6`. 크기/두께 스케일은 Tailwind 기본.

## 라운드(radii)
```css
--radius: 0.625rem;                    /* 10px 기준 */
--radius-sm:  ~6px   --radius-md: ~8px   --radius-lg: 10px
--radius-xl: ~14px   --radius-2xl:~18px  --radius-3xl/4xl: 2.2×/2.6×
```

## 간격 · 그림자
- 커스텀 정의 없음 → Tailwind 기본(4px 스케일, `shadow-sm/md/lg`).

---

## 발견(findings)

**강점 (그대로 유지 권장)**
- 4색 브랜드 → 보강(soft/strong) → 시맨틱(surface/text) → shadcn 매핑의 **명확한 토큰 아키텍처**.
- **WCAG 보강 토큰**(primary-strong·tertiary-strong)으로 본문 대비 확보 — 접근성 설계됨.
- layout에 **skip-link**(`sr-only focus:not-sr-only`), `word-break: keep-all` 등 한글/접근성 배려.

**개선 여지 (사소 — 지금 라이브 문제 아님)**
1. **인라인 hex 4곳**(`page.tsx`/components에 `#3a8d63`·`#1b2b44`·`#70778b`·`#286042`)이 브랜드값을 **토큰 대신 직접 사용**. 값은 정확하나 `bg-primary`/`text-secondary` 등 토큰 클래스로 바꾸면 일관성·유지보수↑.
2. **`dark:` 유틸 20곳**은 dormant(grb는 `color-scheme: light`·`.dark{}` 블록 없음) → 라이트 전용 설계라 무해(aeo와 달리 깨진 다크 토큰 없음). 정리하려면 제거 가능하나 필수 아님.
3. **destructive만 oklch**, 나머지 hex — 통일 여지(사소).

## 다음 단계(권장)
- 이 파일을 grb 신규 섹션·컴포넌트 작업의 **참조 기준**으로 사용.
- 원하면 개선 1(인라인 hex → 토큰 클래스)만 가볍게 정리 가능.
