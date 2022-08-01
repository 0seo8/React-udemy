import AddUser from './Users/AddUser'
import UserList from './Users/UserList'

function App() {
  return (
    <div>
      <AddUser />
      <UserList users={[]} />
    </div>
  )
}

export default App
