import { Task } from '../../types'
import { Badge } from '../UI'
import { formatDate, isOverdue, isDueSoon, getPriorityColor, cn } from '../../utils'

interface TaskCardProps {
  task: Task
  onClick?: () => void
  onToggleComplete?: () => void
  isDragging?: boolean
}

export function TaskCard({ 
  task, 
  onClick, 
  onToggleComplete,
  isDragging = false 
}: TaskCardProps) {
  const isTaskOverdue = task.dueDate ? isOverdue(task.dueDate) : false
  const isTaskDueSoon = task.dueDate ? isDueSoon(task.dueDate) : false

  return (
    <div
      className={cn(
        'bg-white rounded-lg border shadow-sm p-4 cursor-pointer transition-all duration-200 hover:shadow-md',
        isDragging && 'opacity-50 rotate-1 scale-105',
        task.completed && 'opacity-75 bg-gray-50',
        task.blocked && 'border-l-4 border-l-warning-500'
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'text-sm font-medium text-gray-900 truncate',
            task.completed && 'line-through text-gray-500'
          )}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleComplete?.()
            }}
            className={cn(
              'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200',
              task.completed 
                ? 'bg-success-500 border-success-500 text-white' 
                : 'border-gray-300 hover:border-success-500'
            )}
          >
            {task.completed && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.tags.map((tag) => (
            <Badge
              key={tag.id}
              size="sm"
              style={{ 
                backgroundColor: tag.color + '20', 
                color: tag.color,
                borderColor: tag.color + '40'
              }}
              className="border"
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          {/* Priority indicator */}
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
            title={`Priority: ${task.priority}`}
          />
          
          {/* Blocked indicator */}
          {task.blocked && (
            <span className="text-warning-600" title="Task is blocked">
              🚫
            </span>
          )}
        </div>

        {/* Due date */}
        {task.dueDate && (
          <span className={cn(
            'text-xs',
            isTaskOverdue && 'text-danger-600 font-medium',
            isTaskDueSoon && !isTaskOverdue && 'text-warning-600 font-medium',
            !isTaskOverdue && !isTaskDueSoon && 'text-gray-500'
          )}>
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>

    </div>
  )
}