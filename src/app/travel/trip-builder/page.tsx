
import { TravelFooter } from "@/components/travel-footer";
import { AiTripContent } from "./AiTripContent";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";


const Page=async()=>{

    const city="mumbai";
    return(
        <div>
            <Navbar/>
            <AiTripContent city={city}/>
            <TravelFooter/>
        </div>
    )
}
export default Page;