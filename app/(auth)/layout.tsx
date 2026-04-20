import Link from 'next/link'
import { ThemeToggle } from '@/components/common/ThemeToggle'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-full flex flex-col">
      <header className="flex h-14 items-center justify-between px-6 border-b">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-primary">◆</span>
          <span>스타터킷</span>
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </main>
    </div>
  )
}
