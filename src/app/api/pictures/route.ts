import { createClient } from 'pexels';

const client =createClient('zGiW9YGPsas5dALl94eSJPzKkG3QsaB0Ctx9Tuny9SEbm0Ab1XB1dcEV');
export const POST=async(request:Request)=>{
    const data = await request.json();
    const imgArray=data.inputImage
    const imgSrc:string[]=[]
        {const query = imgArray[0];
        await client.photos.search({ query, page: 1, per_page: 1 }).then(response => {
            if ('photos' in response) {
                imgSrc.push(response.photos[0].src.medium);
            }
        });}
        {
        const query = imgArray[1];
        await client.photos.search({ query, page: 1, per_page: 1 }).then(response => {
            if ('photos' in response) {
                imgSrc.push(response.photos[0].src.medium);
            }
        });}
        {
        const query = imgArray[2];
        await client.photos.search({ query, page: 1, per_page: 1 }).then(response => {
            if ('photos' in response) {
                imgSrc.push(response.photos[0].src.medium);
            }
        });}
        {
        const query = imgArray[3];
        await client.photos.search({ query, page: 1, per_page: 1 }).then(response => {
            if ('photos' in response) {
                imgSrc.push(response.photos[0].src.medium);
            }
        });}
        {
        const query = imgArray[1];
        await client.photos.search({ query, page: 1, per_page: 1 }).then(response => {
            if ('photos' in response) {
                imgSrc.push(response.photos[0].src.medium);
            }
        });}

    return Response.json({src:imgSrc})
}