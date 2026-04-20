'use client'

import { Inbox, Bell } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { PageHeader } from '@/components/common/PageHeader'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { EmptyState } from '@/components/common/EmptyState'

function PreviewCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <div className="rounded-lg border bg-muted/30 p-6">
        {children}
      </div>
    </div>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-6 scroll-mt-20">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

export default function ComponentsPage() {
  return (
    <div className="space-y-12 pb-16">
      <PageHeader
        title="컴포넌트 미리보기"
        description="starterkit에 포함된 모든 컴포넌트를 확인하세요"
      />

      {/* 버튼 & 배지 */}
      <Section id="buttons" title="버튼 & 배지">
        <PreviewCard title="Button — Variants">
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </PreviewCard>

        <PreviewCard title="Button — Sizes">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </PreviewCard>

        <PreviewCard title="Badge — Variants">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </PreviewCard>
      </Section>

      {/* 아바타 & 기타 */}
      <Section id="display" title="아바타 & 기타">
        <PreviewCard title="Avatar">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarFallback>김</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>이</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </PreviewCard>

        <PreviewCard title="Separator">
          <div className="space-y-3">
            <p className="text-sm">위 콘텐츠</p>
            <Separator />
            <p className="text-sm">아래 콘텐츠</p>
          </div>
        </PreviewCard>

        <PreviewCard title="Skeleton">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          </div>
        </PreviewCard>
      </Section>

      {/* 입력 */}
      <Section id="inputs" title="입력">
        <PreviewCard title="Input">
          <div className="flex flex-col gap-3 max-w-sm">
            <Input placeholder="기본 입력" />
            <Input type="password" placeholder="비밀번호" />
            <Input disabled placeholder="비활성화" />
          </div>
        </PreviewCard>

        <PreviewCard title="Label + Input">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="name@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pw">비밀번호</Label>
              <Input id="pw" type="password" placeholder="••••••••" />
            </div>
          </div>
        </PreviewCard>
      </Section>

      {/* 알림 */}
      <Section id="feedback" title="알림">
        <PreviewCard title="Alert">
          <div className="space-y-3">
            <Alert>
              <AlertTitle>일반 알림</AlertTitle>
              <AlertDescription>이것은 기본 알림 메시지입니다.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>오류 발생</AlertTitle>
              <AlertDescription>요청을 처리하는 중 문제가 발생했습니다.</AlertDescription>
            </Alert>
          </div>
        </PreviewCard>

        <PreviewCard title="Toast (Sonner)">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast('기본 알림 메시지')}>
              기본
            </Button>
            <Button variant="outline" onClick={() => toast.success('저장되었습니다')}>
              성공
            </Button>
            <Button variant="outline" onClick={() => toast.error('오류가 발생했습니다')}>
              오류
            </Button>
            <Button variant="outline" onClick={() => toast.warning('주의가 필요합니다')}>
              경고
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.promise(new Promise((res) => setTimeout(res, 2000)), {
                  loading: '처리 중...',
                  success: '완료되었습니다',
                  error: '실패했습니다',
                })
              }
            >
              Promise
            </Button>
          </div>
        </PreviewCard>
      </Section>

      {/* 카드 */}
      <Section id="cards" title="카드">
        <PreviewCard title="Card">
          <div className="max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>카드 제목</CardTitle>
                <CardDescription>카드에 대한 간단한 설명입니다.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">카드 본문 영역입니다. 다양한 콘텐츠를 여기에 배치하세요.</p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm">확인</Button>
                <Button size="sm" variant="outline">취소</Button>
              </CardFooter>
            </Card>
          </div>
        </PreviewCard>
      </Section>

      {/* 오버레이 */}
      <Section id="overlays" title="오버레이">
        <PreviewCard title="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">다이얼로그 열기</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>정말 삭제하시겠습니까?</DialogTitle>
                <DialogDescription>
                  이 작업은 되돌릴 수 없습니다. 데이터가 영구적으로 삭제됩니다.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="destructive">삭제</Button>
                <Button variant="outline">취소</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PreviewCard>

        <PreviewCard title="Sheet">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">시트 열기</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>설정</SheetTitle>
                <SheetDescription>계정 설정을 변경하세요. 완료 후 저장 버튼을 눌러주세요.</SheetDescription>
              </SheetHeader>
              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="sheet-name">이름</Label>
                  <Input id="sheet-name" placeholder="홍길동" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sheet-email">이메일</Label>
                  <Input id="sheet-email" type="email" placeholder="name@example.com" />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </PreviewCard>

        <PreviewCard title="Dropdown Menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">메뉴 열기</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>내 계정</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>프로필</DropdownMenuItem>
              <DropdownMenuItem>설정</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">로그아웃</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </PreviewCard>
      </Section>

      {/* 공통 컴포넌트 */}
      <Section id="common" title="공통 컴포넌트">
        <PreviewCard title="PageHeader">
          <PageHeader
            title="페이지 제목"
            description="페이지에 대한 설명이 여기에 표시됩니다."
          />
        </PreviewCard>

        <PreviewCard title="LoadingSpinner">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <LoadingSpinner size="sm" />
              <span className="text-xs text-muted-foreground">sm</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LoadingSpinner size="md" />
              <span className="text-xs text-muted-foreground">md</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <LoadingSpinner size="lg" />
              <span className="text-xs text-muted-foreground">lg</span>
            </div>
          </div>
        </PreviewCard>

        <PreviewCard title="EmptyState">
          <EmptyState
            icon={<Inbox className="h-10 w-10" />}
            title="데이터가 없습니다"
            description="아직 등록된 항목이 없습니다. 새 항목을 추가해보세요."
            action={
              <Button size="sm">
                <Bell className="mr-2 h-4 w-4" />
                항목 추가
              </Button>
            }
          />
        </PreviewCard>
      </Section>
    </div>
  )
}
