import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { TaskCard } from './TaskCard'
import { Task } from '../../types'

interface DraggableTaskProps {
  task: Task
  onClick?: () => void
  onToggleComplete?: () => void
  isDragOverlay?: boolean
}

export function DraggableTask({ 
  task, 
  onClick, 
  onToggleComplete, 
  isDragOverlay = false 
}: DraggableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  // Don't apply draggable props to the overlay
  const draggableProps = isDragOverlay 
    ? {} 
    : { 
        ...listeners, 
        ...attributes,
        'aria-label': `Draggable task: ${task.title}. Press space to pick up, arrow keys to move, space to drop.`,
        role: 'button',
        tabIndex: 0,
      }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'opacity-30' : ''}
      {...draggableProps}
    >
      <TaskCard
        task={task}
        onClick={onClick}
        onToggleComplete={onToggleComplete}
        isDragging={isDragging || isDragOverlay}
      />
    </div>
  )
}