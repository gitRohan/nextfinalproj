export const POST=async(request:Request)=>{
    const data = await request.json();
    const imgArray=data.inputImage
    let output:string[]=[];
    let slug="";
    {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${imgArray[0]}&languagecode=en-us`;
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        slug=result.data.products[0].productSlug;
    } catch (error) {
	    console.error(error);
    }

    const url1 = `https://booking-com15.p.rapidapi.com/api/v1/attraction/getAttractionDetails?slug=${slug}&currency_code=INR`;
    const options1 = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url1, options1);
	    const result = await response.json();
        const o1=result.data.primaryPhoto.small;
        output.push(o1);
    } catch (error) {
	    console.error(error);
    }
    }
    {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${imgArray[1]}&languagecode=en-us`;
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        slug=result.data.products[0].productSlug;
    } catch (error) {
	    console.error(error);
    }

    const url1 = `https://booking-com15.p.rapidapi.com/api/v1/attraction/getAttractionDetails?slug=${slug}&currency_code=INR`;
    const options1 = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url1, options1);
	    const result = await response.json();
        const o1=result.data.primaryPhoto.small;
        output.push(o1);
    } catch (error) {
	    console.error(error);
    }
    }
    {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${imgArray[2]}&languagecode=en-us`;
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        slug=result.data.products[0].productSlug;
    } catch (error) {
	    console.error(error);
    }

    const url1 = `https://booking-com15.p.rapidapi.com/api/v1/attraction/getAttractionDetails?slug=${slug}&currency_code=INR`;
    const options1 = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url1, options1);
	    const result = await response.json();
        const o1=result.data.primaryPhoto.small;
        output.push(o1);
    } catch (error) {
	    console.error(error);
    }
    }
    {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${imgArray[3]}&languagecode=en-us`;
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        slug=result.data.products[0].productSlug;
    } catch (error) {
	    console.error(error);
    }

    const url1 = `https://booking-com15.p.rapidapi.com/api/v1/attraction/getAttractionDetails?slug=${slug}&currency_code=INR`;
    const options1 = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url1, options1);
	    const result = await response.json();
        const o1=result.data.primaryPhoto.small;
        output.push(o1);
    } catch (error) {
	    console.error(error);
    }
    }
    {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${imgArray[4]}&languagecode=en-us`;
    const options = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.json();
        slug=result.data.products[0].productSlug;
    } catch (error) {
	    console.error(error);
    }

    const url1 = `https://booking-com15.p.rapidapi.com/api/v1/attraction/getAttractionDetails?slug=${slug}&currency_code=INR`;
    const options1 = {
	    method: 'GET',
	    headers: {
		    'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		    'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url1, options1);
	    const result = await response.json();
        const o1=result.data.primaryPhoto.small;
        output.push(o1);
    } catch (error) {
	    console.error(error);
    }
    }
    return Response.json({src:output})
}