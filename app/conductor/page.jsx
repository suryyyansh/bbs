'use client';
import ConductorForm from '@components/ConductorForm'
import { useSession } from 'next-auth/react'
import React from 'react'

const Conductor = () => {

  const {data: session} = useSession();
  
  if(session == null || session?.user.role === "user"){
    return (<div>ONLY CONDUCTORS MAY ACCESS THIS PAGE</div>)
  }
  return (
    <div><ConductorForm/></div>
  )
}

export default Conductor