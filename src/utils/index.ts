export * from './localStorage'
export * from './export'

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function isOverdue(dueDate: string): boolean {
  return new Date(dueDate) < new Date()
}

export function isDueSoon(dueDate: string, days: number = 2): boolean {
  const due = new Date(dueDate)
  const soon = new Date()
  soon.setDate(soon.getDate() + days)
  return due <= soon && due >= new Date()
}

export function getPriorityColor(priority: 'low' | 'medium' | 'high'): string {
  switch (priority) {
    case 'high':
      return '#ef4444' // red
    case 'medium':
      return '#f59e0b' // amber
    case 'low':
      return '#10b981' // emerald
    default:
      return '#6b7280' // gray
  }
}

export function getPriorityLabel(priority: 'low' | 'medium' | 'high'): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}