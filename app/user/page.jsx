"use client";

import {useState, React} from 'react'
import { useSession } from 'next-auth/react';
import TicketForm from '@components/TicketForm';

const UserMain = () => {

  const {data: session, status: status} = useSession();
  
  const [currFunds, setCurrFunds] = useState(0);
  const [visibleOTP, setVisibleOTP] = useState(0);

  fetch('/api/user/get',{
    method: 'POST',
    body: JSON.stringify({
      email: session.user.email
    }),
  }).then(response => {
      response.json().then(json => {setCurrFunds(JSON.parse(json.props.user).funds);});
  })

  if(session == null || session.user.role === "conductor"){
    return(<div>401 UNAUTHORIZED</div>)
  }

  return (
    <div className="flex flex-col prompt_card gap-2">
      <TicketForm 
      setVisibleOTP={setVisibleOTP}/>
      <h1 className="balance">Current Funds: {currFunds}₹</h1>
      <label className = "text-lg">{visibleOTP ? (<>OTP: {visibleOTP}</>): (<></>)}</label>
    </div>
  )
}

export default UserMain;