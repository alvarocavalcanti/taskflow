import { useEffect } from 'react'
import { Header, KanbanBoard } from './components'
import { useTaskStore, useBoardStore, useSettingsStore } from './stores'
import './App.css'

function App() {
  const { loadTasks } = useTaskStore()
  const { loadBoard } = useBoardStore()
  const { loadSettings } = useSettingsStore()

  useEffect(() => {
    // Initialize all stores with data from localStorage
    loadBoard()
    loadTasks()
    loadSettings()
  }, [loadBoard, loadTasks, loadSettings])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KanbanBoard />
      </main>
    </div>
  )
}

export default App