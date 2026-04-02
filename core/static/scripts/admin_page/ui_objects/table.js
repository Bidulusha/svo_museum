export class TableUI {
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
        this.setup = async (url) => {
            await this.getApplications(url);
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
                    console.log(value, typeof value);
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
        this.getApplications = async (url) => {
            try {
                const response = await fetch(url);
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
//# sourceMappingURL=table.js.map