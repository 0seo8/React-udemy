import React from 'react'
import Todo from '../models/todo'
import TodoItem from './TodoItem'
import classes from './Todos.module.css'

const Todos: React.FC<{items: Todo[]; onRemoveTodo: (id: string) => void}> = ({items, onRemoveTodo}) => {
  return (
    <ul className={classes.todos}>
     {items.map(item => <TodoItem key={item.id} item={item.text} onRemoveTodo={onRemoveTodo.bind(null, item.id)}/> )}
    </ul>
  )
}

export default Todos