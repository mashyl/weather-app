const toggleWeeklyBtn = document.getElementById('toggle-weekly-btn');
const weeklyBox = document.querySelector('.weekly-box');
const weeklyTemplate = document.querySelector('.weekly');

const cityNameHTML = document.querySelector('.city-input');
const currImg = document.querySelector('.icon img');
const descriptionHTML = document.getElementById('desc-html');
const tempHTML = document.getElementById('temperature');
const backgr = document.querySelector('.background');
const curDateHTML = document.getElementById('current-date');

toggleWeeklyBtn.addEventListener('click', () => {
    toggleWeeklyBtn.querySelector('svg').classList.toggle('rotated');
    weeklyBox.classList.toggle('no-display');
});

export class WeekDay {
    constructor(date, icon, temperature) {
        this.date = date,
        this.day = date.split(' ')[0];
        this.dates = date.substring(4, 10);
        this.temp = temperature,
        this.icon = icon,
        this.appendDay(this.day, this.dates, this.icon, this.temp)
    }

    appendDay(day, dates, icon, temp) {
        const weeklyDay = weeklyTemplate.content.cloneNode(true);
        weeklyDay.querySelector('h3.day').textContent = `${day}`;
        weeklyDay.querySelector('h3.dates').textContent = `${dates}`;
        weeklyDay.querySelector('.min-icon img').setAttribute('src', icon);
        weeklyDay.querySelector('h3.temp').textContent = `${temp}℃`;
        weeklyBox.appendChild(weeklyDay);
    }
}

export function backgroundColor() {
    backgr.classList.remove('filter-backgr');
}

export function updateToday(city, desc, descMain, currIconSource, temp, isDay) {
    //clear day rows
    if (weeklyBox.children.length > 1){
        for (let i = 0; i < 8; i++) {
            weeklyBox.querySelector('.day-row').remove();
        }
    }

    //background update
    if (!isDay) {
        backgr.classList.add('night');
    } else if (isDay && backgr.classList.contains('night')) {
        backgr.classList.remove('night');
    }
    
    //today udate
    cityNameHTML.value = city;
    currImg.setAttribute('src', currIconSource);
    descriptionHTML.textContent = desc.toUpperCase();
    tempHTML.textContent = `${temp}℃`;

    const date = new Date().toDateString();
    curDateHTML.textContent = date;
}
