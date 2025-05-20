'use server'
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const tokenid=async()=>{
    const auth=await currentUser()
    const user= await db.user.findFirst({
        where:{externalId:auth?.id}
    })
    console.log(user)
    const token =user?.apiKey;
    if(!token){
        return console.log("actions error")
    }
    return token

}
export const userauth=async()=>{
    const auth=await currentUser()
    const user= await db.user.findFirst({
        where:{externalId:auth?.externalId}
    })
    const userId=user?.id;
    return userId;
}