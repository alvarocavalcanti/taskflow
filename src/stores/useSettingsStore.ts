import { create } from 'zustand'
import { AppSettings } from '../types'
import { loadAppData, saveAppData } from '../utils'

interface SettingsStore {
  settings: AppSettings
  
  // Actions
  loadSettings: () => void
  updateSettings: (updates: Partial<AppSettings>) => void
  toggleTheme: () => void
  toggleAutoSave: () => void
  toggleShowCompletedTasks: () => void
  setDefaultPriority: (priority: AppSettings['defaultPriority']) => void
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: {
    theme: 'light',
    autoSave: true,
    showCompletedTasks: true,
    defaultPriority: 'medium',
  },

  loadSettings: () => {
    const data = loadAppData()
    set({ settings: data.settings })
  },

  updateSettings: (updates: Partial<AppSettings>) => {
    set((state) => {
      const updatedSettings = { ...state.settings, ...updates }
      
      const data = loadAppData()
      saveAppData({ ...data, settings: updatedSettings })
      return { settings: updatedSettings }
    })
  },

  toggleTheme: () => {
    const currentTheme = get().settings.theme
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    get().updateSettings({ theme: newTheme })
  },

  toggleAutoSave: () => {
    const currentAutoSave = get().settings.autoSave
    get().updateSettings({ autoSave: !currentAutoSave })
  },

  toggleShowCompletedTasks: () => {
    const currentShow = get().settings.showCompletedTasks
    get().updateSettings({ showCompletedTasks: !currentShow })
  },

  setDefaultPriority: (priority: AppSettings['defaultPriority']) => {
    get().updateSettings({ defaultPriority: priority })
  },
}))