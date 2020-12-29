export function timestampToDate(ts) {
    const theDate = new Date(ts * 1000);
    const dateString = theDate.toDateString();
    return dateString;
}

export function chooseIcon(id, isDay) {
    let iconSource;
    switch(true) {
        case (id >= 200 && id < 300):  //thunderstorm
            return iconSource = './icons/thunderstorm.png';

        case ((id >= 300 && id < 400) || (id >= 500 && id < 600)) : //drizzle and rain
            if (isDay) {
                return iconSource = './icons/rain-day.png';
            } else {
                return iconSource = './icons/rain-night.png';
            }

        case (id >= 600 && id < 700):  //snow
            return iconSource = './icons/snow.png';

        case (id >= 700 && id <= 762):  //dust, fog, mist
            return iconSource = './icons/fog.png';

        case (id === 800):  //clear
            if (isDay) {
                return iconSource = './icons/clear-day.png';
            } else {
                return iconSource = './icons/clear-night.png';
            }

        case (id > 800 && id < 900):  //clouds
            if (isDay) {
                return iconSource = './icons/cloudy-day.png';
            } else {
                return iconSource = './icons/cloudy-night.png';
            }

        default:  return iconSource = './icons/clear-day.png';
    };
}