import { useState, useEffect } from 'react'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'

interface Task {
  id: number
  title: string
  completed: boolean
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')
    return savedTasks ? JSON.parse(savedTasks) : []
  })
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium')
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority'>('dueDate')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTaskTitle.trim() === '') return
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      dueDate: newTaskDueDate,
      priority: newTaskPriority,
    }
    setTasks([...tasks, newTask])
    setNewTaskTitle('')
    setNewTaskDueDate('')
    setNewTaskPriority('medium')
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const startEditing = (id: number) => {
    setEditingTaskId(id)
  }

  const saveEdit = (id: number, newTitle: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title: newTitle } : task
    ))
    setEditingTaskId(null)
  }

  const cancelEdit = () => {
    setEditingTaskId(null)
  }

  const updateTaskPriority = (id: number, newPriority: Task['priority']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority: newPriority } : task
    ))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return (a.dueDate || '').localeCompare(b.dueDate || '')
    } else {
      const priorityOrder = { high: 0, medium: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
  })

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Task Manager</h1>
      <div className="flex flex-col mb-6 space-y-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter a new task"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <input
            type="date"
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center w-full sm:w-auto"
          >
            <Plus size={20} className="mr-2" /> Add Task
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="flex justify-center sm:justify-start space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Completed
          </button>
        </div>
        <div className="flex justify-center sm:justify-end space-x-2">
          <button
            onClick={() => setSortBy('dueDate')}
            className={`px-3 py-1 rounded ${sortBy === 'dueDate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Sort by Date
          </button>
          <button
            onClick={() => setSortBy('priority')}
            className={`px-3 py-1 rounded ${sortBy === 'priority' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Sort by Priority
          </button>
        </div>
      </div>
      <ul className="space-y-2">
        {sortedTasks.map(task => (
          <li key={task.id} className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mr-4"
              />
              {editingTaskId === task.id ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => saveEdit(task.id, e.target.value)}
                  className="flex-grow mr-2 px-2 py-1 border rounded"
                  autoFocus
                />
              ) : (
                <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between w-full sm:w-auto">
              <span className="mr-4 text-sm text-gray-500">{task.dueDate}</span>
              <select
                value={task.priority}
                onChange={(e) => updateTaskPriority(task.id, e.target.value as Task['priority'])}
                className="mr-4 text-sm border rounded px-2 py-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                {editingTaskId === task.id ? (
                  <>
                    <button onClick={() => saveEdit(task.id, task.title)} className="text-green-500 hover:text-green-700">
                      <Save size={20} />
                    </button>
                    <button onClick={cancelEdit} className="text-red-500 hover:text-red-700">
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <button onClick={() => startEditing(task.id)} className="text-blue-500 hover:text-blue-700">
                    <Edit2 size={20} />
                  </button>
                )}
                <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}