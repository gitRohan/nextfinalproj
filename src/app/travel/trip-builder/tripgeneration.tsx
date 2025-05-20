'use client'
import { useContext, useEffect, useState,useCallback, use } from "react";
import { AiContext } from "./AiTripContent";
import {GoogleGenerativeAI} from "@google/generative-ai";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from "next/image";
import { MapElement} from "@/components/maps";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/loading-spinner";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { tokenid } from "@/app/actions";

type Poi ={ key: string, location: google.maps.LatLngLiteral ,zIndex:number}
const Trip=()=>{
  
    const searchParams=useSearchParams()
    const from=searchParams.get("from")
    const to=searchParams.get("to")  
    const [flightClass,setFlightClass]=useState<string>("ECONOMY")
    let [maxHotelPrice,setMaxHotelPrice]=useState<number[]>([100000])
    let {date,trip,pet,selectedTags}=useContext(AiContext)
    let [output,setOutput]=useState<any>();
    let [flightData,setFlightData]=useState<any>();
    let [output2,setOutput2]=useState<any>();
    let [hotels,setHotels]=useState<any>([]);
    const [hoteldetails,setHoteldetais]=useState<any>([]);
    const [restaurantdetails,setRestaurantdetails]=useState<any>([])
    
    let [selectedDest,setSelectedDest]=useState<string[]>([]);
    let [maxPrice, setMaxPrice] = useState<number>(100000);
    let PoiArray:Poi[]=[]
    let cityCoordinates:{lat:number,long:number}={lat:0,long:0}
    let destinationarray=[];
    let [outputSrcArray,setOutputSrcArray]:any=useState([]);
    let v1="";
    useEffect(()=>{
        async function querypopular() {
          const genAI = new GoogleGenerativeAI("AIzaSyAP8VnDZXqx1hfQ5wJOzyuhjTNl3PdHbx8");
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
          const prompt = `Give the list of 5 popular tourist locations of ${to}} just give names and no bulletines`;
          const chat = model.startChat({
            history:[]
          });
          const result1= await chat.sendMessage(prompt);
          v1=result1.response.text();
          destinationarray=v1.trim().split(",");
          const res=await fetch("/api/pictures",{method:"POST",body:JSON.stringify({inputImage:destinationarray})})
          const data=await res.json();
          setOutputSrcArray(data.src);
        }
        querypopular()
        async function query2(){
          const genAI = new GoogleGenerativeAI("AIzaSyAP8VnDZXqx1hfQ5wJOzyuhjTNl3PdHbx8");
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
          const prompt = `Describe cultural heritage of ${to} with refernce to ${v1} in 50 words`;
          const chat = model.startChat({
            history:[]
          });
          const result1= await chat.sendMessage(prompt);
          setOutput2(result1.response.text());
        }
        query2()
        async function query(){
          const genAI = new GoogleGenerativeAI("AIzaSyAP8VnDZXqx1hfQ5wJOzyuhjTNl3PdHbx8");
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
          const prompt = `Create a trip to ${to} from ${date?date.from?.getDate():null} to ${date?date.to?.getDate():null} for ${trip} and having ${selectedTags.join(",")} include ${selectedDest?.join(",")}`;
          const chat = model.startChat({
            history:[]
          });
          const result1= await chat.sendMessage(prompt);
          setOutput(result1.response.text());
        }
        query()

        const hoteldetails=async()=>{
          try {
            PoiArray=[]
            const res=await fetch("/api/hoteldetails",{
              method:"POST",
              body:JSON.stringify({
                inputquery:`${to}`,
                fromDate:`${date?date.from?.getDate():null}`,
                toDate:`${date?date.to?.getDate():null}`,
                maxPrice: maxPrice
              })
            })
            const data=await res.json();
            if (data.error) {
              console.error('Error fetching hotels:', data.error);
              return;
            }
            if (data.data && data.data.hotels) {
              setHoteldetais(data.data.hotels);
            } else {
              console.error('Invalid response format:', data);
            }
          } catch (error) {
            console.error('Error in hoteldetails:', error);
          }
        }
        hoteldetails();
        const outputdata=async()=>{
        const res=await fetch("/api/restaurants",{method:"POST",body:JSON.stringify({inputquery:`${to} popular restaurants`})})
        const data=await res.json();
        setHotels(data.places)
        }
        outputdata();

        
        flightdetails();
    },[to])
    useEffect(()=>{
      const flightdetails=async()=>{
        const res=await fetch("/api/flights",{method:"POST",body:JSON.stringify({from:from,to:to,flightClass:flightClass})})
        const data=await res.json();
        setFlightData(data)
      }
      flightdetails()
    },[])

   hoteldetails.slice(0,9).map((hotel:any,index:any)=>{
      PoiArray.push({key:hotel.property.name,location:{lat:hotel.property.latitude,lng:hotel.property.longitude},zIndex:index})
   })
   restaurantdetails.map(async(restaurant:any,index:any=9)=>{
      PoiArray.push({key:restaurant.displayName.text,location:{lat:restaurant.location.latitude,lng:restaurant.location.longitude},zIndex:index})
   })
   PoiArray.map((dataItem, index) => ({...dataItem, zIndex: index}));
   const hoteldetails1=async()=>{
    try {
      PoiArray=[]
      const res=await fetch("/api/hoteldetails",{
        method:"POST",
        body:JSON.stringify({
          inputquery:`${to}`,
          fromDate:`${date?date.from?.getDate():null}`,
          toDate:`${date?date.to?.getDate():null}`,
          maxPrice: maxHotelPrice
        })
      })
      const data=await res.json();
      if (data.error) {
        console.error('Error fetching hotels:', data.error);
        return;
      }
      if (data.data && data.data.hotels) {
        setHoteldetais(data.data.hotels);
      } else {
        console.error('Invalid response format:', data);
      }
    } catch (error) {
      console.error('Error in hoteldetails:', error);
    }
  }
    const flightdetails=async()=>{
      try{
      const res=await fetch("/api/flights",{method:"POST",body:JSON.stringify({from:from,to:to,flightClass:flightClass})})
      const data=await res.json();
      setFlightData(data)
      }catch(error){
        console.error(error);
      }
    }
    const minvalue=500;
    const maxvalue=100000;
    const [flightSaveDetails,setFlightSaveDetails]=useState<{logo:string,name:string,departuredest:string,arrivaldest:string,price:number}>()
    interface HotelSaveDetailsprops{
      photo:string,
      name:string,
      price:number
    }
    const [hotelSaveDetails,setHotelSaveDetails]=useState<HotelSaveDetailsprops[]>([])
    const saveData=async()=>{
      hoteldetails.map((hotel:any)=>{
        if(selectedDest?.includes(hotel.property.name)){
          setHotelSaveDetails((prev:any)=>[...prev,{photo:hotel.property.photoUrls[0],name:hotel.property.name,price:hotel.property.priceBreakdown.grossPrice.value}])
        }
      })
      const tk=await tokenid()
      const res=await fetch("/api/saveTrip",{method:"POST",body:JSON.stringify({flightData:flightSaveDetails,hotelData:hotelSaveDetails,itineraryData:output}),headers:{'Authorization':'Bearer '+tk}})
      const data=await res.json();
      if(data.success){
        alert("Trip saved successfully")
      }else{
        alert("Error saving trip")
      }
    }
    return(
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-brand-25 -mt-2">
        <h1 className="col-span-1 sm:col-span-2 px-10 font-semibold tracking-tight">Trip to {to}</h1>
        <div className="col-span-1 sm:col-span-2">
          <div className="px-10 mb-4 py-5">
            <div className="mb-3 tracking-tight"> <Markdown remarkPlugins={[remarkGfm]}>{output2}</Markdown></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {outputSrcArray.slice(0,2).map((srcarray:any,index:any)=>(
                <div
                key={index}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-[200px]">
                    <Image
                    src={srcarray}
                    alt="anything"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
            </div>
              </div>
              ))}
            </div>
            
          </div>
          <div className="px-10 mb-4 py-5 flex flex-col">
              <div className="mb-3">
                <h1 className="text-lg/tight font-bold">Flight Details</h1>
              </div>
              <div className="flex mt-1 mb-4 gap-2">
                <Button variant='outline' size='sm' className={cn("text-sm border-2",flightClass=="ECONOMY"?"bg-brand-300 scale-110":null)}onClick={()=>{setFlightClass("ECONOMY");flightdetails()}}>ECONOMY</Button>
                <Button variant='outline' size='sm' className={cn("text-sm border-2",flightClass=="PREMIUM_ECONOMY"?"bg-brand-300 scale-105":null)} onClick={()=>{setFlightClass("PREMIUM_ECONOMY");flightdetails()}}>PREMIUM_ECONOMY</Button>
                <Button variant='outline' size='sm' className={cn("text-sm border-2",flightClass=="BUSINESS"?"bg-brand-300 scale-105":null)} onClick={()=>{setFlightClass("BUSINESS");flightdetails()}}>BUSINESS</Button>
                <Button variant='outline' size='sm' className={cn("text-sm border-2",flightClass=="FIRST"?"bg-brand-300 scale-105":null)} onClick={()=>{setFlightClass("FIRST");flightdetails()}}>FIRST</Button>
              </div>
              <div className="grid grid-cols-1 gap-6 items-center justify-center">
                {flightData?.cheapest?.logo||flightData?.fastest?.logo||flightData?.best?.logo!=undefined?
                <div className="grid grid-cols-1 gap-6 items-center justify-center">

                <Card className="w-2/3 h-full flex flex-col justify-between p-4 bg-brand-50 border border-slate-200 shadow-sm rounded-lg hover:scale-105" onClick={()=>{setFlightSaveDetails({logo:flightData?.cheapest?.logo,name:flightData?.cheapest?.name,departuredest:flightData?.cheapest?.departuredest,arrivaldest:flightData?.cheapest?.arrivaldest,price:flightData?.cheapest?.price})}}>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={flightData?.cheapest?.logo}
                      alt="Airline Logo"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{flightData?.cheapest?.name}</h3>
                      <p className="text-sm text-gray-500">{flightData?.cheapest?.departuredest} - {flightData?.cheapest?.arrivaldest}</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    Price: {flightData?.cheapest?.price} INR
                  </div>
                </Card>
                <Card className="w-2/3 h-full flex flex-col justify-between p-4 bg-brand-50 border border-slate-200 shadow-sm rounded-lg hover:scale-105" onClick={()=>{setFlightSaveDetails({logo:flightData?.fastest?.logo,name:flightData?.fastest?.name,departuredest:flightData?.fastest?.departuredest,arrivaldest:flightData?.fastest?.arrivaldest,price:flightData?.fastest?.price})}}>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={flightData?.fastest?.logo}
                      alt="Airline Logo"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{flightData?.fastest?.name}</h3>
                      <p className="text-sm text-gray-500">{flightData?.fastest?.departuredest} - {flightData?.fastest?.arrivaldest}</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    Price: {flightData?.fastest?.price} INR
                  </div>
                </Card>
                <Card className="w-2/3 h-full flex flex-col justify-between p-4 bg-brand-50 border border-slate-200 shadow-sm rounded-lg hover:scale-105" onClick={()=>{setFlightSaveDetails({logo:flightData?.best?.logo,name:flightData?.best?.name,departuredest:flightData?.best?.departuredest,arrivaldest:flightData?.best?.arrivaldest,price:flightData?.best?.price})}}>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={flightData?.best?.logo}
                      alt="Airline Logo"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{flightData?.best?.name}</h3>
                      <p className="text-sm text-gray-500">{flightData?.best?.departuredest} - {flightData?.best?.arrivaldest}</p>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-800">
                    Price: {flightData?.best?.price} INR
                  </div>
                </Card>
                </div>:<LoadingSpinner/>
              }
              </div>
          </div>
          <div className="px-10 space-y-4 py-5">
            <div>
              <h1 className="text-lg/tight font-bold">Places to stay</h1>
              <p>We've also recommended some places to stay during your trip.
              </p>
            </div>
            <div className="flex mb-6">
              <Card className="w-full p-4 bg-brand-50 border border-slate-200 shadow-sm rounded-lg">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="flex justify-between items-center w-full">
                  <span>{minvalue}</span>
                  <span>100k</span>
                </div>
               
              <Slider defaultValue={maxHotelPrice} max={maxvalue} min={minvalue} step={100} onValueChange={(i) =>{setMaxHotelPrice(i)}}/> 
               
              </div>
              </Card>
              <div className="flex items-center ml-3 ">
                <span className="text-xs">Max Price: {maxHotelPrice}</span>
                <Button variant="outline" size="sm" className="ml-4" onClick={()=>{hoteldetails1()}}>Check</Button>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hoteldetails.slice(0,5).map((hotel:any, index:any) =>(
                <div 
                  key={index}
                  className="group"
                >
                  <div className={cn("relative overflow-hidden rounded-lg cursor-pointer",selectedDest?.includes(hotel.property.name)?"bg-brand-100 ring-2 scale-105":null)} onClick={()=>{if(selectedDest?.includes(hotel.property.name)){
                        setSelectedDest(selectedDest.filter((t)=>t!=hotel.property.name))
                    }else{setSelectedDest([...selectedDest,hotel.property.name])}}}>
                    <div className="relative h-[200px]">
                      <Image
                      src={hotel.property.photoUrls[0]}
                      alt={hotel.property.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">{hotel.property.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {date?.from?.getDate()} - {date?.to?.getDate()}
                    </span>
                    <span className="flex items-center">
                       
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex gap-2">
                  <span 
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                  >
                    Rating-{hotel.property.reviewScore}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                    {hotel.property.priceBreakdown.grossPrice.currency} - {hotel.property.priceBreakdown.grossPrice.value}
                  </span>
                    </div>
                </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-10 space-y-4 py-5">
            <div>
              <h1 className="text-lg/tight font-bold">Dinner pics for you</h1>
              <p>Here are some local favorites that are open for dinner.</p>
            </div>
            <div>
              {hotels.map((hotel:any,index:any)=>(
                <div className="flex flex-col my-4" key={index}>
                  <div className="relative overflow-hidden rounded-lg bg-brand-50 ring-slate-500 p-2">
                    {hotel.displayName.text} - {hotel.editorialSummary?hotel.editorialSummary.text:hotel.shortFormattedAddress}
                  </div>
                  <div className="mt-3">
                    <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {hotel.rating}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {hotel.parkingOptions.freeParkingLot||hotel.parkingOptions.paidParkingLot?"Parking available":"Parking not available"}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {hotel.servesVegetarianFood?"Serve`s vegitarian food":"No vegitarian food"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-10 mb-4 py-5">
            {selectedDest.length!=0?
            <Markdown remarkPlugins={[remarkGfm]}>{output}</Markdown>:<LoadingSpinner/>}
          </div>
          <div className="flex items-center justify-center my-4">
          <Button size='lg' onClick={saveData}>Save</Button>
          </div>
        </div>
        <div className="sticky inset-y-0 right-0 h-screen">
          <MapElement Poi1={PoiArray} cityprops={cityCoordinates}/>
        </div>
      </div>
    )
}
export default Trip;