import { create } from 'zustand'
import { Task, CreateTaskInput, UpdateTaskInput, MoveTaskInput, Tag } from '../types'
import { loadAppData, saveAppData, generateId } from '../utils'

interface TaskStore {
  tasks: Task[]
  
  // Actions
  loadTasks: () => void
  addTask: (input: CreateTaskInput) => void
  updateTask: (input: UpdateTaskInput) => void
  deleteTask: (taskId: string) => void
  moveTask: (input: MoveTaskInput) => void
  toggleTaskCompletion: (taskId: string) => void
  addTagToTask: (taskId: string, tag: Tag) => void
  removeTagFromTask: (taskId: string, tagId: string) => void
  getTasksByColumn: (columnId: string) => Task[]
  getTask: (taskId: string) => Task | undefined
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  loadTasks: () => {
    const data = loadAppData()
    set({ tasks: data.tasks })
  },

  addTask: (input: CreateTaskInput) => {
    const newTask: Task = {
      id: generateId(),
      title: input.title,
      description: input.description,
      columnId: input.columnId,
      position: get().getTasksByColumn(input.columnId).length,
      priority: input.priority || 'medium',
      dueDate: input.dueDate,
      blocked: input.blocked || false,
      completed: false,
      tags: input.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    set((state) => {
      const updatedTasks = [...state.tasks, newTask]
      const data = loadAppData()
      saveAppData({ ...data, tasks: updatedTasks })
      return { tasks: updatedTasks }
    })
  },

  updateTask: (input: UpdateTaskInput) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === input.id
          ? {
              ...task,
              ...input,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
      
      const data = loadAppData()
      saveAppData({ ...data, tasks: updatedTasks })
      return { tasks: updatedTasks }
    })
  },

  deleteTask: (taskId: string) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== taskId)
      const data = loadAppData()
      saveAppData({ ...data, tasks: updatedTasks })
      return { tasks: updatedTasks }
    })
  },

  moveTask: (input: MoveTaskInput) => {
    set((state) => {
      const { taskId, sourceColumnId, destinationColumnId, destinationPosition } = input
      
      // Find the task to move
      const taskToMove = state.tasks.find((task) => task.id === taskId)
      if (!taskToMove) return state

      // Remove task from source position and update positions in source column
      let updatedTasks = state.tasks.filter((task) => task.id !== taskId)
      
      // Update positions in source column
      updatedTasks = updatedTasks.map((task) => {
        if (task.columnId === sourceColumnId && task.position > taskToMove.position) {
          return { ...task, position: task.position - 1 }
        }
        return task
      })

      // Update positions in destination column
      updatedTasks = updatedTasks.map((task) => {
        if (task.columnId === destinationColumnId && task.position >= destinationPosition) {
          return { ...task, position: task.position + 1 }
        }
        return task
      })

      // Insert task at new position
      const movedTask = {
        ...taskToMove,
        columnId: destinationColumnId,
        position: destinationPosition,
        updatedAt: new Date().toISOString(),
      }

      updatedTasks.push(movedTask)

      const data = loadAppData()
      saveAppData({ ...data, tasks: updatedTasks })
      return { tasks: updatedTasks }
    })
  },

  toggleTaskCompletion: (taskId: string) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString(),
            }
          : task
      )
      
      const data = loadAppData()
      saveAppData({ ...data, tasks: updatedTasks })
      return { tasks: updatedTasks }
    })
  },

  addTagToTask: (taskId: string, tag: Tag) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === taskId) {
          const existingTag = task.tags.find((t) => t.id === tag.id)
          if (existingTag) return task
          
          return {
            ...task,
            tags: [...task.tags, tag],
            updatedAt: new Date().toISOString(),
          }
        }
        return task
      })
      
      const data = loadAppData()
      saveAppData({ ...data, tasks: updatedTasks })
      return { tasks: updatedTasks }
    })
  },

  removeTagFromTask: (taskId: string, tagId: string) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              tags: task.tags.filter((tag) => tag.id !== tagId),
              updatedAt: new Date().toISOString(),
            }
          : task
      )
      
      const data = loadAppData()
      saveAppData({ ...data, tasks: updatedTasks })
      return { tasks: updatedTasks }
    })
  },

  getTasksByColumn: (columnId: string) => {
    return get()
      .tasks.filter((task) => task.columnId === columnId)
      .sort((a, b) => a.position - b.position)
  },

  getTask: (taskId: string) => {
    return get().tasks.find((task) => task.id === taskId)
  },
}))