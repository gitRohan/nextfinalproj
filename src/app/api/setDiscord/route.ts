import { db } from "@/lib/db"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
const DISCORDID_VALIDATOR=z.object({
    discordId:z.string().max(20)
})
export const POST=async(request:NextRequest)=>{
    const auth=(await headers()).get('authorization')
    const apiKey=auth?.split(' ')[1]
    const User=await db.user.findUnique({
        where:{apiKey},
    })
    if(!User){
        return Response.json({
            status:401,
            body:'Unauthorized'
        })
    }
    const body=await request.json();
    const result=DISCORDID_VALIDATOR.safeParse(body)
    const discordId=result.data?.discordId
    await db.user.update({
        where:{id:User.id},
        data:{discordId}
    })

    return NextResponse.json({success:true})
}