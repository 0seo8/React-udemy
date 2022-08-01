import React from 'react'
import Card from '../UI/Card'
import Button from '../UI/Button'
import style from './AddUser.module.css'

function AddUser() {
  const addUserHandler = (e) => {
    e.preventDefault()
  }

  return (
    <Card className={style.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input for="username" />
        <label htmlFor="age">Age (Years)</label>
        <input for="age" type="number" />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  )
}

export default AddUser
