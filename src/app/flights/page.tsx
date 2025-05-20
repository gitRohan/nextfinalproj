'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FlightEmptyState } from './flight-empty-state';
import Image from 'next/image';


export default function FlightsPage() {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [departure, setDeparture] = useState<string>('');
  const [arrival, setArrival] = useState<string>('');
  const [flightClass, setFlightClass] = useState<string>('ECONOMY');

  const flightdetails=async()=>{
    try{
      setLoading(true);
      const res=await fetch("/api/flightspage",{method:"POST",body:JSON.stringify({from:departure,to:arrival,flightClass:flightClass})})
      const data1=await res.json();
      setFlights(data1.data)
    }catch(error){
      console.error('Error fetching flights:', error);  
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <div className='bg-brand-25'>
      <div className='flex gap-2 justify-center items-center'>
        <label htmlFor="departure">Departure:</label>
        <input type="text" id="departure" value={departure} onChange={(e) => setDeparture(e.target.value)} placeholder="Enter departure city" className='border-brand-500 border-2 h-8' />
        <label htmlFor="arrival">Arrival:</label>
        <input type="text" id="arrival" value={arrival} onChange={(e) => setArrival(e.target.value)} placeholder="Enter arrival city" className='border-brand-500 border-2 h-8'/>
        <label htmlFor="flightClass">Flight Class:</label>
        <select id="flightClass" value={flightClass} onChange={(e) => setFlightClass(e.target.value)} className='border-brand-500 border-2 h-8'>  
          <option value="ECONOMY">Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First Class</option>
          <option value="Premium_Economy">Premium Economy</option>
        </select>
        <Button onClick={flightdetails} className='ml-4'>Search</Button>
      </div>
      <div>
        {loading?<FlightEmptyState/>:
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>{
          flights.map((flight, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <Image src={flight.segments[0].legs[0].carriersData[0].logo} alt="airline logo" width={20} height={20} className='rounded-full'/>
              <h2 className="text-lg font-semibold">{flight.segments[0].legs[0].carriersData[0].name}</h2>
            </div>
            
            <h2 className="text-lg font-semibold">{flight.segments[0].departureAirport.name}</h2>
            <p>Departure Time: {flight.segments[0].departureTime}</p>
            <h2 className="text-lg font-semibold">{flight.segments[0].arrivalAirport.name}</h2>
            <p>Arrival Time: {flight.segments[0].arrivalTime}</p>
            <p>Price:{flight.priceBreakdown.total.currencyCode} <span>{flight.priceBreakdown.total.units}</span></p>
          </div>))
        }
        </div>
        }
      </div>
    </div>
  );
}