export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: 'admin' | 'user'
  createdAt: string
}

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavItem[]
}
