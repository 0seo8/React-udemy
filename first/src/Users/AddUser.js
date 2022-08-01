import React, { useState } from 'react'
import Card from '../UI/Card'
import Button from '../UI/Button'
import style from './AddUser.module.css'

function AddUser() {
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredAge, setEnteredAge] = useState('')

  const addUserHandler = (e) => {
    e.preventDefault()
  }

  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value)
    console.log(enteredUsername)
  }

  const ageChangeHandler = (e) => {
    setEnteredAge(e.target.value)
    console.log(enteredAge)
  }

  return (
    <Card className={style.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" onChange={usernameChangeHandler} />
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" onChange={ageChangeHandler} />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  )
}

export default AddUser
