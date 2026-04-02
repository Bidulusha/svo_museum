export class CalendarUI {
    constructor() {
        this.months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль",
            "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth();
        this.currentDay = this.currentDate.getDate();
        this.calendarDiv = document.querySelector(".calendar");
        this.calendarMonthYearDiv = document.querySelector(".calendar__month-and-year-name");
        this.calendarDayNumbersDiv = document.querySelector(".calendar__day-numbers");
        this.create = () => {
            let week = document.createElement("div");
            week.classList.add("calendar__day-numbers-row");
            const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
            let firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
            if (firstDay === 0)
                firstDay = 7;
            for (let i = 1; i < 8; i++) {
                let day = document.createElement("span");
                let dayNumber = document.createElement("div");
                day.classList.add("calendar__day-cell");
                day.id = `d${new Date(this.currentYear, this.currentMonth, i - firstDay + 2).toISOString().slice(0, 10)}`;
                dayNumber.classList.add("calendar__day-number");
                dayNumber.innerText = `${new Date(this.currentYear, this.currentMonth, i - firstDay + 1).getDate()}`;
                (i < firstDay) && dayNumber.classList.add("calendar__day-cell--previous");
                (new Date(this.currentYear, this.currentMonth, +i - firstDay + 1).getDay() > 5 ||
                    new Date(this.currentYear, this.currentMonth, +i - firstDay + 1).getDay() == 0)
                    && day.classList.add("calendar__day-cell--weekend");
                day.append(dayNumber);
                week.append(day);
            }
            this.calendarDayNumbersDiv.append(week);
            week = document.createElement("div");
            week.classList.add("calendar__day-numbers-row");
            for (let i = 9 - firstDay; i < daysInMonth + 1; i++) {
                let day = document.createElement("span");
                let dayNumber = document.createElement("div");
                day.classList.add("calendar__day-cell");
                day.id = `d${new Date(this.currentYear, this.currentMonth, i + 1).toISOString().slice(0, 10)}`;
                dayNumber.classList.add("calendar__day-number");
                dayNumber.innerText = i.toString();
                (i == this.currentDay) && day.classList.add("calendar__day-number--current");
                (new Date(this.currentYear, this.currentMonth, i).getDay() > 5 ||
                    new Date(this.currentYear, this.currentMonth, i).getDay() == 0)
                    && day.classList.add("calendar__day-cell--weekend");
                day.append(dayNumber);
                week.append(day);
                if (new Date(this.currentYear, this.currentMonth, i).getDay() == 0 || i == daysInMonth) {
                    if (i == daysInMonth && new Date(this.currentYear, this.currentMonth, i).getDay() != 0) {
                        for (let j = 1; j < 8 - new Date(this.currentYear, this.currentMonth, i).getDay(); j++) {
                            let day = document.createElement("span");
                            let dayNumber = document.createElement("div");
                            day.classList.add("calendar__day-cell");
                            day.classList.add("calendar__day-cell--next");
                            day.id = `d${new Date(this.currentYear, this.currentMonth + 1, j + 1).toISOString().slice(0, 10)}`;
                            dayNumber.classList.add("calendar__day-number");
                            dayNumber.innerText = j.toString();
                            (new Date(this.currentYear, this.currentMonth + 1, j).getDay() > 5 ||
                                new Date(this.currentYear, this.currentMonth + 1, j).getDay() == 0)
                                && day.classList.add("calendar__day-cell--weekend");
                            day.append(dayNumber);
                            week.append(day);
                        }
                    }
                    this.calendarDayNumbersDiv.append(week);
                    if (i != daysInMonth) {
                        week = document.createElement("div");
                        week.classList.add("calendar__day-numbers-row");
                    }
                }
            }
        };
        this.addNoteToDate = (name, date, application, noteClick = this.noteOnClick) => {
            const noteDiv = document.createElement('div');
            noteDiv.innerText = name;
            noteDiv.classList.add("calendar__day-note");
            noteDiv.addEventListener("click", (e) => noteClick(e, application));
            try {
                document.querySelector(`#d${date.toISOString().slice(0, 10)}`).appendChild(noteDiv);
            }
            catch (error) {
                console.error(error);
            }
        };
        this.noteOnClick = (e, note) => {
            alert(`Время проведения = ${note.time}`);
        };
        this.clean = () => {
        };
        this.calendarMonthYearDiv.innerText = this.months[this.currentMonth - 1].toString()
            + " " + this.currentYear.toString() + " г.";
    }
}
//# sourceMappingURL=calendar.js.map