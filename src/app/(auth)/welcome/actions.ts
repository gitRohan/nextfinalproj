'use server'
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function authuser(){
    const auth=await currentUser();
    if(!auth){
        return false
    }
    const user=await db.user.findFirst({
        where:{externalId:auth.id}
    })
    console.log(user);
    
    if(!user){
        await db.user.create({
            data:{
                quotaLimit:100,
                externalId:auth.id,
                email:auth.emailAddresses[0].emailAddress
            }
        })

    }
    return true;
}
