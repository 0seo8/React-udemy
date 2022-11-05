import React, { useState } from 'react'
import Todos from '../components/Todos';
import Todo from '../models/todo'

type TodosContectObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
}

export const TodosContext = React.createContext<TodosContectObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {}
})

 const TodosContextProvider:React.FC<{
  children: React.ReactNode;
}> = (props) => {
  const [todos, setTodos] =useState<Todo[]>([])

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText)
    setTodos((prevTodos) => {  
      return prevTodos.concat(newTodo)
    })
  }

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  }

  const contextValue:TodosContectObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  }

  return <TodosContext.Provider value={contextValue}>
    {props.children}
  </TodosContext.Provider>
}

export default TodosContextProvider