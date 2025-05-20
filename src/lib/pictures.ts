import { createClient } from 'pexels';

export const pictures=async({imgArray}:{imgArray:string[]})=>{
    let imgSrc:string[]=[];
    const client =createClient('zGiW9YGPsas5dALl94eSJPzKkG3QsaB0Ctx9Tuny9SEbm0Ab1XB1dcEV');
    imgArray.map(async(imgName)=>{
        const query = imgName;
        await client.photos.search({ query, page: 1, per_page: 1 }).then(response => {
            if ('photos' in response) {
                imgSrc.push(response.photos[0].src.medium);
            }
        });
    })
    console.log(imgSrc)
    return imgSrc;
}
