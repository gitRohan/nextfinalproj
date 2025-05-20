import { db } from "@/lib/db";
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator";
import { startOfDay, startOfMonth, startOfWeek } from "date-fns";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const EVENT_VALIDATOR=z.object({
    name:CATEGORY_NAME_VALIDATOR,
    page:z.number(),
    limit:z.number().max(50),
    timeRange:z.enum(["today","week","month"]),
})
export async function POST(request:NextRequest){
    try {
        const auth=(await headers()).get('authorization')
        const apiKey=auth?.split(' ')[1]
        console.log(apiKey)
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
    const result=EVENT_VALIDATOR.safeParse(body)
    const now=new Date()
    let startDate:Date;

    switch(result.data?.timeRange){
        case 'today':
            startDate=startOfDay(now)
            break
        case 'week':
            startDate=startOfWeek(now,{weekStartsOn:0})
            break
        case 'month':
            startDate=startOfMonth(now)
            break
        default:
            startDate = startOfWeek(now);
    }
    let name=result.data?.name;
    let limit = result.data?.limit ?? 30;
    
    const [events,eventsCount,uniqueFieldCount] = await Promise.all([
    db.event.findMany({
        where:{
            EventCategory:{name,userId:User.id},
            createdAt:{gte:startDate}
        },
        skip:((result.data?.page ?? 1) - 1)*limit,
        take:limit,
        orderBy:{createdAt:"desc"}
    }),
    db.event.count({
        where:{
            EventCategory:{name,userId:User.id},
            createdAt:{gte:startDate}
        }
    }),
    db.event.findMany({
        where:{
            EventCategory:{name,userId:User.id},
            createdAt:{gte:startDate}
        },
        select:{
            fields:true
        },
        distinct:["fields"]
    }).then((events)=>{
        const fieldNames=new Set<string>()
        events.forEach((event)=>{
            Object.keys(event.fields as object).forEach((fieldName)=>{
                fieldNames.add(fieldName)
            })
        })
        return fieldNames.size
    })
    ])
    
    return NextResponse.json({
        events,
        eventsCount,
        uniqueFieldCount
    })
    } catch (error) {
        console.log(error)

        if(error instanceof z.ZodError){
            return NextResponse.json({message:error.message},{status:422})
        }

        return NextResponse.json(
            {message:"Internal server error"},
            {status:500}
        )
    }
    
}