'use client'
import { createContext, useState,Dispatch,SetStateAction, act } from "react"
import { DatePicker } from "./date-picker"
import { TripType } from "./trip-type"
import { DateRange } from "react-day-picker"
import { Tags } from "./tags"
import Trip from "./tripgeneration"

export const AiContext=createContext<{date:DateRange|undefined,setDate:(date:DateRange|undefined)=>void,trip:String|undefined,setTrip:Dispatch<SetStateAction<"solo" | "friends" | "family" | "corporate" | undefined>>,pet:boolean,setPet:(pet:boolean)=>void,selectedTags:string[],setSelectedTags:Dispatch<SetStateAction<string[]>>}>({date:undefined,setDate:()=>{},trip:undefined,setTrip:()=>{},pet:false,setPet:()=>{},selectedTags:[],setSelectedTags:()=>{}})

export const AiTripContent=({city}:{city:string})=>{
    const [activeNumber,setActiveNumber]=useState<number>(0)
    
    const [date, setDate] = useState<DateRange | undefined>();
    const [trip,setTrip]=useState<"solo"|"friends"|"family"|"corporate">()
    const [pet,setPet]=useState<boolean>(false);
    const [selectedTags,setSelectedTags]=useState<string[]>([]);
    return(
        <AiContext.Provider value={{date,setDate,trip,setTrip,pet,setPet,selectedTags,setSelectedTags}}>
        <div className="flex flex-col justify-center items-center py-4">
            {activeNumber==0?<DatePicker onNext={()=>{setActiveNumber(activeNumber+1);window.scrollTo({top: 0,behavior: 'smooth'});}} onPrevious={()=>{setActiveNumber(activeNumber-1);window.scrollTo({top: 0,behavior: 'smooth'})}}/>:activeNumber==1?<TripType onNext={()=>{setActiveNumber(activeNumber+1);window.scrollTo({top: 0,behavior: 'smooth'})}} onPrevious={()=>{setActiveNumber(activeNumber-1);window.scrollTo({top: 0,behavior: 'smooth'})}}/>:activeNumber==2?<Tags onPrevious={()=>{setActiveNumber(activeNumber-1);window.scrollTo({top: 0,behavior: 'smooth'})}} onSubmit={()=>{setActiveNumber(activeNumber+1);window.scrollTo({top: 0,behavior: 'smooth'})}}/>:activeNumber==3?<Trip />:null}
        </div>
        </AiContext.Provider>
    )
}