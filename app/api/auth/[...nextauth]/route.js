import nextAuth from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

import User_promptopia from "@models/user";
import { connectToDB } from "@utils/database";

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    async session({session}){
            const sessionUser=await User_promptopia.findOne({
                email: session.user.email
            })

            session.user.id=sessionUser._id.toString();

            return session;
    },

    async signIn({profile}){
        try{
            await connectToDB();

            const userExists=await User_promptopia.findOne({
                email: profile.email
            })

            if (!userExists){
                await User_promptopia.create({
                    email: profile.email,
                    username: profile.name.replace(" ",'').toLowerCase(),
                    image: profile.picture,
                })
            }


        }catch(error){

        }
    }
})

export {handler as GET, handler as POST}