import { Headings } from "@/components/headings"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useContext, useState } from "react"
import { AiContext } from "./AiTripContent"

export const Tags=({onPrevious,onSubmit}:{onPrevious:any,onSubmit:any})=>{
    const interestedTags=["Must-see Attractions","Great Food","Hidden Gems","Tours & Experiences","Street Food","Historical Landmarks","Luxury Shopping","Beach Life","Nightlife","Yoga and Wellness","Adventure and Sports","Pilgrimage"];
    let {selectedTags,setSelectedTags}=useContext(AiContext)
    return(
        <MaxWidthWrapper className="mx-auto bg-brand-25">
            <div className="flex flex-col items-center gap-4 mb-10 justify-center">
                <Headings>Tell us what you are interested in</Headings>
                <h3>Select all that apply</h3>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center max-w-sm md:max-w-lg mx-auto">
                {interestedTags.map((tag,index)=>(
                    <div key={index} className={cn("rounded-lg bg-brand-100 hover:bg-brand-300 cursor-pointer p-4 text-center",selectedTags.includes(tag)?"bg-brand-500 ring-1 scale-105":null)} onClick={()=>{if(selectedTags.includes(tag)){
                        setSelectedTags(selectedTags.filter((t)=>t!=tag))
                    }else{setSelectedTags([...selectedTags,tag])}}}>
                        {tag}
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-12">
                <Button onClick={onPrevious} className="w-32">Previous</Button>
                <Button onClick={onSubmit} className="w-32">Submit</Button>
            </div>
        </MaxWidthWrapper>
    )
}