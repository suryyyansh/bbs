'use client'

import React, { useState } from 'react'
import { createCheckoutSession } from '@/actions/stripe'
import { useSession } from 'next-auth/react';

export default function CheckoutForm() {
  const [loading] = useState(false);
  const [input, setInput] = useState(25);

  const handleInputChange = (e) => setInput(e.currentTarget.value)
  const {data: session} = useSession();

  return (
    <div>
    <div className="logo_text text-center">ADD FUNDS TO WALLET</div>
    <form 
    className="flex flex-col gap-2"
    action={(data) => createCheckoutSession(data, session.user.email)}>
      <textarea
        name="paymentAmount"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter amount to pay"
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
        <p>Buy Ticket</p>
      </button>
    </form>
  </div>
  )
}