import React, { useState } from 'react'
import AddUser from './components/Users/AddUser'
import UserList from './components/Users/UserList'

function App() {
  const [userList, setUserList] = useState([])
  const addUserHandler = (uName, uAge) => {
    setUserList((prevUeerList) => {
      return [...prevUeerList, { name: uName, age: uAge }]
    })
  }
  console.log('userList', userList)

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UserList users={userList} />
    </div>
  )
}

export default App
