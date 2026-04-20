import { Users, TrendingUp, ShoppingCart, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/common/PageHeader'

const stats = [
  {
    label: '총 사용자',
    value: '2,450',
    change: '+12%',
    trend: 'up',
    icon: Users,
  },
  {
    label: '이번달 매출',
    value: '₩12,345,000',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    label: '신규 주문',
    value: '384',
    change: '-3%',
    trend: 'down',
    icon: ShoppingCart,
  },
  {
    label: '전환율',
    value: '4.6%',
    change: '+1.2%',
    trend: 'up',
    icon: TrendingUp,
  },
]

const recentActivities = [
  { user: '김민준', action: '새 계정을 생성했습니다', time: '방금 전', initials: '김' },
  { user: '이서연', action: '주문 #1234를 완료했습니다', time: '5분 전', initials: '이' },
  { user: '박지호', action: '프로필을 업데이트했습니다', time: '12분 전', initials: '박' },
  { user: '최수아', action: '새 문서를 작성했습니다', time: '1시간 전', initials: '최' },
  { user: '정도윤', action: '설정을 변경했습니다', time: '2시간 전', initials: '정' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="대시보드"
        description="서비스 현황을 한눈에 확인하세요"
      />

      {/* 통계 카드 */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Badge
                  variant={stat.trend === 'up' ? 'default' : 'destructive'}
                  className="mt-1 text-xs"
                >
                  {stat.change} 지난달 대비
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 최근 활동 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
          <CardDescription>최근 사용자 활동 내역입니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {recentActivities.map((activity, index) => (
              <div key={index}>
                <div className="flex items-center gap-4 py-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-sm">{activity.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                </div>
                {index < recentActivities.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
