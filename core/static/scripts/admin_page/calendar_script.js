const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 
    'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()
const currentDay = currentDate.getDate()

console.log(currentYear, currentMonth, currentDay)

document.querySelector('.calendar__month').innerText = months[currentDate.getMonth()]
document.querySelector('.calendar__year').innerText = currentYear;

let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
let week = document.createElement('div')
week.classList.add('calendar__day-numbers-row')

for(i = 1; i < daysInMonth + 1; i++){
    let day = document.createElement('span')
    day.classList.add('calendar__day-number')
    day.innerText =  i;
    (i == currentDay) && day.classList.add('calendar__day-number--current')
    week.append(day)

    if(new Date(currentYear, currentMonth, i).getDay() == 0 || i == daysInMonth) { //Need optimisation??
        document.querySelector('.calendar__day-numbers').append(week);

        if (i != daysInMonth) {
            week = document.createElement('div')
            week.classList.add('calendar__day-numbers-row')
        }
    }

}