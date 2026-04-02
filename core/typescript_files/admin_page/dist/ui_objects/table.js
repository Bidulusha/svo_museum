define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TableUI = void 0;
    // namespace PageUI{
    //Table UI
    class TableUI {
        constructor() {
            //Const string massives
            this.headers = [
                "Дата посещения", "Время посещения",
                "Организация", "Высшая школа", "Курс",
                "Группа", "Количество посетителей", "ФИО сопровождающего",
                "Телефонный номер сопровождающего", "Статус заявки", "Статус экскурсии",
                "Обратная связь", "Реальное количество участников"
            ];
            this.cellDOMAndTypes = [
                ["input", "date"], //date
                ["input", "time"], //time
                ["input", "text"], //organization
                ["select", "higher_school"], //higher school
                ["input", "text"], //course
                ["input", "text"], //group
                ["input", "nubmer"], //count of customers
                ["input", "text"], //name of accompanying
                ["input", "text"], //phone number of accompanying
                ["select", "application_status"], //application status
                ["select", "excursion_status"], //excursion status
                ["input", "text"], //feedback
                ["input", "nubmer"] //real count of visitors
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
            //Applications 
            this.applications = [];
            //Elements
            this.tableDiv = document.querySelector(".table");
            this.tableRowArray = [];
            this.setup = async () => {
                await this.getApplications();
            };
            // Create UI on page
            this.create = () => {
                if (this.tableRowArray.length > 0 && this.tableDiv.innerHTML === "") {
                    for (let tableRow in this.tableRowArray) {
                        this.tableDiv.append(tableRow);
                    }
                    return;
                }
                let table_headers_row = document.createElement("tr");
                for (let header of this.headers) { // ADD CLASSES FOR SORTING
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
            // get applications from api
            this.getApplications = async () => {
                const url_get_applications = "http://localhost:8080/api/get_applications";
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
    exports.TableUI = TableUI;
});
// }
