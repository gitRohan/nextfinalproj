import { db } from "@/lib/db"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

export const GET=async()=>{
    const auth=(await headers()).get('authorization')
    const apiKey=auth?.split(' ')[1]
    const User=await db.user.findUnique({
        where:{apiKey},
    })
    
    return NextResponse.json({plan:User?.plan})
}