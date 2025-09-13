import { useState } from 'react'
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useTaskStore } from '../stores'
import { Task } from '../types'

export interface DragData {
  activeTask: Task | null
  overId: string | null
}

export function useDragAndDrop() {
  const { moveTask, getTasksByColumn, tasks } = useTaskStore()
  const [dragData, setDragData] = useState<DragData>({
    activeTask: null,
    overId: null,
  })

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const taskId = active.id as string
    const activeTask = tasks.find(task => task.id === taskId) || null
    
    setDragData(prev => ({
      ...prev,
      activeTask,
    }))
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    setDragData(prev => ({
      ...prev,
      overId: over?.id as string || null,
    }))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over || !dragData.activeTask) {
      setDragData({ activeTask: null, overId: null })
      return
    }

    const activeTaskId = active.id as string
    const overId = over.id as string
    const activeTask = dragData.activeTask

    // Check if we're dropping on a column or a task
    const isDroppedOnColumn = overId.startsWith('column-')
    const isDroppedOnTask = !isDroppedOnColumn

    if (isDroppedOnColumn) {
      // Dropped on a column - move to end of column
      const destinationColumnId = overId.replace('column-', '')
      const destinationTasks = getTasksByColumn(destinationColumnId)
      
      if (destinationColumnId !== activeTask.columnId) {
        // Moving to different column
        moveTask({
          taskId: activeTaskId,
          sourceColumnId: activeTask.columnId,
          destinationColumnId,
          destinationPosition: destinationTasks.length,
        })
      }
    } else if (isDroppedOnTask) {
      // Dropped on another task - reorder
      const overTask = tasks.find(task => task.id === overId)
      
      if (!overTask) {
        setDragData({ activeTask: null, overId: null })
        return
      }

      if (activeTask.columnId === overTask.columnId) {
        // Same column - reorder tasks
        const columnTasks = getTasksByColumn(activeTask.columnId)
        const activeIndex = columnTasks.findIndex(task => task.id === activeTaskId)
        const overIndex = columnTasks.findIndex(task => task.id === overId)
        
        if (activeIndex !== overIndex) {
          // Calculate new position based on the reordered array
          const reorderedTasks = arrayMove(columnTasks, activeIndex, overIndex)
          const newPosition = reorderedTasks.findIndex(task => task.id === activeTaskId)
          
          moveTask({
            taskId: activeTaskId,
            sourceColumnId: activeTask.columnId,
            destinationColumnId: activeTask.columnId,
            destinationPosition: newPosition,
          })
        }
      } else {
        // Different column - move to position of target task
        moveTask({
          taskId: activeTaskId,
          sourceColumnId: activeTask.columnId,
          destinationColumnId: overTask.columnId,
          destinationPosition: overTask.position,
        })
      }
    }

    setDragData({ activeTask: null, overId: null })
  }

  const handleDragCancel = () => {
    setDragData({ activeTask: null, overId: null })
  }

  return {
    dragData,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDragCancel,
  }
}