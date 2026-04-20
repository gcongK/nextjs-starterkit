import Link from 'next/link'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { MobileSidebar } from './MobileSidebar'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  showSidebarToggle?: boolean
}

export function Header({ showSidebarToggle = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      {showSidebarToggle && <MobileSidebar />}
      <div className="flex flex-1 items-center justify-between">
        {!showSidebarToggle && (
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="text-primary">◆</span>
            <span>스타터킷</span>
          </Link>
        )}
        {showSidebarToggle && <div />}
        <nav className="flex items-center gap-2">
          <ThemeToggle />
          {!showSidebarToggle && (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">로그인</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">시작하기</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
