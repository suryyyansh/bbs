'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import { CreateTicket } from '@actions/createticket';

export default function TicketForm({setVisibleOTP}) {
  const [loading] = useState(false);
  const [ticketAmount, setTicketAmount] = useState(0);
  const {data: session} = useSession();

  return (
    <div>
    <h1 className="logo_text text-center">BOOK USING WALLET</h1>
    <form 
    className="flex flex-col gap-2"
    action={(data) => CreateTicket(data, setVisibleOTP, session.user.email)}>
      <textarea
        name="amount"
        value={ticketAmount}
        onChange={(e) => setTicketAmount(e.currentTarget.value)}
        placeholder="Enter amount to generate ticket for"
        required
        className="form_input"
        rows="1"
        resize="none"
      />
      <button
        className="black_btn"
        type="submit"
        disabled={loading}
      >
        <p>Generate Ticket</p>
      </button>
    </form>
  </div>
  )
}