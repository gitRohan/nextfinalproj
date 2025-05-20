export async function POST(request: Request) {
    const data = await request.json();
    const to = await data.to;
    const from = await data.from;
    const flightClass = await data.flightClass;
    let fromdestid = "";
    let todestid = "";
    let responsedata = {
        cheapest: { departuredest: "", arrivaldest: "", departureTime: new Date(), arrivalTime: new Date(), name: "", logo: "", price: 0 },
        fastest: { departuredest: "", arrivaldest: "", departureTime: new Date(), arrivalTime: new Date(), name: "", logo: "", price: 0 },
        best: { departuredest: "", arrivaldest: "", departureTime: new Date(), arrivalTime: new Date(), name: "", logo: "", price: 0 }
    };
    const destid = async () => {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${from}`;
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
            fromdestid = await result.data[0].id;
        } catch (error) {
            console.error(error);
        }
        const url1 = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${to}`;
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
            todestid = await result.data[0].id;
        } catch (error) {
            console.error(error);
        }
    };
    await destid();

    let cheapest = "";
    let fastest = "";
    let best = "";
    const searchFlights = async () => {
        const url2 = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromdestid}&toId=${todestid}&departDate=2025-04-23&pageNo=1&adults=1&children=0%2C17&sort=CHEAPEST&cabinClass=${flightClass}&currency_code=INR`;
        const options2 = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };
        try {
            const response = await fetch(url2, options2);
            const result = await response.json();
			if(result.data && result.data.flightDeals) {
            cheapest = await result.data.flightDeals[0].offerToken;
            fastest = await result.data.flightDeals[1].offerToken;
            best = await result.data.flightDeals[2].offerToken;
			}else{
				console.error("Unexpected API response structure in url2222222222222222:", result);
			}
        } catch (error) {
            console.error(error);
        }
    };
    await searchFlights();

    const flightdetails = async () => {
        const url3 = `https://booking-com15.p.rapidapi.com/api/v1/flights/getFlightDetails?token=${cheapest}&currency_code=INR`;
        const options3 = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url3, options3);
            const result = await response.json();
            console.log(result); // Debugging log
            if (result.data && result.data.segments && result.data.segments[0]) {
                responsedata.cheapest.departuredest = result.data.segments[0].departureAirport.name;
                responsedata.cheapest.arrivaldest = result.data.segments[0].arrivalAirport.name;
                responsedata.cheapest.departureTime = result.data.segments[0].departureTime;
                responsedata.cheapest.arrivalTime = result.data.segments[0].arrivalTime;
                responsedata.cheapest.name = result.data.segments[0].legs[0].carriersData[0].name;
                responsedata.cheapest.logo = result.data.segments[0].legs[0].carriersData[0].logo;
                responsedata.cheapest.price = result.data.priceBreakdown.total.units;
            } else {
                console.error("Unexpected API response structure in url3333333333333333333:", result);
            }
        } catch (error) {
            console.error(error);
        }

        const url4 = `https://booking-com15.p.rapidapi.com/api/v1/flights/getFlightDetails?token=${fastest}&currency_code=INR`;
        const options4 = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url4, options4);
            const result = await response.json();
			if (result.data && result.data.segments && result.data.segments[0]) {
				responsedata.fastest.departuredest = await result.data.segments[0].departureAirport.name;
				responsedata.fastest.arrivaldest = await result.data.segments[0].arrivalAirport.name;
				responsedata.fastest.departureTime = await result.data.segments[0].departureTime;
				responsedata.fastest.arrivalTime = await result.data.segments[0].arrivalTime;
				responsedata.fastest.name = await result.data.segments[0].legs[0].carriersData[0].name;
				responsedata.fastest.logo = await result.data.segments[0].legs[0].carriersData[0].logo;
				responsedata.fastest.price = await result.data.priceBreakdown.total.units;
            } else {
                console.error("Unexpected API response structure in url4444444444444444444:", result);
            }
            
        } catch (error) {
            console.error(error);
        }

        const url5 = `https://booking-com15.p.rapidapi.com/api/v1/flights/getFlightDetails?token=${best}&currency_code=INR`;
        const options5 = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'bf9a0832fcmshc00b65ff37b27a8p12447ejsnf4ea8743c833',
                'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url5, options5);
            const result = await response.json();
			if (result.data && result.data.segments && result.data.segments[0]) {
                responsedata.best.departuredest = await result.data.segments[0].departureAirport.name;
            responsedata.best.arrivaldest = await result.data.segments[0].arrivalAirport.name;
            responsedata.best.departureTime = await result.data.segments[0].departureTime;
            responsedata.best.arrivalTime = await result.data.segments[0].arrivalTime;
            responsedata.best.name = await result.data.segments[0].legs[0].carriersData[0].name;
            responsedata.best.logo = await result.data.segments[0].legs[0].carriersData[0].logo;
            responsedata.best.price = await result.data.priceBreakdown.total.units;
            } else {
                console.error("Unexpected API response structure in url555555555555555555:", result);
            }
            
        } catch (error) {
            console.error(error);
        }
    };
    await flightdetails();
    return Response.json(responsedata);
}