import classes from './TodoItem.module.css'

const TodoItem: React.FC<{item: string}> = ({item}) => {
  return (
    <li className={classes.item}>{item}</li>
  )
}

export default TodoItem