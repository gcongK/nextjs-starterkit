import Link from 'next/link'
import {
  Zap,
  Shield,
  Palette,
  Code2,
  ArrowRight,
  Blocks,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const features = [
  {
    icon: Zap,
    title: 'Next.js 16 App Router',
    description: '최신 App Router와 React Server Components로 빠른 성능을 제공합니다.',
  },
  {
    icon: Palette,
    title: 'shadcn/ui + Tailwind v4',
    description: '아름다운 UI 컴포넌트와 유틸리티 우선 CSS로 빠른 스타일링을 지원합니다.',
  },
  {
    icon: Shield,
    title: 'TypeScript Strict',
    description: '엄격한 타입 검사로 런타임 오류를 사전에 방지합니다.',
  },
  {
    icon: Code2,
    title: 'React Hook Form + Zod',
    description: '폼 유효성 검사를 타입 안전하게 처리합니다.',
  },
]

const techStack = ['Next.js 16', 'TypeScript', 'Tailwind v4', 'shadcn/ui', 'Zustand', 'React Hook Form', 'Zod']

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header />

      <main className="flex-1">
        {/* Hero 섹션 */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            모던 웹 스타터킷 v1.0
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            더 빠르게 시작하는
            <span className="text-primary block">모던 웹 개발</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10">
            Next.js 16, TypeScript, TailwindCSS, shadcn/ui로 구성된 프로덕션 레디 스타터킷입니다.
            불필요한 설정 없이 즉시 개발을 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/components">
                <Blocks className="mr-2 h-4 w-4" />
                컴포넌트 보기
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">
                시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* 기술 스택 뱃지 */}
        <section className="border-y bg-muted/30 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* 기능 카드 */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              모든 것이 준비되어 있습니다
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              프로덕션 수준의 기술 스택으로 구성되어 있어 바로 개발을 시작할 수 있습니다.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="border-t bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              포함된 모든 컴포넌트를 바로 확인하고 사용해보세요.
            </p>
            <Button size="lg" asChild>
              <Link href="/components">
                컴포넌트 둘러보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
