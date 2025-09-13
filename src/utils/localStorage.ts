import { AppData, Board, Task, AppSettings } from '../types'

const STORAGE_KEY = 'taskflow-data'
const SETTINGS_KEY = 'taskflow-settings'

export const defaultBoard: Board = {
  id: 'default-board',
  title: 'My Kanban Board',
  columns: [
    { id: 'todo', title: 'To Do', position: 0, color: '#6b7280' },
    { id: 'in-progress', title: 'In Progress', position: 1, color: '#3b82f6' },
    { id: 'review', title: 'Review', position: 2, color: '#f59e0b' },
    { id: 'done', title: 'Done', position: 3, color: '#10b981' },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const defaultSettings: AppSettings = {
  theme: 'light',
  autoSave: true,
  showCompletedTasks: true,
  defaultPriority: 'medium',
}

export const defaultTasks: Task[] = [
  {
    id: 'sample-task-1',
    title: 'Welcome to TaskFlow!',
    description: 'This is a sample task to get you started. You can edit or delete this task.',
    columnId: 'todo',
    position: 0,
    priority: 'medium',
    blocked: false,
    completed: false,
    tags: [
      { id: 'tag-1', name: 'Welcome', color: '#3b82f6' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-task-2',
    title: 'Try drag and drop',
    description: 'Drag this task to different columns to see how it works.',
    columnId: 'in-progress',
    position: 0,
    priority: 'high',
    blocked: false,
    completed: false,
    tags: [
      { id: 'tag-2', name: 'Demo', color: '#10b981' },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'sample-task-3',
    title: 'Completed task example',
    description: 'This shows how completed tasks look.',
    columnId: 'done',
    position: 0,
    priority: 'low',
    blocked: false,
    completed: true,
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function loadAppData(): AppData {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY)
    const storedSettings = localStorage.getItem(SETTINGS_KEY)

    if (storedData && storedSettings) {
      const data = JSON.parse(storedData)
      const settings = JSON.parse(storedSettings)
      
      return {
        board: data.board || defaultBoard,
        tasks: data.tasks || [],
        settings: { ...defaultSettings, ...settings },
      }
    }
  } catch (error) {
    console.error('Error loading data from localStorage:', error)
  }

  // Return default data if nothing is stored or error occurs
  return {
    board: defaultBoard,
    tasks: defaultTasks,
    settings: defaultSettings,
  }
}

export function saveAppData(data: AppData): void {
  try {
    const dataToStore = {
      board: data.board,
      tasks: data.tasks,
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore))
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(data.settings))
  } catch (error) {
    console.error('Error saving data to localStorage:', error)
  }
}

export function exportData(): string {
  const data = loadAppData()
  return JSON.stringify(data, null, 2)
}

export function importData(jsonString: string): AppData {
  try {
    const importedData = JSON.parse(jsonString)
    
    // Validate the structure
    if (!importedData.board || !Array.isArray(importedData.tasks)) {
      throw new Error('Invalid data structure')
    }

    const data: AppData = {
      board: { ...defaultBoard, ...importedData.board },
      tasks: importedData.tasks,
      settings: { ...defaultSettings, ...importedData.settings },
    }

    saveAppData(data)
    return data
  } catch (error) {
    console.error('Error importing data:', error)
    throw new Error('Failed to import data. Please check the file format.')
  }
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(SETTINGS_KEY)
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}