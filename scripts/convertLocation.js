const API_GOOGLE = process.env.API_GOOGLE;

export async function cityToCoords(city) {
    const urlAddress = encodeURI(city);

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${API_GOOGLE}`);
    if (!response.ok) {
        throw new Error('Request failed. Try again.')
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const coordinates = data.results[0].geometry.location;
    return coordinates;
}

export async function coordsToCity(coords) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${API_GOOGLE}`)
    if (!response.ok) {
        throw new Error('Request failed. Try again.')
    }

    const data = await response.json();
    if (data.error_message) {
        throw new Error(data.error_message);
    }

    const city = data.plus_code.compound_code.split(',')[0].split(' ')[1];
    return city;
}