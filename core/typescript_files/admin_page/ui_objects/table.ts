import { objectUI } from "/static/scripts/admin_page/ui_objects/interface.js";
import { Application, HigherSchool } from "/static/scripts/admin_page/objects/application.js";

//Table UI
export class TableUI implements objectUI {
    //Const string massives
    private headers: string[] = [
        "Дата посещения","Время посещения", 
        "Организация", "Высшая школа", "Курс", 
        "Группа", "Количество посетителей", "ФИО сопровождающего", 
        "Телефонный номер сопровождающего", "Статус заявки", "Статус экскурсии",
        "Обратная связь", "Реальное количество участников"
    ];

    //Applications 
    private applications: Application[] = [];

    //Elements
    private tableDiv: HTMLDivElement = document.querySelector(".table")!;

    constructor() {
        
    }

    setApplications(applications: Application[]){
        this.applications = applications;
    }

    // Create UI on page
    create = () => {
        const table_headers_row = document.createElement("tr");
        for (let header of this.headers){ // ADD CLASSES FOR SORTING
            const table_head = document.createElement("th");
            table_head.innerText = header;
            table_headers_row.append(table_head);
        }
        this.tableDiv.append(table_headers_row);

        for (const application of this.applications){
            this.addRow(application);
        }
    }

    clean = () => {
        this.tableDiv.innerHTML = "";
    }

    // Add row
    addRow = (application: Application) => {
        const table_row = document.createElement("tr");
        for (const field of application.getTableDataType()){
            const table_data = document.createElement("td");
            const element_in_cell: HTMLElement = document.createElement(field.element);

            const keys = Object.keys(field.option);
            const values = Object.values(field.option);

            for (let i = 0; i < keys.length; i++){
                const option = document.createElement("option");

                option.value = keys[i];
                option.innerText = values[i];
                if (option.value == field.value) option.selected = true;
                
                element_in_cell.append(option);           
            }
            if (keys.length == 0) {
                (element_in_cell as HTMLInputElement).value = field.value;
                try{
                    (element_in_cell as HTMLInputElement).type = field.type;
                } catch (_) {};
            }

            table_data.append(element_in_cell);
            table_row.append(table_data);
        }
        this.tableDiv.append(table_row);
    }
}