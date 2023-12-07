import { React } from 'react'
const UserList = ({users, onUserClick}) => {

  return (
    <div className="prompt_card">
      <div className="text-center logo_text">USER LIST</div>
      {users.map(user => (
        <div
         key={user.email}
         className="userlist flex-col"
         onClick={() => onUserClick({email: user.email})}
         >
      <div>email: {user.email}</div>
      <div>role: {user.role}</div>
      <div>allowed to ride: {user.allowed_ride ? "True" : "False"}</div>
      </div>
      ))}
    </div>
  )
}

export default UserList