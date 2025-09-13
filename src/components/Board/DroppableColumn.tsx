import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Column } from './Column'
import { Column as ColumnType, Task } from '../../types'
import { cn } from '../../utils'

interface DroppableColumnProps {
  column: ColumnType
  tasks: Task[]
  onAddTask: (columnId: string) => void
  onEditTask: (task: Task) => void
  isOver?: boolean
}

export function DroppableColumn({ 
  column, 
  tasks, 
  onAddTask, 
  onEditTask,
  isOver = false 
}: DroppableColumnProps) {
  const { setNodeRef, isOver: isDroppableOver } = useDroppable({
    id: `column-${column.id}`,
    data: {
      type: 'column',
      column,
    },
  })

  const taskIds = tasks.map(task => task.id)

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'transition-colors duration-200',
        (isOver || isDroppableOver) && 'bg-primary-50'
      )}
      aria-label={`Drop zone for ${column.title} column`}
      role="region"
    >
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <Column
          column={column}
          tasks={tasks}
          onAddTask={onAddTask}
          onEditTask={onEditTask}
          isOver={isOver || isDroppableOver}
        />
      </SortableContext>
    </div>
  )
}