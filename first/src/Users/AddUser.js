import React from 'react'

function AddUser() {
  const addUserHandler = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={addUserHandler}>
      <label htmlFor="username">Username</label>
      <input for="username" />
      <label htmlFor="age">Age (Years)</label>
      <input for="age" type="number" />
      <button type="submit">Add User</button>
    </form>
  )
}

export default AddUser
