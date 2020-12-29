const api1 = 'AIzaSyAm0nn';
const api2 = 'DFbVwnhj65IOPq';
const api3 = 'w2D__m70gcEP-g';
const api = api1.concat(api2, api3);

export async function cityToCoords(city) {
    const urlAddress = encodeURI(city);

    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${urlAddress}&key=${api}`);
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
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${api}`)
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