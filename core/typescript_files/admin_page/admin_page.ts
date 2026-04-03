// UI
import { CalendarUI } from "./ui_objects/calendar";
import { TableUI } from "./ui_objects/table";
// Applications
import { Application, getApplications } from "./objects/application";
// Websocket
import { WebsocketManager } from "./api/websocket_manager";
// Constants
import { API_URL } from "./constants";
import { Websocket } from "websocket-ts";


const calendar: CalendarUI = new CalendarUI();
const table: TableUI = new TableUI();
const ws_manager: WebsocketManager = new WebsocketManager();

ws_manager.setupListeners((i: Websocket, ev: MessageEvent) => {
    console.log(`received message:\n>>> ${ev.data}`);
    try {
        const result: object = JSON.parse(ev.data);
        const application: Application = Object.assign(new Application (), result);

        console.log("New application!");
        alert("Новая заявка!");
        table.addRow(application);
        calendar.addNoteToDate("Экускурсия", application.date, application);
    } catch (_) { }
    i.send("get, thx");
});

getApplications(API_URL).then(applications => {
    table.setApplications(applications);
    for(const application of applications) {
        table.addRow(application);
        calendar.addNoteToDate("Экускурсия", application.date, application);
    }
});


table.create();
calendar.create();

