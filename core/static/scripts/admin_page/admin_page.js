"use strict";
class CalendarUI {
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
            for (let i = 9 - firstDay; i < daysInMonth + 1; i++) {
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
                if (new Date(this.currentYear, this.currentMonth, i).getDay() == 0 || i == daysInMonth) {
                    if (i == daysInMonth && new Date(this.currentYear, this.currentMonth, i).getDay() != 0) {
                        for (let j = 1; j < 8 - new Date(this.currentYear, this.currentMonth, i).getDay(); j++) {
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
        };
        this.clean = () => {
        };
        this.calendarMonthYearDiv.innerText = this.months[this.currentMonth - 1].toString()
            + " " + this.currentYear.toString() + " г.";
    }
}
class TableUI {
    constructor() {
        this.headers = [
            "Дата посещения", "Время посещения",
            "Организация", "Высшая школа", "Курс",
            "Группа", "Количество посетителей", "ФИО сопровождающего",
            "Телефонный номер сопровождающего", "Статус заявки", "Статус экскурсии",
            "Обратная связь", "Реальное количество участников"
        ];
        this.cellDOMAndTypes = [
            ["input", "date"],
            ["input", "time"],
            ["input", "text"],
            ["select", "higher_school"],
            ["input", "text"],
            ["input", "text"],
            ["input", "nubmer"],
            ["input", "text"],
            ["input", "text"],
            ["select", "application_status"],
            ["select", "excursion_status"],
            ["input", "text"],
            ["input", "nubmer"]
        ];
        this.higher_schools = [
            "-",
            "ВШИТАС", "ВИШ", "ВШСГНиМК", "ВШЭНиГ",
            "ВШППиФК", "ВШЭУиП", "ВШЕНиТ", "ВШРиМТ",
            "ТК Императора Петра I", "ГумИн", "ИСМАРТ",
            "ТК (Северодвинск)"
        ];
        this.application_status_list = new Map([
            ["SUBMITTED", "заполнена"],
            ["NEEDSEDITING", "нужно отредактировать"],
            ["ACCEPTED", "принята"]
        ]);
        this.excursion_status_list = new Map([
            ["waiting accepting", "Ожидает подтверждения"],
            ["accepted", "Принята"],
            ["moved", "Перенесена"],
            ["cancelled", "Отменена"],
            ["succeed", "Прошла"]
        ]);
        this.applications = [];
        this.tableDiv = document.querySelector(".table");
        this.tableRowArray = [];
        this.setup = async () => {
            await this.getApplications();
        };
        this.create = () => {
            if (this.tableRowArray.length > 0 && this.tableDiv.innerHTML === "") {
                for (let tableRow in this.tableRowArray) {
                    this.tableDiv.append(tableRow);
                }
                return;
            }
            let table_headers_row = document.createElement("tr");
            for (let header of this.headers) {
                let table_head = document.createElement("th");
                table_head.innerText = header;
                table_headers_row.append(table_head);
            }
            this.tableDiv.append(table_headers_row);
            this.applications.forEach((application, id) => {
                const table_row = document.createElement("tr");
                let i = 0;
                application.forEach((value, key) => {
                    const table_data = document.createElement("td");
                    const row_cell = document.createElement(this.cellDOMAndTypes[i][0]);
                    if (this.cellDOMAndTypes[i][0] === "select") {
                        switch (this.cellDOMAndTypes[i][1]) {
                            case "higher_school": {
                                this.higher_schools.forEach((hs, i) => {
                                    const option = document.createElement("option");
                                    option.innerText = hs;
                                    if (hs === "-")
                                        option.value = "-";
                                    else
                                        option.value = "higher_school_" + i;
                                    if (option.value === value)
                                        option.selected = true;
                                    row_cell.append(option);
                                });
                                break;
                            }
                            case "application_status":
                            case "excursion_status": {
                                let status_type;
                                if (key == "application_status") {
                                    status_type = this.application_status_list;
                                }
                                else {
                                    status_type = this.excursion_status_list;
                                }
                                status_type.forEach((status, status_key) => {
                                    const option = document.createElement("option");
                                    option.innerText = status;
                                    option.value = status_key;
                                    if (status_key == key)
                                        option.selected = true;
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
                        row_cell.type = this.cellDOMAndTypes[i][1];
                        row_cell.value = value;
                    }
                    i++;
                    table_data.append(row_cell);
                    table_row.append(table_data);
                });
                this.tableDiv.append(table_row);
                this.tableRowArray.push(table_row);
            });
        };
        this.clean = () => {
            this.tableDiv.innerHTML = "";
        };
        this.getApplications = async () => {
            const url_get_applications = "http://91.122.215.194:8080/api/get_applications";
            try {
                const response = await fetch(url_get_applications);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }
                const result = await response.json();
                result.forEach((value) => {
                    this.applications.push(new Map(Object.entries(value)));
                });
            }
            catch (error) {
                console.error(error);
            }
        };
    }
}
async function setupUI(calendar, table) {
    await table.setup();
    table.create();
    calendar.create();
}
function createUI(calendar, table) {
    table.create();
    calendar.create();
}
function deleteUI(calendar, table) {
    calendar.clean();
    table.clean();
}
const calendar = new CalendarUI();
const table = new TableUI();
setupUI(calendar, table);
//# sourceMappingURL=admin_page.js.map