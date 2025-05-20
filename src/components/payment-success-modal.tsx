"use client"

import { tokenid } from "@/app/actions"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Modal } from "./modal"
import LoadingSpinner from "./loading-spinner"
import { Button } from "./ui/button"
import { CheckIcon } from "lucide-react"

export const PaymentSuccessModal=()=>{
    const router = useRouter()
    const [isOpen,setIsOpen] = useState(false)
    const [isPending,setIspending]=useState(false)
    const [planData,setPlanData]=useState<{plan:'FREE'|"PRO"}>()
    useEffect(()=>{
        const resdata=async()=>{
            setIspending(true)
            const tk=await tokenid()
            const res=await fetch('http://localhost:3000/api/user-plan'
            ,{headers:{'Authorization':'Bearer '+tk}});
            const data = await res.json();
            setPlanData(data)
            setIspending(false)
        }
        resdata()
    },[])
    const handleClose=()=>{
        setIsOpen(false)
        router.push("/dashboard")
    }
    const isPaymentSuccessful=planData?.plan==="PRO"
    return(
      <Modal showModal={isOpen} setShowModal={setIsOpen} onClose={handleClose} className="px-6 pt-6" preventDefaultClose={!isPaymentSuccessful}>
        <div className="flex flex-col items-center">
          {isPending?(
            <div className="flex flex-col items-center justify-center h-64">
                <LoadingSpinner className="mb-4"/>
                <p className="text-lg/7 font-medium text-gray-900">Upgrading your account...</p>
                <p className="text-gray-600 text-sm/6 mt-2 text-center text-pretty">
                  Please wait while we process your upgrade. This may take a moment.
                </p>
            </div>
          ):(
            <>
              <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
                <img src="/brand-asset-heart.png" className="h-full w-full object-cover" alt="Payment success"/>
              </div>
              <div className="mt-6 flex flex-col items-center gap-1 text-center">
                <p className="text-lg/7 tracking-tight font-medium text-pretty">
                  Upgrade successful!🎉
                </p>
                <p className="text-gray-600 text-sm/6 text-pretty">Thank you for upgrading to PRO and supporting TourAI. Your account has been upgraded.</p>
              </div>
              <div className="mt-8 w-full">
                <Button onClick={handleClose} className="h-12 w-full">
                  <CheckIcon className="mr-2 size-5"/>
                  Go to Dashboard
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    )
}