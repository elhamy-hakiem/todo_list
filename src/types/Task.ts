// Represents a single task in a to-do list
export interface Task {
  id: string // Unique identifier for the task
  text: string // Task description
  completed: boolean // Whether the task is done or not
  todoId: string // ID of the todo list this task belongs to
}

// Creates a new task object with the provided text, initially not completed
export const createNewTask = (taskText: string, todoId: string): Task => {
  return {
    id: new Date().toISOString(), // Use ISO string format as a unique ID
    text: taskText, // Set the text of the task
    completed: false, // By default, a task is not completed
    todoId: todoId, // Link the task to the specific todo list
  }
}

// Toggles the completion status of a task (from completed to not completed or vice versa)
export const toggleTaskCompletion = (task: Task): Task => {
  return {
    ...task, // Keep the original task's properties
    completed: !task.completed, // Toggle the completion status
  }
}

// Edits the text of a given task, preserving the other properties
export const editTask = (task: Task, newText: string): Task => {
  return {
    ...task, // Keep the original task's properties
    text: newText, // Set the new text for the task
  }
}

// Deletes a task (in this case, just returning the task as it is because deletion is handled elsewhere)
export const deleteTask = (task: Task): Task => {
  return task // No actual deletion here, but logic for deletion can be added in the future
}
