'use client'
import { tokenid } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useEffect, useState } from "react"

export const AccountSetting=({discordId:initialDiscordId}:{discordId:string})=>{
    const [discordId,setDiscordId]=useState(initialDiscordId)

    const resFn=async()=>{
      const tk=await tokenid()
      const res = await fetch('http://localhost:3000/api/category-event',{method:'POST',body:JSON.stringify(discordId),headers:{'Authorization':'Bearer '+tk}})
    }
      
    return(
        <Card className="max-w-xl w-full space-y-4">
          <div>
            <Label>Discord ID</Label>
            <Input className="mt-1" value={discordId} onChange={(e)=>setDiscordId(e.target.value)} placeholder="Enter your Discord ID"/>
          </div>

          <p className="mt-2 text-sm/6 text-gray-600">
            Don't know how to find your Discord ID?{" "}<Link href="#" className="text-brand-600 hover:text-brand-500">Learn how to obtain it here</Link>.
          </p>
          <div className="pt-4">
            <Button onClick={()=>resFn()}>
              Save Changes
            </Button>
          </div>
        </Card>
    )
}