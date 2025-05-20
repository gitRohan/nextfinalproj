import { db } from "@/lib/db"
import { headers } from "next/headers"

export async function POST(request: Request) {
    const auth=(await headers()).get('authorization')
        const apiKey=auth?.split(' ')[1]
        console.log(apiKey)
        const User=await db.user.findUnique({
            where:{apiKey},
        })
        console.log(User)
        if(!User){
            return Response.json({
                status:401,
                body:'Unauthorized'
            })
        }

        const body=await request.json()
        try {
            const { flightData, hotelData, itineraryData } = body;
        
            // Validate the incoming data
            if (!flightData || !hotelData || !itineraryData) {
              return Response.json({ error: 'Missing required fields' });
            }
        
            // Save the data to the TravelData table
            const travelData = await db.travelData.create({
              data: {
                userId:User.id, // Assuming `userId` is passed in the request body
                flightData, // JSON object
                hotelData, // JSON array
                restaurantData: {}, // Optional, you can modify this as needed
                itinerary: itineraryData, // String
              },
            });
        
            return Response.json({ success: true, data: travelData });
          } catch (error) {
            console.error('Error saving travel data:', error);
            return Response.json({ error: 'Internal server error' });
          }
}