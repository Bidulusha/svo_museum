import { CalendarUI } from "/static/scripts/admin_page/ui_objects/calendar.js";
import { TableUI } from "/static/scripts/admin_page/ui_objects/table.js";

async function setupUI(calendar: CalendarUI, table: TableUI) {
    try {
        await table.setup("http://localhost:8080/api/get_applications");
    } catch(error){
        console.error(error);
    }
    
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

