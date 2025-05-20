import { Card } from "@/components/ui/card"

export const FlightEmptyState=()=>{
    return(
        <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6 h-full mt-5">
            
            <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
                Search for Flights
            </h1>
            <p className="text-sm/6 text-gray-600 max-w-prose mt-2 mb-8">
                Start searching for Flights 
            </p>
        </Card>
    )
}