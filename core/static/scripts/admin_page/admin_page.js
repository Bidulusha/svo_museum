import { CalendarUI } from "/static/scripts/admin_page/ui_objects/calendar.js";
import { TableUI } from "/static/scripts/admin_page/ui_objects/table.js";
async function setupUI(calendar, table) {
    try {
        await table.setup("http://localhost:8080/api/get_applications");
    }
    catch (error) {
        console.error(error);
    }
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