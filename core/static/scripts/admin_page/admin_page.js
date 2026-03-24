var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var CalendarUI = (function () {
    function CalendarUI() {
        var _this = this;
        this.months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
            'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.currentMonth = this.currentDate.getMonth();
        this.currentDay = this.currentDate.getDate();
        this.calendarDiv = document.querySelector('.calendar');
        this.calendarMonthYearDiv = document.querySelector('.calendar__month-and-year-name');
        this.calendarDayNumbersDiv = document.querySelector('.calendar__day-numbers');
        this.create = function () {
            var week = document.createElement('div');
            week.classList.add('calendar__day-numbers-row');
            var daysInMonth = new Date(_this.currentYear, _this.currentMonth + 1, 0).getDate();
            var firstDay = new Date(_this.currentYear, _this.currentMonth, 1).getDay();
            if (firstDay === 0)
                firstDay = 7;
            for (var i = 1; i < 8; i++) {
                var day = document.createElement('span');
                var dayNumber = document.createElement('p');
                day.classList.add('calendar__day-cell');
                dayNumber.classList.add('calendar__day-number');
                dayNumber.innerText = (new Date(_this.currentYear, _this.currentMonth, +i - firstDay + 1).getDate()).toString();
                (i < firstDay) && dayNumber.classList.add('calendar__day-cell--previous');
                (new Date(_this.currentYear, _this.currentMonth, +i - firstDay + 1).getDay() > 5 ||
                    new Date(_this.currentYear, _this.currentMonth, +i - firstDay + 1).getDay() == 0)
                    && day.classList.add('calendar__day-cell--weekend');
                day.append(dayNumber);
                week.append(day);
            }
            _this.calendarDayNumbersDiv.append(week);
            week = document.createElement('div');
            week.classList.add('calendar__day-numbers-row');
            for (var i = 9 - firstDay; i < daysInMonth + 1; i++) {
                var day = document.createElement('span');
                var dayNumber = document.createElement('p');
                day.classList.add('calendar__day-cell');
                dayNumber.classList.add('calendar__day-number');
                dayNumber.innerText = i.toString();
                (i == _this.currentDay) && day.classList.add('calendar__day-number--current');
                (new Date(_this.currentYear, _this.currentMonth, i).getDay() > 5 ||
                    new Date(_this.currentYear, _this.currentMonth, i).getDay() == 0)
                    && day.classList.add('calendar__day-cell--weekend');
                day.append(dayNumber);
                week.append(day);
                if (new Date(_this.currentYear, _this.currentMonth, i).getDay() == 0 || i == daysInMonth) {
                    if (i == daysInMonth && new Date(_this.currentYear, _this.currentMonth, i).getDay() != 0) {
                        for (var j = 1; j < 8 - new Date(_this.currentYear, _this.currentMonth, i).getDay(); j++) {
                            var day_1 = document.createElement('span');
                            var dayNumber_1 = document.createElement('p');
                            day_1.classList.add('calendar__day-cell');
                            day_1.classList.add('calendar__day-cell--next');
                            dayNumber_1.classList.add('calendar__day-number');
                            dayNumber_1.innerText = j.toString();
                            (new Date(_this.currentYear, _this.currentMonth + 1, j).getDay() > 5 ||
                                new Date(_this.currentYear, _this.currentMonth + 1, j).getDay() == 0)
                                && day_1.classList.add('calendar__day-cell--weekend');
                            day_1.append(dayNumber_1);
                            week.append(day_1);
                        }
                    }
                    _this.calendarDayNumbersDiv.append(week);
                    if (i != daysInMonth) {
                        week = document.createElement('div');
                        week.classList.add('calendar__day-numbers-row');
                    }
                }
            }
        };
        this.clean = function () {
        };
        this.calendarMonthYearDiv.innerText = this.months[this.currentMonth - 1].toString()
            + " " + this.currentYear.toString() + " г.";
    }
    return CalendarUI;
}());
var TableUI = (function () {
    function TableUI() {
        var _this = this;
        this.headers = [
            'Дата посещения', 'Время посещения',
            'Организация', 'Высшая школа', 'Курс',
            'Группа', 'Количество посетителей', 'ФИО сопровождающего',
            'Телефонный номер сопровождающего', 'Стату заявки', 'Статус экскурсии',
            'Обратная связь', 'Реальное количество участников'
        ];
        this.cellDOMAndTypes = [
            ['input', 'date'],
            ['input', 'time'],
            ['input', 'text'],
            ['select', 'higher_school'],
            ['input', 'text'],
            ['input', 'text'],
            ['input', 'nubmer'],
            ['input', 'text'],
            ['input', 'text'],
            ['select', 'application_status'],
            ['select', 'excursion_status'],
            ['input', 'text'],
            ['input', 'nubmer']
        ];
        this.higher_schools = [
            "-",
            "ВШИТАС", "ВИШ", "ВШСГНиМК", "ВШЭНиГ",
            "ВШППиФК", "ВШЭУиП", "ВШЕНиТ", "ВШРиМТ",
            "ТК Императора Петра I", "ГумИн", "ИСМАРТ",
            "ТК (Северодвинск)"
        ];
        this.application_status_list = {
            'SUBMITTED': 'заполнена',
            'NEEDSEDITING': 'нужно отредактировать',
            'ACCEPTED': 'принята'
        };
        this.excursion_status_list = {
            'waiting accepting': 'Ожидает подтверждения',
            'accepted': 'Принята',
            'moved': 'Перенесена',
            'cancelled': 'Отменена',
            'succeed': 'Прошла'
        };
        this.applications = [];
        this.tableDiv = document.querySelector('.table');
        this.tableRowArray = [];
        this.setup = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getApplications()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); };
        this.create = function () {
            if (_this.tableRowArray.length > 0 && _this.tableDiv.innerHTML === '') {
                for (var tableRow in _this.tableRowArray) {
                    _this.tableDiv.append(tableRow);
                }
                return;
            }
            var table_headers_row = document.createElement('tr');
            for (var _i = 0, _a = _this.headers; _i < _a.length; _i++) {
                var header = _a[_i];
                var table_head = document.createElement('th');
                table_head.innerText = header;
                table_headers_row.append(table_head);
            }
            _this.tableDiv.append(table_headers_row);
            for (var _b = 0, _c = _this.applications; _b < _c.length; _b++) {
                var application = _c[_b];
                var table_row = document.createElement('tr');
                var i = 0;
                var _loop_1 = function () {
                    var table_data = document.createElement('td');
                    var row_cell = document.createElement(_this.cellDOMAndTypes[i][0]);
                    if (_this.cellDOMAndTypes[i][0] === 'select') {
                        switch (_this.cellDOMAndTypes[i][1]) {
                            case 'higher_school': {
                                _this.higher_schools.forEach(function (hs, i) {
                                    var option = document.createElement('option');
                                    option.innerText = hs;
                                    if (hs === '-')
                                        option.value = '-';
                                    else
                                        option.value = 'higher_school_' + i;
                                    if (parseInt(application[field].split('_')[2]) === i) {
                                        option.selected = true;
                                    }
                                    row_cell.append(option);
                                });
                                break;
                            }
                            case 'application_status':
                            case 'excursion_status': {
                                var temp = void 0;
                                if (_this.cellDOMAndTypes[i][1] == 'application_status') {
                                    temp = _this.application_status_list;
                                }
                                else {
                                    temp = _this.excursion_status_list;
                                }
                                for (var status in temp) {
                                    var option = document.createElement('option');
                                    option.innerText = temp[status];
                                    option.value = status;
                                    if (status === application[field]) {
                                        option.selected = true;
                                    }
                                    row_cell.append(option);
                                }
                                break;
                            }
                            default: {
                                console.log('Absolute ERROR in switch case!!!!!');
                                break;
                            }
                        }
                    }
                    else {
                        row_cell.type = _this.cellDOMAndTypes[i][1];
                        row_cell.value = application[field];
                    }
                    table_data.append(row_cell);
                    table_row.append(table_data);
                    i++;
                };
                for (var field in application) {
                    _loop_1();
                }
                _this.tableDiv.append(table_row);
                _this.tableRowArray.push(table_row);
            }
        };
        this.clean = function () {
            _this.tableDiv.innerHTML = '';
        };
        this.getApplications = function () { return __awaiter(_this, void 0, void 0, function () {
            var url_get_applications, response, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url_get_applications = 'http://localhost:8080/api/get_applications';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, fetch(url_get_applications)];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Response status: ".concat(response.status));
                        }
                        return [4, response.json()];
                    case 3:
                        result = _a.sent();
                        this.applications = result;
                        return [3, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        }); };
    }
    return TableUI;
}());
function setupUI(calendar, table) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, table.setup()];
                case 1:
                    _a.sent();
                    table.create();
                    calendar.create();
                    return [2];
            }
        });
    });
}
function createUI(calendar, table) {
    table.create();
    calendar.create();
}
function deleteUI(calendar, table) {
    calendar.clean();
    table.clean();
}
var calendar = new CalendarUI();
var table = new TableUI();
setupUI(calendar, table);
//# sourceMappingURL=admin_page.js.map