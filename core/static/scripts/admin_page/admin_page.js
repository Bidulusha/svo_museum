import { CalendarUI } from "/static/scripts/admin_page/ui_objects/calendar.js";
import { TableUI } from "/static/scripts/admin_page/ui_objects/table.js";
import { Application } from "/static/scripts/admin_page/objects/application.js";
import { API_URL } from "/static/scripts/admin_page/constants.js";
import { ArrayQueue, } from "/static/scripts/admin_page/websocket-ts.js";
console.log(ArrayQueue);
async function getApplications(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        const applications = [];
        result.forEach((value) => {
            applications.push(Object.assign(new Application(), value));
        });
        return applications;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
const calendar = new CalendarUI();
const table = new TableUI();
getApplications(API_URL).then(applications => {
    table.setApplications(applications);
    for (const application of applications) {
        table.addRow(application);
        calendar.addNoteToDate("Экускурсия", application.date, application);
    }
});
table.create();
calendar.create();
//# sourceMappingURL=admin_page.js.map