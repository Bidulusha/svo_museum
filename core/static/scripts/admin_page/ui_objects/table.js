export class TableUI {
    constructor() {
        this.headers = [
            "Дата посещения", "Время посещения",
            "Организация", "Высшая школа", "Курс",
            "Группа", "Количество посетителей", "ФИО сопровождающего",
            "Телефонный номер сопровождающего", "Статус заявки", "Статус экскурсии",
            "Обратная связь", "Реальное количество участников"
        ];
        this.applications = [];
        this.tableDiv = document.querySelector(".table");
        this.create = () => {
            const table_headers_row = document.createElement("tr");
            for (let header of this.headers) {
                const table_head = document.createElement("th");
                table_head.innerText = header;
                table_headers_row.append(table_head);
            }
            this.tableDiv.append(table_headers_row);
            for (const application of this.applications) {
                this.addRow(application);
            }
        };
        this.clean = () => {
            this.tableDiv.innerHTML = "";
        };
        this.addRow = (application) => {
            const table_row = document.createElement("tr");
            for (const field of application.getTableDataType()) {
                const table_data = document.createElement("td");
                const element_in_cell = document.createElement(field.element);
                const keys = Object.keys(field.option);
                const values = Object.values(field.option);
                for (let i = 0; i < keys.length; i++) {
                    const option = document.createElement("option");
                    option.value = keys[i];
                    option.innerText = values[i];
                    if (option.value == field.value)
                        option.selected = true;
                    element_in_cell.append(option);
                }
                if (keys.length == 0) {
                    element_in_cell.value = field.value;
                    try {
                        element_in_cell.type = field.type;
                    }
                    catch (_) { }
                    ;
                }
                table_data.append(element_in_cell);
                table_row.append(table_data);
            }
            this.tableDiv.append(table_row);
        };
    }
    setApplications(applications) {
        this.applications = applications;
    }
}
//# sourceMappingURL=table.js.map