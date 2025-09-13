import { create } from 'zustand'
import { Board, Column } from '../types'
import { loadAppData, saveAppData, generateId } from '../utils'

interface BoardStore {
  board: Board | null
  
  // Actions
  loadBoard: () => void
  updateBoard: (updates: Partial<Board>) => void
  addColumn: (title: string, color?: string) => void
  updateColumn: (columnId: string, updates: Partial<Column>) => void
  deleteColumn: (columnId: string) => void
  reorderColumns: (columnIds: string[]) => void
  getColumn: (columnId: string) => Column | undefined
}

export const useBoardStore = create<BoardStore>((set, get) => ({
  board: null,

  loadBoard: () => {
    const data = loadAppData()
    set({ board: data.board })
  },

  updateBoard: (updates: Partial<Board>) => {
    set((state) => {
      if (!state.board) return state

      const updatedBoard = {
        ...state.board,
        ...updates,
        updatedAt: new Date().toISOString(),
      }

      const data = loadAppData()
      saveAppData({ ...data, board: updatedBoard })
      return { board: updatedBoard }
    })
  },

  addColumn: (title: string, color?: string) => {
    set((state) => {
      if (!state.board) return state

      const newColumn: Column = {
        id: generateId(),
        title,
        position: state.board.columns.length,
        color: color || '#6b7280',
      }

      const updatedBoard = {
        ...state.board,
        columns: [...state.board.columns, newColumn],
        updatedAt: new Date().toISOString(),
      }

      const data = loadAppData()
      saveAppData({ ...data, board: updatedBoard })
      return { board: updatedBoard }
    })
  },

  updateColumn: (columnId: string, updates: Partial<Column>) => {
    set((state) => {
      if (!state.board) return state

      const updatedColumns = state.board.columns.map((column) =>
        column.id === columnId ? { ...column, ...updates } : column
      )

      const updatedBoard = {
        ...state.board,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      }

      const data = loadAppData()
      saveAppData({ ...data, board: updatedBoard })
      return { board: updatedBoard }
    })
  },

  deleteColumn: (columnId: string) => {
    set((state) => {
      if (!state.board) return state

      const updatedColumns = state.board.columns
        .filter((column) => column.id !== columnId)
        .map((column, index) => ({ ...column, position: index }))

      const updatedBoard = {
        ...state.board,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      }

      const data = loadAppData()
      saveAppData({ ...data, board: updatedBoard })
      return { board: updatedBoard }
    })
  },

  reorderColumns: (columnIds: string[]) => {
    set((state) => {
      if (!state.board) return state

      const updatedColumns = columnIds.map((id, index) => {
        const column = state.board!.columns.find((col) => col.id === id)
        return column ? { ...column, position: index } : null
      }).filter(Boolean) as Column[]

      const updatedBoard = {
        ...state.board,
        columns: updatedColumns,
        updatedAt: new Date().toISOString(),
      }

      const data = loadAppData()
      saveAppData({ ...data, board: updatedBoard })
      return { board: updatedBoard }
    })
  },

  getColumn: (columnId: string) => {
    const board = get().board
    return board?.columns.find((column) => column.id === columnId)
  },
}))