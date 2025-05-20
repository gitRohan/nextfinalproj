import { FREE_QUOTA, PRO_QUOTA } from "@/config";
import { db } from "@/lib/db";
import { addMonths, startOfMonth } from "date-fns";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const GET=async()=>{
    const auth=(await headers()).get('authorization')
    const apiKey=auth?.split(' ')[1]
    const User=await db.user.findUnique({
        where:{apiKey},
    })
    console.log(apiKey)
    if(!User){
        return Response.json({
            status:401,
            body:'Unauthorized'
        })
    }

    const currentDate=startOfMonth(new Date())

    const quota = await db.quota.findFirst({
        where:{
            userId:User.id,
            year:currentDate.getFullYear(),
            month:currentDate.getMonth()+1,
        }
    })

    const eventsCount=quota?.count??0

    const categoryCount = await db.eventCategory.count({
        where:{userId:User.id}
    })

    const limits = User.plan==="PRO"?PRO_QUOTA:FREE_QUOTA
    const resetDate = addMonths(currentDate,1)

    return NextResponse.json({
        categoriesUsed:categoryCount,
        categoriesLimit:limits.maxEventCategories,
        eventsUsed:eventsCount,
        eventsLimit:limits.maxEventsPerMonth,
        resetDate
    })
}