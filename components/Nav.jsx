"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession} from 'next-auth/react'
import { isUserRole } from '@lib/libcheckuser';

const Nav = () => {
  const {data: session} = useSession();
  var isUserLoggedIn = () => {
    return session?.user ? true : false;
  }
  const isUserAdmin = () => {
    return session?.user.role === "admin" ? true : false;
  }
  const isUserConductor = () => {
    return session?.user.role === "conductor" ? true : false;
  }
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/Logo-LNMIIT.svg'
          alt='Promptopia Logo'
          width={100}
          height={100}
          className='object-contain'
        ></Image>
        <p className='logo_text'>Bus Booking System</p>
      </Link>

      <div>
        {isUserLoggedIn() ? (
          <div className='flex gap-2 flex-center'>
          <div className="flex-between ">
            {isUserAdmin() ? (
                <Link className="nav_item" href="/admin">ADMIN DASHBOARD</Link>
              ) : (<></>)}
            {isUserConductor() ? (
                <Link className="nav_item" href="/conductor">CONDUCTOR</Link>
            ) : (<></>)}
            {isUserRole({session: session, role: "admin"}) || isUserRole({session: session, role: "admin"}) ? (
            <Link className="nav_item" href="/user/addfunds">ADD FUNDS</Link>
            ) : (<></>)}
            </div>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/user"><p className="text-lg">{session?.user.email.split('@')[0]} | {session?.user.role}</p></Link>
          
          </div>
        ):(
          <></>
        )}
      </div>

      {/* Mobile Nav */}
    </nav>
  )
}

export default Nav