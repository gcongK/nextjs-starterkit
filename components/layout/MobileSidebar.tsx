'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SidebarNav } from './Sidebar'
import { useUIStore } from '@/store/useUIStore'
import Link from 'next/link'

export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-60 p-0">
        <SheetHeader className="flex h-14 flex-row items-center border-b px-6 space-y-0">
          <SheetTitle asChild>
            <Link
              href="/"
              className="flex items-center gap-2 font-bold"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-primary">◆</span>
              <span>스타터킷</span>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <SidebarNav onNavigate={() => setSidebarOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
