"use client";

import { signIn } from 'next-auth/react'
import React from 'react'


const Login = () => {
  return (
    <div className="flex flex-col my-auto justify-center items-center gap-5">
        <div className="head_text orange_gradient p-4">
            Please Login:
        </div>
        <button
            type="button"
            className="login_btn"
            onClick={() => {
                signIn('google', )
            }}
        >
            User/Admin login
        </button>
        <button
            type="button"
            className="login_btn"
            onClick={() => {
                signIn('google')
            }}
        >
            Conductor Login
        </button>

    </div>
  )
}
export default Login;