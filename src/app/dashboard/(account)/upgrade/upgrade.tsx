'use client'
import { tokenid } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { createCheckoutSession } from "@/lib/stripe";
import { Plan } from "@prisma/client";
import { format } from "date-fns";
import { BarChart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Upgrade=({plan}:{plan:Plan})=>{
  const router=useRouter()
  const [upgradeData,setUpgradeData]=useState<{categoriesUsed:number,categoriesLimit:50|10,eventsUsed:number,eventsLimit:1000|100,resetDate:Date}>();

  const createCheckoutSession=async()=>{
    const tk=await tokenid()
    const res=await fetch("http://localhost:3000/api/payment",{headers:{'Authorization':'Bearer '+tk}})
    const data =await res.json();
    console.log(data)
    if(data.url){
      router.push(data.url)
    }
  }
  

  useEffect(()=>{
    const resdata=async()=>{
    const tk=await tokenid()
    const res = await fetch('http://localhost:3000/api/project-router',{headers:{'Authorization':'Bearer '+tk}})
    const responseData=await res.json();
    setUpgradeData(responseData)
    }
    resdata();
  },[]
  )

  return(
    <div className="max-w-3xl flex flex-col gap-8">
      <div>
        <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
              {plan==='PRO'?'Plan: Pro':'Plan: Free'}
        </h1>
        <p className="text-sm/6 text-gray-600 max-w-prose">
          {plan==="PRO"?"Thank you for supporting TourAI. Find your increased usage limits below.":"Get access to more events, categories and premium support."}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-brand-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Total Events</p>
            <BarChart className="size-4 text-muted-foreground"/>
            </div>
          <div>
            <p className="text-2xl font-bold">{upgradeData?.eventsUsed||0} of{" "}{upgradeData?.eventsLimit||0}</p>
            <p className="text-xs/5 text-muted-foreground"> Events this period</p>
          </div>
        </Card>
        <Card className="border-2 border-brand-700">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <p className="text-sm/6 font-medium">Event Categories</p>
            <BarChart className="size-4 text-muted-foreground"/>
            </div>
          <div>
            <p className="text-2xl font-bold">{upgradeData?.categoriesUsed||0} of{" "}{upgradeData?.categoriesLimit||0}</p>
            <p className="text-xs/5 text-muted-foreground">Active categories</p>
          </div>
        </Card>
      </div>
      <p className="text-sm text-gray-500">Usage will reset{" "}{upgradeData?.resetDate?(format(upgradeData.resetDate,"MMM d, yyyy")):(<span className="animate-pulse w-8 h-4 bg-gray-200"></span>)}
      {plan !== "PRO"?<span className="inline underline text-brand-600 cursor-pointer" onClick={()=>createCheckoutSession()}>{" "} or upgrade now to increase your limit &rarr;</span>:null}
      </p>
    </div>
    )
}