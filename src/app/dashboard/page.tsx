import { DashboardPage } from "@/components/dashboard-page"
import { db } from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { DashboardPageContent } from "./dashboard-page-content"
import { CreateEventCategoryModal } from "@/components/create-event-category-modal"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { createCheckoutSession } from "@/lib/stripe"
import { PaymentSuccessModal } from "@/components/payment-success-modal"
import { SignIn } from "@clerk/nextjs"
import { authuser } from "../(auth)/welcome/actions"



const Page=async({searchParams}:{searchParams: Promise<{ intent: string ,success:string}>})=>{

    const {intent}=await searchParams
    const auth = await currentUser()

    

    const user = await db.user.findUnique({
        where:{externalId:auth?.id}
    })

    if(!user){
        <SignIn/>
        authuser()
    }

    

    const success =(await searchParams).success
    return(
        <>  
            {success?<PaymentSuccessModal/>:null}
            <DashboardPage cta={<CreateEventCategoryModal>
                <Button>
                    <PlusIcon className="size-4 mr-2"/>
                    Add Trips
                </Button>
            </CreateEventCategoryModal>} title="Dashboard">
            <DashboardPageContent/>
            </DashboardPage>
        </>
    )
}
export default Page
