import { Application } from "/static/scripts/admin_page/objects/application";
import { objectUI } from "/static/scripts/admin_page/ui_objects/interface.js";

export class CalendarUI implements objectUI {
    //Const
    private months: string[] = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", 
    "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    
    //Date
    private currentDate: Date = new Date();
    private currentYear: number = this.currentDate.getFullYear();
    private currentMonth: number = this.currentDate.getMonth();
    private currentDay: number = this.currentDate.getDate();
    
    //Elements
    private calendarDiv: HTMLDivElement = document.querySelector(".calendar")!;
    private calendarMonthYearDiv: HTMLDivElement = document.querySelector(".calendar__month-and-year-name")!;
    private calendarDayNumbersDiv: HTMLDivElement = document.querySelector(".calendar__day-numbers")!;

    //Constructor
    constructor() {
        this.calendarMonthYearDiv.innerText = this.months[this.currentMonth - 1].toString()
            + " " + this.currentYear.toString() + " г.";
    }

    //Create UI on page
    create = () => {
        let week = document.createElement("div");
        week.classList.add("calendar__day-numbers-row");

        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        let firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        if (firstDay === 0) firstDay = 7;

        //first week
        
        for (let i = 1; i < 8; i++) {
            let day = document.createElement("span");
            let dayNumber = document.createElement("div");
            day.classList.add("calendar__day-cell");
            day.id = `d${new Date(this.currentYear, this.currentMonth, i - firstDay + 2).toISOString().slice(0,10)}`;
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

        // Current month without first week
        for (let i = 9 - firstDay; i < daysInMonth + 1; i++){
            let day = document.createElement("span");
            let dayNumber = document.createElement("div");
            day.classList.add("calendar__day-cell");
            day.id = `d${new Date(this.currentYear, this.currentMonth, i + 1).toISOString().slice(0,10)}`;
            dayNumber.classList.add("calendar__day-number");
            dayNumber.innerText = i.toString();
            (i == this.currentDay) && day.classList.add("calendar__day-number--current");
            (new Date(this.currentYear, this.currentMonth, i).getDay() > 5 || 
                new Date(this.currentYear, this.currentMonth, i).getDay() == 0) 
                && day.classList.add("calendar__day-cell--weekend");

            day.append(dayNumber);
            week.append(day);

            if(new Date(this.currentYear, this.currentMonth, i).getDay() == 0 || i == daysInMonth) {
                //last week
                if (i == daysInMonth && new Date(this.currentYear, this.currentMonth, i).getDay() != 0){

                    for (let j = 1; j < 8 - new Date(this.currentYear, this.currentMonth, i).getDay(); j++){
                        let day = document.createElement("span");
                        let dayNumber = document.createElement("div");
                        day.classList.add("calendar__day-cell");
                        day.classList.add("calendar__day-cell--next");
                        day.id = `d${new Date(this.currentYear, this.currentMonth + 1, j + 1).toISOString().slice(0,10)}`;
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
    }

    // Add note to calendar
    addNoteToDate = (name : string, date: Date, application: Application, noteClick: Function = this.noteOnClick) => {
        const noteDiv = document.createElement('div');
        noteDiv.innerText = name;
        noteDiv.classList.add("calendar__day-note");
        noteDiv.addEventListener("click", (e: Event) => noteClick(e, application));
        try {
            document.querySelector(`#d${date.toISOString().slice(0,10)}`)!.appendChild(noteDiv);
        } catch (error) {
            console.error(error);
        }
    }

    // function for note on click
    private noteOnClick = (e: Event, note: Application) => {
        alert(`Время проведения = ${note.time}`);
    }

    // Clean UI
    clean = () => {

    }
} 
