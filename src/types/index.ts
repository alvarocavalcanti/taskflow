export interface Tag {
  id: string
  name: string
  color: string
}

export interface Task {
  id: string
  title: string
  description?: string
  columnId: string
  position: number
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
  blocked: boolean
  completed: boolean
  tags: Tag[]
  createdAt: string
  updatedAt: string
}

export interface Column {
  id: string
  title: string
  position: number
  color?: string
}

export interface Board {
  id: string
  title: string
  columns: Column[]
  createdAt: string
  updatedAt: string
}

export interface AppSettings {
  theme: 'light' | 'dark'
  autoSave: boolean
  showCompletedTasks: boolean
  defaultPriority: Task['priority']
}

export interface AppData {
  board: Board
  tasks: Task[]
  settings: AppSettings
}

export type Priority = 'low' | 'medium' | 'high'

export interface TaskFormData {
  title: string
  description?: string
  priority: Priority
  dueDate?: string
  blocked: boolean
  tags: Tag[]
}

export interface CreateTaskInput {
  title: string
  description?: string
  columnId: string
  priority?: Priority
  dueDate?: string
  blocked?: boolean
  tags?: Tag[]
}

export interface UpdateTaskInput {
  id: string
  title?: string
  description?: string
  priority?: Priority
  dueDate?: string
  blocked?: boolean
  completed?: boolean
  tags?: Tag[]
}

export interface MoveTaskInput {
  taskId: string
  sourceColumnId: string
  destinationColumnId: string
  destinationPosition: number
}

// Color options for tags
export const TAG_COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#6b7280', // gray
  '#84cc16', // lime
] as const

export type TagColor = typeof TAG_COLORS[number]