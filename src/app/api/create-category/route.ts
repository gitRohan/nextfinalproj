
import { db } from "@/lib/db";
import { parseColor } from "@/lib/utils";
import { cookies, headers } from "next/headers";
import { z } from 'zod'
const EVENT_CATEGORY_VALIDATOR=z.object({
    name:z.string().min(1,'Category name is required.').regex(/^[a-zA-Z0-9-]+$/,'Category name can only contain letters, numbers or hypens.'),
    color:z.string().min(1,'Color is required').regex(/^#[0-9A-F]{6}$/i,'Invalid color format.'),
    emoji:z.string().emoji('Invalid emoji').optional(),
})
export async function POST(request: Request) {

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
    const body=await request.json();
    const result=EVENT_CATEGORY_VALIDATOR.safeParse(body)
    if(!result.success){
      return Response.json({
      status:400,
      body:result.error.errors
     })}
    try{await db.eventCategory.create({
        data:{
            name:result.data.name.toLowerCase(),
            color:parseColor(result.data.color),
            emoji:result.data.emoji,
            userId:User?.id,
        }
    });
    }catch(e){
        return Response.json({
            status:500,
            body:e
        })
    }
    

    return Response.json({success:true})
  }