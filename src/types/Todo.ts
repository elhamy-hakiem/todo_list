// Represents a single task in a to-do list
export interface Task {
  id: string // Unique identifier for the task
  text: string // Task description
  completed: boolean // Whether the task is done or not
  todoId: string // ID of the todo list this task belongs to
}

// Represents a full to-do list with a title and tasks
export interface Todo {
  id: string // Unique identifier for the to-do list
  title: string // The title of the to-do list
  tasks: Task[] // Array of tasks within the list
  imageUrl?: string // (Optional) URL for an image/icon representing the to-do list
}

// Represents a ToDo card for the UI, showing title, progress, and whether it’s for adding a new list
export interface TodoCard {
  title?: string // Title for the todo card (optional)
  progress?: number // Progress percentage (between 0 and 1)
  isAddNew?: boolean // If true, it will render an "Add New" card for creating a new list
  image?: string // Optional image or icon for the card
  onAdd?: (title: string) => void // Function to handle adding a new todo list
}

export default Todo
