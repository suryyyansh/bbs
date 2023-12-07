'use client';
import { redirect } from 'next/navigation';
import React from 'react';
import { isUserLoggedIn, isUserRole } from '@lib/libcheckuser';
import { useSession } from 'next-auth/react';

const Home = () => {
  if(isUserRole({session: useSession().data, role: "Conductor"}))
    redirect('/conductor', 'replace');
  else if(isUserLoggedIn({session: useSession().data}))
    redirect('/user', 'replace');
  else 
    redirect('/login', 'replace');
}

export default Home;