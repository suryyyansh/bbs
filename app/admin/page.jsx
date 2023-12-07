"use client";

import { React, useState, useEffect } from "react";
import NewAdminForm from "@components/NewAdminForm";
import UserList from "@components/UserList";
import EditUserForm from "@components/EditUserForm";
import PaymentList from "@components/PaymentList";
import { useSession } from "next-auth/react";

const AdminPage = () => {

    const {data: session} = useSession();

    const [users, setUsers] = useState([])
    const [userAllowed, setUserAllowed] = useState(true);
    const [userRole, setUserRole] = useState("");
    const [user, setUser] = useState({})
    const [newUser, setNewUser] = useState({})
    const [newUserAdded, setNewUserAdded] = useState(false);
    const [payments, setPayments] = useState([])

    useEffect(()=> {
        fetch('/api/user/getallusers', {
            method: 'POST',
            body: JSON.stringify({
                role: 'admin'
            })
        }).then(response => response.json().then(
          json => setUsers(json)))
        
        fetch('/api/user/getpayments', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email
        })
      }).then(response => response.json().then(
        json => {setPayments(json)}))
    
        setNewUserAdded(false);
    }, [user, newUserAdded]);
    const onUserClick = async ({email}) => {
        fetch('/api/user/get',{
            method: 'POST',
            body: JSON.stringify({
            email: email
        })}).then(response => {
            response.json().then(json => {setUser(JSON.parse(json.props.user));});
        })
    }

    const commit = async () => {
        console.log("email: ", user.email);
        console.log("role: ", userRole);
        console.log("allowed_ride: ", userAllowed)
        fetch('api/user/new', {
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                role: userRole,
                allowed_ride: userAllowed
            })}).then(setNewUserAdded(true))
        }
    

    if(session == null || session?.user.role !== "admin"){
        return (<div>401 UNAUTHORIZED</div>)
    }
    return (
        <div className = "grid grid-cols-3 gap-8">
            <div className="flex-col space-y-8 ">
            <NewAdminForm
            newUser={newUser}
            setNewUser={setNewUser}
            setNewUserAdded={setNewUserAdded}
            />
            <EditUserForm
                userAllowed={userAllowed}
                setUserAllowed={setUserAllowed}
                setUserRole={setUserRole}
                user={user}
                commit={commit}
            />
            </div>
            
            <UserList
            users={users}
            onUserClick={onUserClick}/>
            <PaymentList
            payments={payments}
            />
            
        </div>
        
    )
}

export default AdminPage