import { objectUI } from "/static/scripts/admin_page/ui_objects/interface.js";

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

    setup = async (url: string) => {
        await this.getApplications(url);
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
                console.log(value, typeof value);
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
    private getApplications = async(url: string) =>{
        try {
            const response = await fetch(url);
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