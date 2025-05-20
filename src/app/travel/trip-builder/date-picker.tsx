'use client'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { useContext} from "react"
import { DateRange } from "react-day-picker"
import { AiContext } from "./AiTripContent"
import { Headings } from "@/components/headings"
import Link from "next/link"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export const DatePicker=({onNext,onPrevious}:{onNext:any,onPrevious:any})=>{
    let {date,setDate}=useContext(AiContext)
    return(
        <MaxWidthWrapper className="mx-auto bg-brand-25">
          <div className="flex flex-col items-center gap-4 mb-10 justify-center">
            <Headings>When are you going?</Headings>
            <h2>Choose a date range, up to 7 days.</h2>
          </div>
          <div className="flex flex-col items-center gap-4 mb-10 justify-center">
            <Calendar mode="range"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow min-w-full mx-auto flex items-center justify-center"
            disabled={{ before: new Date() }} max={7}/>
            <p>{date ? `${date.from?.toDateString()} - ${date.to?.toDateString()}` : 'No date selected'}</p>
          </div>
          <div className="flex justify-between items-center">
          <Button onClick={onPrevious} className="w-32">Previous</Button>
          <Button onClick={onNext} className="w-32">Next</Button>
          </div>
        </MaxWidthWrapper>
    )
}