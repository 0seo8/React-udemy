import React from 'react'
import Card from '../UI/Card'
import style from './AddUser.module.css'

function UserList(props) {
  return (
    <Card className={style.users}>
      <ul>
        {props.users.map((user) => (
          <li>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default UserList
