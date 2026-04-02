export enum ApplicationStatus {
    SUBMITTED = "Принята",
    NEEDSEDITING = "Нужно отредактировать",
    ACCEPTED = "Принята"
}

export enum ExcursionStatus {
    WAITING = "Ожидает подтвержения",
    ACCEPTED = "Принята",
    MOVED = "Перенесена",
    CANCELLED = "Отменена",
    SUCCEED = "Прошла"
}

export enum HigherSchool {
    higher_school_0 = "-",
    higher_school_1 = "ВШИТАС",
    higher_school_2 = "ВИШ",
    higher_school_3 = "ВШСГНиМК",
    higher_school_4 = "ВШЭНиГ",
    higher_school_5 = "ВШППиФК",
    higher_school_6 = "ВШЭУиП",
    higher_school_7 = "ВШЕНиТ",
    higher_school_8 = "ВШРиМТ",
    higher_school_9 = "ТК Императора Петра I",
    higher_school_10 = "ГумИн",
    higher_school_11 = "ИСМАРТ",
    higher_school_12 = "ТК (Северодвинск)",
}

export class TableDataType {
    private _value: any;
    private _element: string;  // "input" или "select"
    private _type: string;     // тип данных: "date", "time", "string", "number"
    private _option: object;

    get value(): any { return this._value; }
    get element(): string { return this._element; }
    get type(): string{ return this._type; }
    get option(): object { return this._option; }

    constructor(value: any, element: string, type: string, option: object){
        this._value = value;
        this._element = element;
        this._type = type;
        this._option = option;
    }
}

export class Application {
    private visit_date: Date;
    private visit_time: string;
    private organization: string;
    private higher_school: HigherSchool;
    private course: number;
    private group_of: number;
    private count_of_customers: number;
    private name_of_accompanying: string;
    private phone_number_of_accompanying: string;
    private application_status: ApplicationStatus;  
    private excursion_status: ExcursionStatus;
    private feedback: string;
    private real_count_of_customers: number;

    constructor() {}

    //Date
    get date (): Date { return new Date(this.visit_date); }
    get dateString(): string { return (new Date(this.visit_date)).toISOString().slice(0, 10); }   

    //Time
    get time (): string {return this.visit_time.slice(0,5);}

    getTableDataType = (): TableDataType[] => {
        const formattedTime = this.visit_time.slice(0,5);

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
            new TableDataType(this.application_status, "select", "enum", ApplicationStatus ),
            new TableDataType(this.excursion_status, "select", "enum", ExcursionStatus ),
            new TableDataType(this.feedback, "textarea", "string", {}),
            new TableDataType(this.real_count_of_customers > 0? this.real_count_of_customers: "", "input", "number", {})
        ];
    }
}