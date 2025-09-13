import React, { useState, useEffect } from 'react'
import { Task, TaskFormData, Tag, TAG_COLORS, Priority } from '../../types'
import { Button, Input, Textarea, Select, Badge, Modal } from '../UI'
import { generateId } from '../../utils'

interface TaskFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: TaskFormData) => void
  task?: Task | null
  title?: string
}

export function TaskForm({ isOpen, onClose, onSubmit, task, title }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    dueDate: '',
    blocked: false,
    tags: [],
  })

  const [newTagName, setNewTagName] = useState('')
  const [selectedTagColor, setSelectedTagColor] = useState<string>(TAG_COLORS[0])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        dueDate: task.dueDate || '',
        blocked: task.blocked,
        tags: task.tags,
      })
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        blocked: false,
        tags: [],
      })
    }
    setErrors({})
  }, [task, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (formData.tags.length > 5) {
      newErrors.tags = 'Maximum 5 tags allowed'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData)
      onClose()
    }
  }

  const handleAddTag = () => {
    if (!newTagName.trim()) return
    
    const newTag: Tag = {
      id: generateId(),
      name: newTagName.trim(),
      color: selectedTagColor,
    }

    if (formData.tags.length < 5 && !formData.tags.find(tag => tag.name === newTag.name)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setNewTagName('')
    }
  }

  const handleRemoveTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.id !== tagId),
    }))
  }

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || (task ? 'Edit Task' : 'Create Task')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          error={errors.title}
          placeholder="Enter task title..."
          autoFocus
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter task description..."
          rows={3}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
            options={priorityOptions}
          />

          <Input
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="blocked"
            checked={formData.blocked}
            onChange={(e) => setFormData(prev => ({ ...prev, blocked: e.target.checked }))}
            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="blocked" className="ml-2 text-sm text-gray-700">
            Task is blocked
          </label>
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags ({formData.tags.length}/5)
          </label>
          
          {/* Existing tags */}
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <div key={tag.id} className="flex items-center">
                  <Badge
                    style={{ 
                      backgroundColor: tag.color + '20', 
                      color: tag.color,
                      borderColor: tag.color + '40'
                    }}
                    className="border pr-1"
                  >
                    <span>{tag.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag.id)}
                      className="ml-1 text-xs hover:bg-black hover:bg-opacity-10 rounded p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Add new tag */}
          {formData.tags.length < 5 && (
            <div className="flex gap-2">
              <Input
                placeholder="Tag name..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1"
              />
              <select
                value={selectedTagColor}
                onChange={(e) => setSelectedTagColor(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              >
                {TAG_COLORS.map((color) => (
                  <option key={color} value={color} style={{ backgroundColor: color + '40' }}>
                    {color}
                  </option>
                ))}
              </select>
              <Button type="button" onClick={handleAddTag} size="sm">
                Add
              </Button>
            </div>
          )}
          
          {errors.tags && (
            <p className="mt-1 text-sm text-danger-600">{errors.tags}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}