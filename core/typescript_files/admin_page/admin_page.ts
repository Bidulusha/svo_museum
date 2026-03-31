

// UI interface
interface objectUI {
    create: () => void;
    clean: () => void;
}

// Calendar UI
class CalendarUI implements objectUI {
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
            let dayNumber = document.createElement("p");
            day.classList.add("calendar__day-cell");
            dayNumber.classList.add("calendar__day-number");
            dayNumber.innerText = (new Date(this.currentYear, this.currentMonth, +i - firstDay + 1).getDate()).toString();
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
            let dayNumber = document.createElement("p");
            day.classList.add("calendar__day-cell");
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
                        let dayNumber = document.createElement("p");
                        day.classList.add("calendar__day-cell");
                        day.classList.add("calendar__day-cell--next");
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

    clean = () => {

    }
} 

//Table UI
class TableUI implements objectUI {
    //Const string massives
    private headers: string[] = [
        "Дата посещения","Время посещения", 
        "Организация", "Высшая школа", "Курс", 
        "Группа", "Количество посетителей", "ФИО сопровождающего", 
        "Телефонный номер сопровождающего", "Статус заявки", "Статус экскурсии",
        "Обратная связь", "Реальное количество участников"
    ];
    private cellDOMAndTypes: string[][] = [
        ["input", "date"],                  //date
        ["input", "time"],                  //time
        ["input", "text"],                  //organization
        ["select", "higher_school"],        //higher school
        ["input", "text"],                  //course
        ["input", "text"],                  //group
        ["input", "nubmer"],                //count of customers
        ["input", "text"],                  //name of accompanying
        ["input", "text"],                  //phone number of accompanying
        ["select", "application_status"],   //application status
        ["select", "excursion_status"],     //excursion status
        ["input", "text"],                  //feedback
        ["input", "nubmer"]                 //real count of visitors
    ];
    private higher_schools: string[] = [
        "-",
        "ВШИТАС", "ВИШ", "ВШСГНиМК", "ВШЭНиГ", 
        "ВШППиФК", "ВШЭУиП", "ВШЕНиТ", "ВШРиМТ", 
        "ТК Императора Петра I", "ГумИн", "ИСМАРТ", 
        "ТК (Северодвинск)"
    ];
    private application_status_list: Map<string,string> = new Map<string,string>([
        ["SUBMITTED", "заполнена"],
        ["NEEDSEDITING", "нужно отредактировать"],
        ["ACCEPTED", "принята"]
    ]);
    private excursion_status_list: Map<string,string> = new Map<string, string>([
        ["waiting accepting", "Ожидает подтверждения"],
        ["accepted", "Принята"],
        ["moved", "Перенесена"],
        ["cancelled", "Отменена"],
        ["succeed", "Прошла"]
    ]);
    
    //Applications 
    private applications: Map<string, string>[] = [];

    //Elements
    private tableDiv: HTMLDivElement = document.querySelector(".table")!;
    private tableRowArray: HTMLElement[] = [];

    constructor() {
        
    }

    setup = async () => {
        await this.getApplications();
    }

    // Create UI on page
    create = () => {
        if (this.tableRowArray.length > 0 && this.tableDiv.innerHTML === ""){
            for (let tableRow in this.tableRowArray) {
                this.tableDiv.append(tableRow);
            }
            return;
        }

        let table_headers_row = document.createElement("tr");
        for (let header of this.headers){ // ADD CLASSES FOR SORTING
            let table_head = document.createElement("th");
            table_head.innerText = header;
            table_headers_row.append(table_head);
        }
        this.tableDiv.append(table_headers_row);
        
        this.applications.forEach((application, id) => { // APPLICATIONS FOREACH
            const table_row = document.createElement("tr");

            let i = 0
            application.forEach((value, key) => { // APPLICATION FOREACH
                const table_data = document.createElement("td");
                const row_cell = document.createElement(this.cellDOMAndTypes[i][0]);

                if (this.cellDOMAndTypes[i][0] === "select"){
                    switch (this.cellDOMAndTypes[i][1]) {
                        case "higher_school": {
                            this.higher_schools.forEach((hs, i) => {
                                const option = document.createElement("option");

                                option.innerText = hs;
                                if (hs === "-") option.value = "-";
                                else option.value = "higher_school_" + i;

                                if (option.value === value) option.selected = true;

                                row_cell.append(option);
                            });
                            break;
                        }
                        case "application_status": 
                        case "excursion_status": {
                            let status_type: Map<string, string>;

                            if (key == "application_status") {status_type = this.application_status_list;}
                            else {status_type = this.excursion_status_list;}

                            status_type.forEach((status, status_key) => {
                                const option = document.createElement("option");

                                option.innerText = status;
                                option.value = status_key;
                                if(status_key == key) option.selected = true;

                                row_cell.append(option);
                            });
                            break;
                        }
                        default: {
                            console.log("Absolute ERROR in switch case!!!!!");
                            break;
                        }
                    }
                }
                else {
                    (row_cell as HTMLInputElement).type = this.cellDOMAndTypes[i][1];
                    (row_cell as HTMLInputElement).value = value;
                }
                i++;

                table_data.append(row_cell);
                table_row.append(table_data); 
            });
            this.tableDiv.append(table_row);
            this.tableRowArray.push(table_row);
        });     
    }

    clean = () => {
        this.tableDiv.innerHTML = "";
    }

    // get applications from api
    private getApplications = async() =>{
        const url_get_applications: string = "http://91.122.215.194:8080/api/get_applications";
        try {
            const response = await fetch(url_get_applications);
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            result.forEach((value: Map<string, string>) => {
                this.applications.push(new Map<string,string>(Object.entries(value)));
            });
        } catch(error) {
            console.error(error)
        }
    }

}

async function setupUI(calendar: CalendarUI, table: TableUI) {
    await table.setup();
    
    table.create();
    calendar.create();
}

function createUI(calendar: CalendarUI, table: TableUI){
    table.create();
    calendar.create();
}

function deleteUI(calendar: CalendarUI, table: TableUI){
    calendar.clean();
    table.clean();
}

const calendar: CalendarUI = new CalendarUI();
const table: TableUI = new TableUI();

setupUI(calendar, table);
