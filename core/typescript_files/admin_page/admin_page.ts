// UI
import { CalendarUI } from "./ui_objects/calendar";
import { TableUI } from "./ui_objects/table";
// Applications
import { Application } from "./objects/application";
// Websocket
import { WebsocketManager } from "./websocket_manager";
// Constants
import { API_URL } from "./constants";


async function getApplications (url: string) : Promise<Application[]> {
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        const applications: Application[] = [];
        result.forEach((value: object) => {
            applications.push(Object.assign(new Application(), value));
        });
        return applications;
    } catch(error) {
        console.error(error)
        return [];
    }
}

const calendar: CalendarUI = new CalendarUI();
const table: TableUI = new TableUI();
const ws_manager: WebsocketManager = new WebsocketManager();

getApplications(API_URL).then(applications => {
    table.setApplications(applications);
    for(const application of applications) {
        table.addRow(application);
        calendar.addNoteToDate("Экускурсия", application.date, application);
    }
});


table.create();
calendar.create();

