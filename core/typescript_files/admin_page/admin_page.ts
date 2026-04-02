import { CalendarUI } from "/static/scripts/admin_page/ui_objects/calendar.js";
import { TableUI } from "/static/scripts/admin_page/ui_objects/table.js";
import { Application } from "/static/scripts/admin_page/objects/application.js";
import { API_URL } from "/static/scripts/admin_page/constants.js";
import {
  ArrayQueue,
  ConstantBackoff,
  Websocket,
  WebsocketBuilder,
  WebsocketEvent,
} from "/static/scripts/admin_page/websocket-ts.js";

console.log(ArrayQueue);

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
            //console.log(applications);
            return applications;
        } catch(error) {
            console.error(error)
            return [];
        }
    }

const calendar: CalendarUI = new CalendarUI();
const table: TableUI = new TableUI();

getApplications(API_URL).then(applications => {
    table.setApplications(applications);
    for(const application of applications) {
        table.addRow(application);
        calendar.addNoteToDate("Экускурсия", application.date, application);
    }
});


table.create();
calendar.create();

