'use client'
import { Headings } from "@/components/headings"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { Hotel, House, User, Users } from "lucide-react"
import { useContext, useState } from "react"
import { AiContext } from "./AiTripContent"
import { cn } from "@/lib/utils"

export const TripType=({onNext,onPrevious}:{onNext:any,onPrevious:any})=>{
    let {trip,setTrip,pet,setPet}=useContext(AiContext)

    return(
        <MaxWidthWrapper className="mx-auto bg-brand-25">
        <div className="flex flex-col items-center justify-center gap-4 mb-10">
            <Headings>What kind of trip are you planning?</Headings>
            <h3>Select one</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 ">
            <div className={cn("relative overflow-hidden rounded-md flex flex-col items-start bg-brand-50 hover:bg-brand-500 h-[100px] p-5 gap-3",trip=="solo"?"bg-brand-500 ring-2 scale-105":null)} onClick={()=>{setTrip("solo")}}>
                <User className="size-8"/>
                <h3>Solo Trip</h3>
            </div>
            <div className={cn("relative overflow-hidden rounded-md flex flex-col items-start bg-brand-50 hover:bg-brand-500 h-[100px] p-5 gap-3",trip=="friends"?"bg-brand-500 ring-2 scale-105":null)} onClick={()=>{setTrip("friends")}}>
                <Users className="size-8"/>
                <h3>Friends Trip</h3>
            </div>
            <div className={cn("relative overflow-hidden rounded-md flex flex-col items-start bg-brand-50 hover:bg-brand-500 h-[100px] p-5 gap-3",trip=="family"?"bg-brand-500 ring-2 scale-105":null)}onClick={()=>{setTrip("family")}}>
                <House className="size-8"/>
                <h3>Family Trip</h3>
            </div>
            <div className={cn("relative overflow-hidden rounded-md flex flex-col items-start bg-brand-50 hover:bg-brand-500 h-[100px] p-5 gap-3",trip=="corporate"?"bg-brand-500 ring-2 scale-105":null)} onClick={()=>{setTrip("corporate")}}>
                <Hotel className="size-8"/>
                <h3>Corporate Trip</h3>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-12 gap-2">
            <h3>Are you travelling with pets?</h3>
            <div className="flex space-x-16">
                <div className={cn("text-lg font-semibold hover:bg-brand-500 relative overflow-hidden rounded-md cursor-pointer w-28 bg-brand-100 mx-auto text-center",pet==true?"bg-brand-500 ring-2 scale-105":null)} onClick={()=>{setPet(true)}}>
                    Yes
                </div>
                <div className={cn("text-lg font-semibold hover:bg-brand-500 relative overflow-hidden rounded-md cursor-pointer w-28 bg-brand-100 mx-auto text-center",pet==false?"bg-brand-500 ring-2 scale-105":null)} onClick={()=>{setPet(false)}}>
                    No
                </div>
            </div>
        </div>
        <div className="flex justify-between items-center mt-12">
          <Button onClick={onPrevious} className="w-32">Previous</Button>
          <Button onClick={onNext} className="w-32">Next</Button>
        </div>
        </MaxWidthWrapper>

    )
}