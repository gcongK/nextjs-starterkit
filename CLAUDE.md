# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## ⚠️ 이 Next.js는 당신이 아는 버전이 아닙니다

**Next.js 16** (React 19, Tailwind CSS v4)을 사용합니다. 훈련 데이터와 다른 파괴적 변경이 있으므로, 코드 작성 전 반드시 `node_modules/next/dist/docs/` 관련 가이드를 읽고 deprecation 경고를 따르세요.

### Next.js 16 핵심 파괴적 변경

**`params`는 반드시 `await`** — `layout.tsx`, `page.tsx`, `route.ts`에서 `params`는 Promise입니다. 동기 접근은 제거됐습니다.

```ts
// ✅
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

**비동기 Request API** — `cookies()`, `headers()`, `draftMode()` 모두 `await` 필요.

**`middleware.ts` → `proxy.ts`** — 파일명 및 함수명 모두 `proxy`로 변경. `edge` 런타임 미지원.

**`revalidateTag`** — 두 번째 인자 `cacheLife` 프로필이 필수.

---

## 명령어

```bash
npm run dev       # 개발 서버 (localhost:3000)
npm run build     # 프로덕션 빌드
npm run lint      # ESLint
npx tsc --noEmit  # 타입 검사
```

테스트 설정 없음.

---

## 아키텍처

### 라우트 구조 및 레이아웃

라우트 그룹으로 레이아웃을 분리합니다. URL에는 그룹명이 포함되지 않습니다.

```
app/
├── layout.tsx               # 루트: html/body, ThemeProvider, Toaster 마운트
├── page.tsx                 # 랜딩 (Header + 히어로 + 피처 카드 + Footer)
├── (auth)/
│   ├── layout.tsx           # 로고 + ThemeToggle 헤더, 중앙 정렬 카드 레이아웃
│   ├── login/page.tsx
│   └── register/page.tsx
└── (dashboard)/
    ├── layout.tsx           # Sidebar(lg 이상) + Header(MobileSidebar 포함) + main
    └── components/page.tsx  # 컴포넌트 쇼케이스 ('use client')
```

### 컴포넌트 구조

```
components/
├── ui/           # shadcn/ui 컴포넌트 — radix-ui + cva + cn 패턴
├── layout/       # Sidebar, Header, MobileSidebar, Footer
├── common/       # PageHeader, LoadingSpinner, EmptyState, ThemeToggle
└── providers/    # ThemeProvider (next-themes 래핑)
```

**`components/ui/`는 직접 수정 가능한 소스입니다.** `radix-ui` 패키지(단일 패키지, `@radix-ui/*` 분리 패키지 아님)를 기반으로 합니다.

### 상태 관리

- **전역 UI 상태**: `store/useUIStore.ts` (Zustand) — 현재 `sidebarOpen` 단일 상태
- **폼 상태**: React Hook Form + Zod, 스키마는 `lib/validations.ts`에 정의
- **테마 상태**: `next-themes`의 `useTheme()` 훅으로 접근

### 타입 / 유틸

- `types/index.ts` — `ApiResponse<T>`, `User`, `NavItem` 전역 타입
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `lib/validations.ts` — `loginSchema`, `registerSchema` (Zod)

### 커스텀 훅

`hooks/` 디렉터리의 훅은 라이브러리 re-export입니다. 직접 구현하지 마세요.

- `useLocalStorage` → `use-local-storage` 패키지
- `useMediaQuery` → `react-responsive` 패키지

---

## 스타일링 시스템

### Tailwind CSS v4

`tailwind.config.js` 없음. `globals.css`에서 CSS를 직접 import합니다.

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

v3 기준 `tailwind.config.js`에서 하던 `extend` 설정은 `@theme inline { }` 블록에서 CSS 변수로 대체됩니다.

### 색상 — CSS 변수 + oklch

모든 색상은 `globals.css`의 CSS 변수로 정의됩니다. 색상 값은 `oklch()` 포맷을 사용합니다.

```css
/* 라이트 모드 (:root) */
--primary: oklch(0.205 0 0);
--background: oklch(1 0 0);

