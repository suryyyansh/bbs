"use server";

import { connectToDB } from "@utils/database";
import User from "@models/user"


export async function POST(request) {
  const newUser = await request.json()
  console.log(newUser);
  if(!(await User.findOne({email: newUser.email}))){
    await User.create({
        email: newUser.email,
        role: newUser.role
    })
  } else {
    await User.findOneAndUpdate({email: newUser.email},
      {
        role: newUser.role,
        allowed_ride: newUser.allowed_ride
      })
  }
  if(!newUser) return new Response("USER EDITED")
  return new Response("USER ADDED");
 }   
