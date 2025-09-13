import { useState } from 'react'
import { Column as ColumnType, Task } from '../../types'
import { DraggableTask } from '../Task'
import { Button } from '../UI'
import { EditableColumnTitle } from './EditableColumnTitle'
import { useTaskStore, useSettingsStore, useBoardStore } from '../../stores'
import { cn } from '../../utils'

interface ColumnProps {
  column: ColumnType
  tasks: Task[]
  onAddTask: (columnId: string) => void
  onEditTask: (task: Task) => void
  isOver?: boolean
}

export function Column({ column, tasks, onAddTask, onEditTask, isOver = false }: ColumnProps) {
  const { toggleTaskCompletion, deleteTask } = useTaskStore()
  const { updateColumn } = useBoardStore()
  const { settings } = useSettingsStore()
  const [showCompleted, setShowCompleted] = useState(settings.showCompletedTasks)

  const completedTasks = tasks.filter(task => task.completed)
  const incompleteTasks = tasks.filter(task => !task.completed)
  const displayTasks = showCompleted ? tasks : incompleteTasks

  const handleTaskClick = (task: Task) => {
    onEditTask(task)
  }

  const handleToggleComplete = (taskId: string) => {
    toggleTaskCompletion(taskId)
  }

  const handleDeleteTask = (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId)
    }
  }

  const handleColumnTitleSave = (newTitle: string) => {
    updateColumn(column.id, { title: newTitle })
  }

  return (
    <div className={cn(
      "flex flex-col h-full bg-gray-50 rounded-lg transition-colors duration-200",
      isOver && "bg-primary-50 ring-2 ring-primary-200"
    )}>
      {/* Column Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: column.color || '#6b7280' }}
            />
            <EditableColumnTitle
              title={column.title}
              onSave={handleColumnTitleSave}
            />
            <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
              {tasks.length}
            </span>
          </div>
          
          <Button
            size="sm"
            onClick={() => onAddTask(column.id)}
            className="text-xs"
          >
            + Add
          </Button>
        </div>

        {/* Toggle completed tasks visibility */}
        {completedTasks.length > 0 && (
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-xs text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            {showCompleted ? 'Hide' : 'Show'} completed ({completedTasks.length})
          </button>
        )}
      </div>

      {/* Tasks List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-3">
          {displayTasks.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-3.5m-9 0H4" />
                </svg>
              </div>
              <p className="text-sm text-gray-500">No tasks yet</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onAddTask(column.id)}
                className="mt-2"
              >
                Add your first task
              </Button>
            </div>
          ) : (
            displayTasks.map((task) => (
              <div key={task.id} className="group relative">
                <DraggableTask
                  task={task}
                  onClick={() => handleTaskClick(task)}
                  onToggleComplete={() => handleToggleComplete(task.id)}
                />
                
                {/* Task actions (visible on hover) */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-1 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditTask(task)
                    }}
                    className="text-gray-400 hover:text-blue-600 p-1 bg-white rounded shadow-sm"
                    title="Edit task"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteTask(task.id)
                    }}
                    className="text-gray-400 hover:text-red-600 p-1 bg-white rounded shadow-sm"
                    title="Delete task"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Drop zone indicator */}
      <div className={cn(
        "p-2 border-t border-gray-200 bg-gray-100 rounded-b-lg transition-colors duration-200",
        isOver && "bg-primary-100 border-primary-300"
      )}>
        <div className={cn(
          "h-2 border-2 border-dashed border-gray-300 rounded transition-colors duration-200",
          isOver ? "border-primary-400 bg-primary-50" : "hover:border-primary-400"
        )} />
      </div>
    </div>
  )
}