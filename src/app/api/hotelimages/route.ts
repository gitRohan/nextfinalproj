export async function POST(request:Request){
    const data=await request.json()
    const textQuery=data.inputquery;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        throw new Error('GOOGLE_MAPS_API_KEY is not defined');
    }
    const url = 'https://places.googleapis.com/v1/places:searchText';

    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.photos', 
          },
          body: JSON.stringify({ textQuery:textQuery,pageSize:5 }),
        });
        const data = await response.json();
        return Response.json(data);
      } catch (error) {
        console.error('Error fetching places:', error);
        return Response.json({ error: 'Failed to fetch places' });
      }

}