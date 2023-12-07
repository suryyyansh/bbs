"use client";

import {useState, React, useEffect} from 'react'
import CheckoutForm from '@components/CheckoutForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import PaymentList from '@components/PaymentList';


const UserMain = () => {

  const {data: session, status: status} = useSession();

  const [currFunds, setCurrFunds] = useState(0);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    fetch('/api/user/getpayments', {
            method: 'POST',
            body: JSON.stringify({
                email: session.user.email
        })
      }).then(response => response.json().then(
        json => {console.log(payments);setPayments(json)}))
  }, [])

  fetch('/api/user/get',{
    method: 'POST',
    body: JSON.stringify({
      email: session?.user?.email
    }),
  }).then(response => {
      response.json().then(json => {setCurrFunds(JSON.parse(json.props.user).funds);});
  })    
  if(session == null || session?.user?.role === "conductor"){
    return(<div>401 UNAUTHORIZED</div>)
  }
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col prompt_card gap-2">
      <CheckoutForm />
      <h1 className="balance">Current Funds: {currFunds}₹</h1>
    
    </div>
    <PaymentList
    payments={payments}/>
    </div>
  )
}


export default UserMain;