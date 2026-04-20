---
name: Project Architecture Overview
description: nextjs-starterkit 전체 라우트 구조, 컴포넌트 디렉터리 역할, 주요 파일 위치
type: project
---

## 라우트 구조
- `app/layout.tsx` — 루트 레이아웃: Geist 폰트, ThemeProvider, Toaster
- `app/page.tsx` — 랜딩 페이지 (Server Component, Header + Footer 포함)
- `app/(auth)/layout.tsx` — 로고 + ThemeToggle 헤더, 중앙 카드 레이아웃 (Server Component)
- `app/(auth)/login/page.tsx` — 로그인 폼 ('use client', RHF + Zod)
- `app/(auth)/register/page.tsx` — 회원가입 폼 ('use client', RHF + Zod)
- `app/(dashboard)/layout.tsx` — Sidebar + Header + main (Server Component)
- `app/(dashboard)/components/page.tsx` — 컴포넌트 쇼케이스 ('use client')
- `app/loading.tsx` — 전역 로딩 UI
- `app/not-found.tsx` — 404 페이지

## 컴포넌트 디렉터리
- `components/ui/` — shadcn/ui 기반 (radix-ui 단일 패키지, cva, cn 패턴)
- `components/layout/` — Sidebar, SidebarNav, Header, MobileSidebar, Footer
- `components/common/` — PageHeader, LoadingSpinner, EmptyState, ThemeToggle
- `components/providers/` — ThemeProvider (next-themes 래핑)

## 주요 파일
- `store/useUIStore.ts` — Zustand, sidebarOpen 상태
- `lib/validations.ts` — loginSchema, registerSchema (Zod)
- `lib/utils.ts` — cn() (clsx + tailwind-merge)
- `types/index.ts` — ApiResponse<T>, User, NavItem
- `hooks/useLocalStorage.ts` — use-local-storage 패키지 re-export
- `hooks/useMediaQuery.ts` — react-responsive 패키지 re-export
- `app/globals.css` — Tailwind v4 CSS 설정, oklch 색상 변수

**Why:** 전체 구조 파악으로 향후 리뷰 시 파일 위치를 바로 알 수 있음
**How to apply:** 새 컴포넌트/라우트 추가 리뷰 시 올바른 디렉터리 배치 여부 확인
