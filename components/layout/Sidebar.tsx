'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

const navItems: NavItem[] = [
  { label: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { label: '분석', href: '/dashboard/analytics', icon: BarChart3 },
  { label: '사용자', href: '/dashboard/users', icon: Users },
  { label: '문서', href: '/dashboard/docs', icon: FileText },
  { label: '설정', href: '/dashboard/settings', icon: Settings },
]

interface SidebarNavProps {
  onNavigate?: () => void
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 p-4">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
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
