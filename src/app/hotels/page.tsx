'use client';

import LoadingSpinner from '@/components/loading-spinner';
import { Navbar } from '@/components/navbar';
import { TravelFooter } from '@/components/travel-footer';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { DateRange } from "react-day-picker"
import { HotelEmptyState } from './hotel-empty-state';
import { buttonVariants } from '@/components/ui/button';



export default function HotelsPage() {
  const [city, setCity] = useState<string>('');
  const [date, setDate] = useState<DateRange|undefined>();
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [hoteldetails, setHoteldetails] = useState<any>([]);
  const [loadinghoteldetails, setLoadinghoteldetails] = useState<boolean>(true);

    const hoteldetailsfn=async()=>{
        try {
          setLoadinghoteldetails(true);
          const res=await fetch("/api/hoteldetails",{
            method:"POST",
            body:JSON.stringify({
              inputquery:`${city}`,
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
            console.log(data.data.hotels);
            setHoteldetails(data.data.hotels);
          } else {
            console.error('Invalid response format:', data);
          }
        } catch (error) {
          console.error('Error in hoteldetails:', error);
        } finally{
            setLoadinghoteldetails(false);
        }
      }


  return (
    <div className="p-6">
        <div className='flex justify-center items-center gap-10'>
            <div className='flex gap-2 justify-center items-center'>
        <label htmlFor='city' className='mr-2 tracking-tighter text-xl'>
            City:
        </label>
        <input type='text' placeholder='type city name' value={city} onChange={(e)=>setCity(e.target.value)} className='border border-brand-300 p-1'/>
        </div>
        <div className='mr-2'>
        <Popover>
            <PopoverTrigger className='mr-2 tracking-tighter text-xl'>Select Date</PopoverTrigger>
            <PopoverContent side='bottom' sticky='always'>
                <Calendar mode="range"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow mx-auto flex items-center justify-center z-10"
                    disabled={{ before: new Date() }} max={7} />
            </PopoverContent>
        </Popover>
        </div>
        <div className='flex gap-2 justify-center items-center'>
        <label htmlFor='maxPrice' className='mr-2 tracking-tighter text-xl'>
            Max Price:
        </label>
        <input type='number' placeholder='max price' value={maxPrice} onChange={(e)=>setMaxPrice(parseInt(e.target.value))} className='border border-brand-300 p-1 w-28'/>
        </div>
        <button type='submit' onClick={hoteldetailsfn} className={buttonVariants({variant:'default', size:'default'})}>Search</button>
        </div>
      {loadinghoteldetails?<HotelEmptyState/>:<div>
      <h1 className="text-2xl font-bold mb-4">Available Hotels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hoteldetails.map((hotel:any,index:any) => (
          <div
            key={index}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={hotel.property.photoUrls[0]}
              alt={hotel.property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{hotel.property.name}</h2>
              <p>Price: {hotel.property.priceBreakdown.grossPrice.value}</p>
              <p className="text-sm text-yellow-500">Rating: {hotel.property.reviewScore}</p>
            </div>
          </div>
        ))}
      </div></div>}
    </div>
  );
}