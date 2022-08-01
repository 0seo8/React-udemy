import React, { useState } from 'react'
import Card from '../UI/Card'
import Button from '../UI/Button'
import ErrorModal from '../UI/ErrorModal'
import style from './AddUser.module.css'

function AddUser(props) {
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredAge, setEnteredAge] = useState('')

  const addUserHandler = (e) => {
    e.preventDefault()
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0)
      return
    if (+enteredAge < 1) return
    props.onAddUser(enteredUsername, enteredAge)

    setEnteredUsername('')
    setEnteredAge('')
  }

  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value)
  }

  const ageChangeHandler = (e) => {
    setEnteredAge(e.target.value)
  }

  return (
    <>
      <ErrorModal title="An error occured!" message="Someting went wrong!" />
      <Card className={style.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={enteredAge}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  )
}

export default AddUser
