import { db } from "@/lib/db";
import { createCheckoutSession } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET=async(request:NextRequest)=>{
    const auth=(await headers()).get('authorization')
    const apiKey=auth?.split(' ')[1]
    console.log(apiKey)
    const User=await db.user.findUnique({
        where:{apiKey},
    })
    console.log(User)
    if(!User){
        return Response.json({
        status:401,
        body:'Unauthorized'
        })
    }

    const session=await createCheckoutSession({userEmail:User.email,userId:User.id})

    return NextResponse.json({url:session.url})
}