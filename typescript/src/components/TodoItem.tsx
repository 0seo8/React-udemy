import React from 'react'
import Todo from '../models/todo'

const TodoItem: React.FC<{item: string}> = ({item}) => {
  return (
    <li >{item}</li>
  )
}

export default TodoItem