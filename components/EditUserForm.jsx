import React from 'react'

const EditUserForm = ({userAllowed, setUserAllowed, commit, setUserRole, user}) => {
  return (
    <div className="prompt_card flex flex-col space-y-2">
        <div className="logo_text text-center">EDIT USER</div>
        <label>{user.email}</label>
        <label>
            <textarea
                className="form_input"
                placeholder="Set user's role..."
                rows="1"
                onChange={(e) => {setUserRole(e.target.value)}}
            />
        </label>
        <label>
            <input
            type="checkbox"
            checked={userAllowed}
            onChange={() => setUserAllowed(!userAllowed)}
        /> Is User Allowed to ride the bus?
        </label>
        
        <button 
        className="black_btn"
        onClick={commit}
        disabled={user.email ? false: true}
        >Commit</button>
    </div>
  )
}

export default EditUserForm