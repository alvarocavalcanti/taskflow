import { useState } from 'react'
import { Button } from './UI'
import { downloadData, uploadData } from '../utils'
import { useTaskStore, useBoardStore, useSettingsStore } from '../stores'

export function Header() {
  const { loadTasks } = useTaskStore()
  const { loadBoard } = useBoardStore()
  const { loadSettings, settings } = useSettingsStore()
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      downloadData()
    } catch (error) {
      alert('Failed to export data. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = async () => {
    try {
      setIsImporting(true)
      await uploadData()
      
      // Reload all data from localStorage
      loadBoard()
      loadTasks()
      loadSettings()
      
      alert('Data imported successfully!')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to import data')
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
            </div>
            <div className="ml-4 text-sm text-gray-600">
              Personal Kanban Board
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Export/Import */}
            <Button
              size="sm"
              variant="secondary"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : '📤 Export'}
            </Button>
            
            <Button
              size="sm"
              variant="secondary"
              onClick={handleImport}
              disabled={isImporting}
            >
              {isImporting ? 'Importing...' : '📥 Import'}
            </Button>

            {/* Quick Stats */}
            <div className="hidden sm:flex items-center text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-md">
                Auto-save: {settings.autoSave ? 'On' : 'Off'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}