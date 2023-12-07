
import {React, useEffect, useState} from 'react'

const NewAdminForm = ({newUser, setNewUser, setNewUserAdded}) => {
 
    const handleAdd = async () => {
         
        try {
            const response = await fetch('/api/user/new', {
                method: 'POST',
                body: JSON.stringify({
                    email: newUser.email,
                    role: newUser.role,
                })
            })

            if(response.ok){
                console.log("user added: \n\temail:", newUser.email, "\n\trole:", newUser.role);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setNewUserAdded(true);
        }
    }


  return (
    <div className="flex flex-col space-y-2 prompt_card">
        <div className="logo_text text-center">ADD USER</div>
        <textarea
            onChange={(email) => {setNewUser({...newUser, email: email.target.value})}}
            placeholder="email..."
            //required
            className="form_input"
            rows="1"
            resize="none"
        />
        <textarea
            onChange={(role) => {setNewUser({...newUser, role: role.target.value})}}
            placeholder="role..."
            //required
            className="form_input"
            rows="1"
            resize="none"
        />
        <button
            className="black_btn"
            onClick={() => {handleAdd();}}
        >
            Add
        </button>
    </div>
  )
}

export default NewAdminForm;