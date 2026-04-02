export var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["SUBMITTED"] = "\u041F\u0440\u0438\u043D\u044F\u0442\u0430";
    ApplicationStatus["NEEDSEDITING"] = "\u041D\u0443\u0436\u043D\u043E \u043E\u0442\u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C";
    ApplicationStatus["ACCEPTED"] = "\u041F\u0440\u0438\u043D\u044F\u0442\u0430";
})(ApplicationStatus || (ApplicationStatus = {}));
export var ExcursionStatus;
(function (ExcursionStatus) {
    ExcursionStatus["WAITING"] = "\u041E\u0436\u0438\u0434\u0430\u0435\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0435\u043D\u0438\u044F";
    ExcursionStatus["ACCEPTED"] = "\u041F\u0440\u0438\u043D\u044F\u0442\u0430";
    ExcursionStatus["MOVED"] = "\u041F\u0435\u0440\u0435\u043D\u0435\u0441\u0435\u043D\u0430";
    ExcursionStatus["CANCELLED"] = "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u0430";
    ExcursionStatus["SUCCEED"] = "\u041F\u0440\u043E\u0448\u043B\u0430";
})(ExcursionStatus || (ExcursionStatus = {}));
export var HigherSchool;
(function (HigherSchool) {
    HigherSchool["higher_school_0"] = "-";
    HigherSchool["higher_school_1"] = "\u0412\u0428\u0418\u0422\u0410\u0421";
    HigherSchool["higher_school_2"] = "\u0412\u0418\u0428";
    HigherSchool["higher_school_3"] = "\u0412\u0428\u0421\u0413\u041D\u0438\u041C\u041A";
    HigherSchool["higher_school_4"] = "\u0412\u0428\u042D\u041D\u0438\u0413";
    HigherSchool["higher_school_5"] = "\u0412\u0428\u041F\u041F\u0438\u0424\u041A";
    HigherSchool["higher_school_6"] = "\u0412\u0428\u042D\u0423\u0438\u041F";
    HigherSchool["higher_school_7"] = "\u0412\u0428\u0415\u041D\u0438\u0422";
    HigherSchool["higher_school_8"] = "\u0412\u0428\u0420\u0438\u041C\u0422";
    HigherSchool["higher_school_9"] = "\u0422\u041A \u0418\u043C\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u041F\u0435\u0442\u0440\u0430 I";
    HigherSchool["higher_school_10"] = "\u0413\u0443\u043C\u0418\u043D";
    HigherSchool["higher_school_11"] = "\u0418\u0421\u041C\u0410\u0420\u0422";
    HigherSchool["higher_school_12"] = "\u0422\u041A (\u0421\u0435\u0432\u0435\u0440\u043E\u0434\u0432\u0438\u043D\u0441\u043A)";
})(HigherSchool || (HigherSchool = {}));
export class TableDataType {
    get value() { return this._value; }
    get element() { return this._element; }
    get type() { return this._type; }
    get option() { return this._option; }
    constructor(value, element, type, option) {
        this._value = value;
        this._element = element;
        this._type = type;
        this._option = option;
    }
}
export class Application {
    constructor() {
        this.getTableDataType = () => {
            const formattedTime = this.visit_time.slice(0, 5);
            return [
                new TableDataType(this.visit_date, "input", "date", {}),
                new TableDataType(formattedTime, "input", "time", {}),
                new TableDataType(this.organization, "input", "string", {}),
                new TableDataType(this.higher_school, "select", "enum", HigherSchool),
                new TableDataType(this.course, "input", "number", {}),
                new TableDataType(this.group_of, "input", "number", {}),
                new TableDataType(this.count_of_customers, "input", "number", {}),
                new TableDataType(this.name_of_accompanying, "input", "string", {}),
                new TableDataType(this.phone_number_of_accompanying, "input", "string", {}),
                new TableDataType(this.application_status, "select", "enum", ApplicationStatus),
                new TableDataType(this.excursion_status, "select", "enum", ExcursionStatus),
                new TableDataType(this.feedback, "textarea", "string", {}),
                new TableDataType(this.real_count_of_customers > 0 ? this.real_count_of_customers : "", "input", "number", {})
            ];
        };
    }
    get date() { return new Date(this.visit_date); }
    get dateString() { return (new Date(this.visit_date)).toISOString().slice(0, 10); }
    get time() { return this.visit_time.slice(0, 5); }
}
//# sourceMappingURL=application.js.map