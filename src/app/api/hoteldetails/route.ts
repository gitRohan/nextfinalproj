
export async function POST(request:Request){
	const data=await request.json()
	const textQuery=data.inputquery;
	const toDate=data.toDate||new Date().getDate()+1;
	const fromDate=data.fromDate||new Date().getDate();
	const maxPrice = data.maxPrice || 100000;
	const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${textQuery}`;
	const options = {
		method: 'GET',
		headers: {
		'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
		'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
		}
	};
    let destinationid:string="";
	try {
		const response = await fetch(url, options);
		const apiResult = await response.json();
        if (!apiResult.data || !apiResult.data[0]) {
            return Response.json({ error: 'No destination found' }, { status: 404 });
        }
        destinationid=apiResult.data[0].dest_id;
	} catch (error) {
		console.error(error);
        return Response.json({ error: 'Failed to fetch destination' }, { status: 500 });
	}
	let url1='';
	if(toDate>10&&fromDate>10){
    	url1 = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${destinationid}&search_type=CITY&arrival_date=2025-04-${fromDate}&departure_date=2025-04-${toDate}&adults=2&children_age=0%2C17&room_qty=1&page_number=1&sort_by=class_descending&price_max=${maxPrice}&units=metric&temperature_unit=c&languagecode=en-us&currency_code=INR`;
	}else{
		url1 = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${destinationid}&search_type=CITY&arrival_date=2025-04-0${fromDate}&departure_date=2025-04-0${toDate}&adults=2&children_age=0%2C17&room_qty=1&page_number=1&sort_by=class_descending&price_max=${maxPrice}&units=metric&temperature_unit=c&languagecode=en-us&currency_code=INR`;
	}
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
        if (!result.data || !result.data.hotels) {
            return Response.json({ error: 'No hotels found' }, { status: 404 });
        }
        return Response.json({ data: { hotels: result.data.hotels } });
    } catch (error) {
	    console.error(error);
        return Response.json({ error: 'Failed to fetch hotels' }, { status: 500 });
    }
}