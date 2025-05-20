import { DashboardPage } from "@/components/dashboard-page";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { CategoryPageContent } from "./category-page-content";

interface pageProps{}
const Page=async({params}:{
    params: Promise<{ name: string }>
  })=>{
    const {name}=await params
    if(typeof name!=='string') return notFound()
    
    const auth=await currentUser()

    if(!auth){
        return notFound()
    }

    const user=await db.user.findUnique({
        where:{externalId:auth.id},
    })

    if(!user) return notFound()

    const category=await db.eventCategory.findUnique({
        where:{
            name_userId:{
                name:name,
                userId:user.id,
            }
        },
        include:{
            _count:{
                select:{
                    Events:true
                }
            }
        }
    })

    if(!category) return notFound()

    const hasEvents=category._count.Events>0

    return(
        <DashboardPage title={`${category.emoji} ${category.name}`}>
            <CategoryPageContent hasEvents={hasEvents} category={category}/>
        </DashboardPage>
    )
}
export default Page;