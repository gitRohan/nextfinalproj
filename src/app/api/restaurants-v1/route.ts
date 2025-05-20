import { NextResponse } from "next/server";

export async function POST(request:Request){
    const data=await request.json()
    const textQuery=data.inputquery;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        throw new Error('GOOGLE_MAPS_API_KEY is not defined');
    }
    const url = 'https://places.googleapis.com/v1/places:searchText';
    let restaurantimg=[];
    let places=[]
    let photosname=""
    let restauranturl=''
    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.priceLevel', 
          },
          body: JSON.stringify({ textQuery:textQuery,pageSize:5,includedType:"restaurant" }),
        });
  
        const data = await response.json();
        places=data.places;
        restaurantimg=[data.places[0].id,data.places[1].id,data.places[2].id,data.places[3].id,data.places[4].id];

      } catch (error) {
        console.error('Error fetching places:', error);
        return Response.json({ error: 'Failed to fetch places' });
      }

      const restaurantswithimage=await Promise.all(
        places.map(async(place:any)=>{
            const placeDetailsUrl = `https://places.googleapis.com/v1/places/${place.id}?fields=photos&key=${apiKey}`;
            const response = await fetch(placeDetailsUrl, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "X-Goog-Api-Key": apiKey,
                  "X-Goog-FieldMask": "photos",
                },
              });
              if (!response.ok) {
                console.error(
                  `Error fetching place details: ${response.status} ${response.statusText}`
                );
                return null;
              }
              const data= await response.json();
              photosname=data.photos[0].name;
              const maxHeightPx=400;
              const maxWidthPx=400;
              const skipHttpRedirect=true;
              const photoUrl = `https://places.googleapis.com/v1/${photosname}/media?maxHeightPx=${maxHeightPx}&maxWidthPx=${maxWidthPx}&key=${apiKey}&skipHttpRedirect=${skipHttpRedirect}`;
              
              const response1 = await fetch(photoUrl, {
                  method: "GET",
                });
                if (!response1.ok) {
                  console.error(
                    `Error fetching photo: ${response.status} ${response.statusText}`
                  );
                  return null;
                }
                if (skipHttpRedirect) {
                  const data = await response1.json();
                  restauranturl= data.photoUri;
                } else {
                  restauranturl= response1.url; 
                }
            return {...place,restauranturl}
        })
      )
      console.log(restaurantswithimage)
       return NextResponse.json(restaurantswithimage);
}