'use client'
import React, { useState } from 'react'
import { ValidateTicket } from '@actions/validateticket';

export default function ConductorForm() {
  const [loading] = useState(false);
  const [passengerOTP, setPassengerOTP] = useState("");
  const [validity, setValidity] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <form 
    className="flex flex-col items-center gap-2 prompt_card"
    action={(data) => ValidateTicket(data, setValidity, setAmount)}>
      <label className="logo_text">ENTER OTP</label>
      <textarea
        name="otp"
        value={passengerOTP}
        onChange={(e) => setPassengerOTP(e.currentTarget.value)}
        placeholder="Enter the passenger's OTP"
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
        <p>ValidateOTP</p>
      </button>
      <label className = "text-lg">{validity === "" ? (<></>): (<>STATUS: {validity}</>)}</label>
      <label className = "text-lg">{amount == 0 ? (<></>): (<>AMOUNT: {amount}</>)}</label>
    </form>
  )
}