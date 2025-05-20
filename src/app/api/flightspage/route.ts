export async function POST(request: Request) {
    const data = await request.json();
    const to = await data.to;
    const from = await data.from;
    const flightClass = await data.flightClass||"ECONOMY";
    let fromdestid = "";
    let todestid = "";
    let responsedata: any[] = [];
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
    const flightdata = async () => {
        const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${fromdestid}&toId=${todestid}&departDate=2025-04-23&stops=none&pageNo=1&adults=1&children=0%2C17&sort=CHEAPEST&cabinClass=${flightClass}&currency_code=INR`;
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
            responsedata=await result.data.flightOffers;
        } catch (error) {
            console.error(error);
        }
    }
    await flightdata();

    return Response.json({data:responsedata});
}