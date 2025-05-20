import { DashboardPage } from "@/components/dashboard-page"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AccountSetting } from "./settings-page-content"

const Page=async()=>{
    const auth = await currentUser()

    if(!auth){
        redirect("/sign-in")
    }

    const user = await db.user.findUnique({
        where:{externalId:auth.id},
    })

    if(!user){
        redirect("/sign-in")
    }
    const plan=user.plan
    return(
        <DashboardPage title="Account settings">
            <AccountSetting discordId={user.discordId??""}/>
        </DashboardPage>
    )
}

export default Page