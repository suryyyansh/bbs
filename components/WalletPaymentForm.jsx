'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react';

export default function CheckoutForm() {
  const [loading] = useState(false);
  const [input, setInput] = useState(25);

  const handleInputChange = (e) => setInput(e.currentTarget.value)
  const {data: session} = useSession();

  return (
    <form 
    className="flex flex-col items-center gap-2"
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
  )
}