/* 다크 모드 (.dark) */
--primary: oklch(0.922 0 0);
--background: oklch(0.145 0 0);
```

`@theme inline { }` 블록에서 Tailwind 유틸리티 클래스(`bg-primary`, `text-foreground` 등)와 CSS 변수를 연결합니다. **하드코딩된 색상(`bg-gray-500`)을 쓰지 말고 시맨틱 토큰(`bg-muted`, `text-muted-foreground`)을 사용하세요.**

사용 가능한 주요 토큰:

| 토큰 | 용도 |
|---|---|
| `background` / `foreground` | 페이지 배경/본문 |
| `primary` / `primary-foreground` | 주요 액션 |
| `muted` / `muted-foreground` | 보조 텍스트, 배경 |
| `destructive` | 오류, 삭제 |
| `border`, `input`, `ring` | 테두리, 포커스 |
| `sidebar` 접두사 계열 | 사이드바 전용 색상 |

### 다크 모드

`@custom-variant dark (&:is(.dark *))` — `html` 요소에 `.dark` 클래스가 붙는 방식입니다 (`next-themes`의 `attribute="class"` 설정). `globals.css`의 `.dark { }` 블록에서 CSS 변수를 오버라이드합니다.

Tailwind에서 다크 모드 스타일: `dark:bg-muted/50` 형태로 사용 가능.

### 반응형 Radius

`--radius` 기본값은 `0.625rem`이며, 파생 토큰이 `@theme`에 정의됩니다.

```
--radius-sm  calc(var(--radius) * 0.6)
--radius-md  calc(var(--radius) * 0.8)
--radius-lg  var(--radius)            ← rounded-lg
--radius-xl  calc(var(--radius) * 1.4)
```

---

## 폰트 시스템

`app/layout.tsx`에서 `next/font/google`으로 Geist 폰트 두 종류를 로드합니다.

```ts
const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
```

`html` 요소에 CSS 변수로 주입 (`--font-geist-sans`, `--font-geist-mono`).

`globals.css`의 `@theme inline`에서 Tailwind 폰트 변수로 연결됩니다.

```css
--font-sans: var(--font-sans);       /* Geist Sans → font-sans */
--font-mono: var(--font-geist-mono); /* Geist Mono → font-mono */
--font-heading: var(--font-sans);    /* 헤딩도 동일 폰트 */
```

`html { @apply font-sans; }` — 전체 기본 폰트는 Geist Sans입니다.

---

## 테마 시스템

`ThemeProvider` (`components/providers/ThemeProvider.tsx`)가 `next-themes`의 `NextThemesProvider`를 래핑합니다.

```ts
<NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
```

- `attribute="class"` — `html`에 `class="dark"` 토글 방식
- `defaultTheme="system"` — OS 설정을 기본값으로 사용
- `disableTransitionOnChange` — 테마 전환 시 플래시 방지
- `suppressHydrationWarning` — `html` 요소에 적용됨 (`layout.tsx`)

**테마 전환**: `ThemeToggle` 컴포넌트에서 `useTheme()`의 `setTheme('dark'|'light')` 사용.

**Toaster 테마 연동**: `components/ui/sonner.tsx`에서 `useTheme()`으로 현재 테마를 읽어 Sonner에 전달합니다.

---

## UI 컴포넌트 작성 규칙

shadcn/ui 패턴을 따릅니다.

```ts
// 변형(variant)이 있는 컴포넌트 — cva 사용
import { cva, type VariantProps } from 'class-variance-authority'

const variants = cva('기본 클래스', {
  variants: { variant: { default: '...', outline: '...' } },
  defaultVariants: { variant: 'default' },
})

// className 병합 — 항상 cn() 사용
import { cn } from '@/lib/utils'
className={cn(variants({ variant }), className)}
```

**`asChild` 패턴**: `Slot.Root` (`radix-ui`)를 사용해 컴포넌트의 DOM 요소를 자식으로 교체합니다. `Button`의 `asChild`가 이 방식입니다.

**`data-slot` 속성**: UI 컴포넌트 내부 요소에 `data-slot="..."` 속성을 붙여 CSS 선택자 타겟팅에 활용합니다 (shadcn/ui 컨벤션).
