---
name: Common Issues Found in Starterkit Review
description: 초기 전체 코드 리뷰(2026-04-20)에서 발견된 반복 패턴, 버그, 개선 사항
type: project
---

## 발견된 주요 패턴

### 잠재적 버그
1. ThemeToggle: `theme`이 `undefined`일 때 `'system'` 모드에서 토글 동작 오작동. `resolvedTheme` 사용 필요.
2. Footer: `<a>` 태그 직접 사용 (`이용약관`, `개인정보처리방침`) — 내부 링크라면 `next/link` 사용 필요.
3. `globals.css` `--font-sans`: `var(--font-sans)`가 자기 자신을 참조하는 순환 참조. 실제 폰트 변수 `var(--font-geist-sans)` 사용 필요.

### 접근성(a11y)
1. Login/Register 폼의 에러 메시지가 `aria-describedby`로 Input과 연결되지 않음.
2. LoadingSpinner에 `role="status"`, `aria-label` 없음.
3. ThemeToggle: `aria-label` 있지만 현재 테마 상태가 스크린리더에 전달되지 않음.

### 스타일 이슈
1. `app/page.tsx` 기능 카드의 `hover:shadow-md` — 그림자는 시맨틱 토큰 없이 hardcode됨. 경미한 수준.
2. `components/page.tsx` Skeleton에 하드코딩된 픽셀값 (`w-[250px]` 등) — 유틸리티 클래스이므로 허용 범위이지만 주의.

### 코드 품질
1. Login/Register의 `onSubmit`에 `console.log(data)` 잔류 — 프로덕션 전 제거 필요.
2. `Header.tsx`의 `showSidebarToggle` 분기 로직이 다소 복잡 — 빈 `<div />`가 존재.
3. `useUIStore.ts`에 `'use client'` 디렉티브가 있으나 Zustand store 파일에는 불필요. 단, `create`가 클라이언트 전용 API이므로 큰 문제 없음.

### 누락된 기능
1. `(dashboard)/components/page.tsx`에 Dialog 임포트되어 있으나 `components/ui/dialog.tsx` 별도로 존재 — 정상.
2. `NavItem` 타입에 `children?: NavItem[]` 필드가 있으나 Sidebar에서 중첩 내비게이션 미구현 — 미래 확장을 위한 타입 선언으로 보임.

**Why:** 초기 리뷰 스냅샷, 향후 PR 리뷰 시 이미 인지된 항목과 신규 항목 구별에 활용
**How to apply:** 위 이슈들이 수정되었는지 후속 리뷰 시 확인. 새 기능 추가 시 동일 패턴 반복 여부 체크.
