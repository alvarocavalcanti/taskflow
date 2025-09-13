import { useState, useEffect } from 'react'
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Task, TaskFormData } from '../../types'
import { DroppableColumn } from './DroppableColumn'
import { TaskForm, TaskCard } from '../Task'
import { useBoardStore, useTaskStore } from '../../stores'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'

export function KanbanBoard() {
  const { board, loadBoard } = useBoardStore()
  const { tasks, loadTasks, addTask, updateTask, getTasksByColumn } = useTaskStore()
  const { dragData, handleDragStart, handleDragOver, handleDragEnd, handleDragCancel } = useDragAndDrop()
  
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [selectedColumnId, setSelectedColumnId] = useState<string>('')

  // Configure sensors for accessibility
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    loadBoard()
    loadTasks()
  }, [loadBoard, loadTasks])

  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId)
    setEditingTask(null)
    setIsTaskFormOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setSelectedColumnId(task.columnId)
    setIsTaskFormOpen(true)
  }

  const handleTaskFormSubmit = (formData: TaskFormData) => {
    if (editingTask) {
      // Update existing task
      updateTask({
        id: editingTask.id,
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate,
        blocked: formData.blocked,
        tags: formData.tags,
        completed: editingTask?.completed || false,
      })
    } else {
      // Create new task
      addTask({
        title: formData.title,
        description: formData.description,
        columnId: selectedColumnId,
        priority: formData.priority,
        dueDate: formData.dueDate,
        blocked: formData.blocked,
        tags: formData.tags,
      })
    }
  }

  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false)
    setEditingTask(null)
    setSelectedColumnId('')
  }

  if (!board) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading board...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full">
      {/* Board Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{board.title}</h2>
        <p className="text-gray-600">
          {tasks.length} tasks across {board.columns.length} columns
        </p>
      </div>

      {/* Kanban Columns */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        accessibility={{
          announcements: {
            onDragStart: ({ active }) => {
              const task = tasks.find(t => t.id === active.id)
              return `Picked up task: ${task?.title || 'Unknown task'}`
            },
            onDragOver: ({ active, over }) => {
              const task = tasks.find(t => t.id === active.id)
              if (over?.id.toString().startsWith('column-')) {
                const columnId = over.id.toString().replace('column-', '')
                const column = board?.columns.find(c => c.id === columnId)
                return `Moving ${task?.title || 'task'} over ${column?.title || 'column'}`
              }
              return `Moving ${task?.title || 'task'}`
            },
            onDragEnd: ({ active, over }) => {
              const task = tasks.find(t => t.id === active.id)
              if (!over) {
                return `Task ${task?.title || 'task'} was not moved`
              }
              if (over.id.toString().startsWith('column-')) {
                const columnId = over.id.toString().replace('column-', '')
                const column = board?.columns.find(c => c.id === columnId)
                return `Task ${task?.title || 'task'} moved to ${column?.title || 'column'}`
              }
              return `Task ${task?.title || 'task'} moved`
            },
            onDragCancel: ({ active }) => {
              const task = tasks.find(t => t.id === active.id)
              return `Moving ${task?.title || 'task'} was cancelled`
            },
          },
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
          {board.columns
            .sort((a, b) => a.position - b.position)
            .map((column) => (
              <DroppableColumn
                key={column.id}
                column={column}
                tasks={getTasksByColumn(column.id)}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                isOver={dragData.overId === `column-${column.id}`}
              />
            ))}
        </div>
        
        {/* Drag Overlay */}
        <DragOverlay>
          {dragData.activeTask ? (
            <TaskCard 
              task={dragData.activeTask} 
              isDragging={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={handleCloseTaskForm}
        onSubmit={handleTaskFormSubmit}
        task={editingTask}
      />
    </div>
  )
}