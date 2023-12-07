import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";

import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            })

            session.user = {
                id: sessionUser._id.toString(),
                email: sessionUser.email,
                role: sessionUser.role,
                allowed_ride: sessionUser.allowed_ride,            
            }
            return session;
        },
        async signIn ({profile}) {
            //backup incase _somehow_ someone manages to get past google auth's org restriction
            await connectToDB();
            //check if a user exists, if not create and save to db
            const userExists = await User.findOne({
                email: profile.email
            })

            //right now, just create the users as specified.
            if(!userExists){
                await User.create({
                    email: profile.email,
                })
            }

            return true;
        },
   },    
})

export {handler as GET, handler as POST};