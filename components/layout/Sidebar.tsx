'use client'

import Link from 'next/link'
import {
  SquareMousePointer,
  ImageIcon,
  FormInput,
  Bell,
  LayoutTemplate,
  Layers,
  Component,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

const navItems: NavItem[] = [
  { label: '버튼 & 배지', href: '/components#buttons', icon: SquareMousePointer },
  { label: '아바타 & 기타', href: '/components#display', icon: ImageIcon },
  { label: '입력', href: '/components#inputs', icon: FormInput },
  { label: '알림', href: '/components#feedback', icon: Bell },
  { label: '카드', href: '/components#cards', icon: LayoutTemplate },
  { label: '오버레이', href: '/components#overlays', icon: Layers },
  { label: '공통 컴포넌트', href: '/components#common', icon: Component },
]

interface SidebarNavProps {
  onNavigate?: () => void
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            {item.label}
            {item.badge && (
              <span className="ml-auto rounded-full bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                {item.badge}
              </span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r bg-sidebar lg:flex lg:flex-col">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-primary">◆</span>
          <span>스타터킷</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  )
}
