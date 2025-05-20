'use server'
export const hotelimg=async({name}:{name:string}):Promise<string>=>{
    const res=await fetch("/api/hotelimages",{method:"POST",body:JSON.stringify({inputquery:`${name} images`})})
    const data=await res.json();
    console.log(data.places[0].photos[0].authorAttributions[0].photoUri)
    return data.places[0].photos[0].authorAttributions[0].photoUri;
}