import { useState, useRef, useEffect } from 'react'
import { cn } from '../../utils'

interface EditableColumnTitleProps {
  title: string
  onSave: (newTitle: string) => void
  className?: string
}

export function EditableColumnTitle({ title, onSave, className }: EditableColumnTitleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  useEffect(() => {
    setEditValue(title)
  }, [title])

  const handleStartEdit = () => {
    setIsEditing(true)
    setEditValue(title)
  }

  const handleSave = () => {
    const trimmedValue = editValue.trim()
    if (trimmedValue && trimmedValue !== title) {
      onSave(trimmedValue)
    } else if (!trimmedValue) {
      // Don't allow empty titles, revert to original
      setEditValue(title)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  const handleBlur = () => {
    handleSave()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={cn(
          'font-semibold text-gray-900 bg-white border border-primary-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-w-0 max-w-full',
          className
        )}
        placeholder="Column name..."
        maxLength={50}
      />
    )
  }

  return (
    <button
      onClick={handleStartEdit}
      className={cn(
        'font-semibold text-gray-900 hover:text-primary-700 transition-colors duration-200 rounded px-1 py-1 hover:bg-gray-100 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-gray-100',
        className
      )}
      title="Click to edit column name"
      aria-label={`Edit column name: ${title}`}
    >
      {title}
    </button>
  )
}