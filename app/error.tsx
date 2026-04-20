'use client'

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>오류가 발생했습니다</AlertTitle>
          <AlertDescription>
            {error.message || '알 수 없는 오류가 발생했습니다.'}
          </AlertDescription>
        </Alert>
        <div className="flex gap-2">
          <Button onClick={reset} className="flex-1">
            다시 시도
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/">홈으로</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
