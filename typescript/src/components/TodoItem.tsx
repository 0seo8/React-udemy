import React from 'react';
import classes from './TodoItem.module.css'

const TodoItem: React.FC<{item: string; onRemoveTodo: () =>void}> = ({item, onRemoveTodo}) => {
  return (
    <li className={classes.item} onClick={onRemoveTodo}>{item}</li>
  )
}

export default TodoItem