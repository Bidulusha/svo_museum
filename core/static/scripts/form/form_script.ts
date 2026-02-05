abstract class FormInterface{
    abstract divsToAppend: HTMLDivElement[];
}

abstract class FormManager{
    abstract formInterface: FormInterface;
    abstract formElement: HTMLElement;

    abstract isShowed: Boolean;

    abstract show: () => void;
    abstract remove: () => void;
}

/*                              NARFU FORM                              */
//Interface
class NarfuFormInterface implements FormInterface{
    divsToAppend: HTMLDivElement[] = [];

    //Higher school
    higherSchoolDiv: HTMLDivElement = document.createElement("div");
    higherSchoolLabel: HTMLLabelElement = document.createElement("label");
    higherSchoolSelect: HTMLSelectElement = document.createElement("select");
    higherSchoolOptionMassive: string[] = 
        [
            "Выберите высшую школу",
            "ВШИТАС", "ВИШ", "ВШСГНиМК", "ВШЭНиГ", 
            "ВШППиФК", "ВШЭУиП", "ВШЕНиТ", "ВШРиМТ", 
            "ТК Императора Петра I", "ГумИн", "ИСМАРТ", 
            "ТК (Северодвинск)"
        ]

    //Course
    courseDiv: HTMLDivElement = document.createElement("div");
    courseLabel: HTMLLabelElement = document.createElement("label");
    courseInput: HTMLInputElement = document.createElement("input");

    //group
    groupDiv: HTMLDivElement = document.createElement("div");
    groupLabel: HTMLLabelElement = document.createElement("label");
    groupInput: HTMLInputElement = document.createElement("input");
    
    constructor(){
        /*                  Higher school               */
        //label
        this.higherSchoolLabel.textContent = "Высшая школа";
        //select
        this.higherSchoolSelect.name = "higher_school";
        this.higherSchoolSelect.required = true;
        for(var i = 0; i < this.higherSchoolOptionMassive.length; i++){
            let option = document.createElement("option");
            option.text = this.higherSchoolOptionMassive[i];
            option.value = "higher_school_" + i;
            if (i === 0) {
                option.disabled = true;
                option.selected = true;
            }
            this.higherSchoolSelect.appendChild(option);
        }
        //build div
        this.higherSchoolLabel.appendChild(this.higherSchoolSelect);
        this.higherSchoolDiv.appendChild(this.higherSchoolLabel);

        /*                  Course                      */
        //label
        this.courseLabel.textContent = "Курс";
        //input
        this.courseInput.type = "number";
        this.courseInput.min = "1";
        this.courseInput.max = "6";
        this.courseInput.name = "course";
        this.courseInput.value = "1";
        this.courseInput.required = true;
        //build div
        this.courseLabel.appendChild(this.courseInput);
        this.courseDiv.appendChild(this.courseLabel);

        /*                  Group                       */
        //label
        this.groupLabel.textContent = "Группа";
        //input
        this.groupInput.type = "number";
        this.groupInput.name = "group";
        this.groupInput.required = true;
        //build div
        this.groupLabel.appendChild(this.groupInput);
        this.groupDiv.appendChild(this.groupLabel);

        /*                  Append block                */
        this.divsToAppend.push(this.groupDiv);
        this.divsToAppend.push(this.courseDiv);
        this.divsToAppend.push(this.higherSchoolDiv);
    }
}
//Manager
class NarfuFormManager implements FormManager{
    formInterface: NarfuFormInterface = new NarfuFormInterface();

    isShowed: Boolean = false;

    formElement: HTMLElement;
    organizationDiv: HTMLDivElement;

    constructor(form: HTMLElement, orgDiv: HTMLElement){
        this.organizationDiv = orgDiv as HTMLDivElement;
        this.formElement = form;
    }

    show = () => {
        
        if (!this.isShowed){  
            this.isShowed = true;      
            for(var i = 0; i < this.formInterface.divsToAppend.length; i++){
                this.organizationDiv.after(this.formInterface.divsToAppend[i]);
            }
        }
    }
    remove = () => {
        if (this.isShowed){
            this.isShowed = false;
            for(var i = 0; i < this.formInterface.divsToAppend.length; i++){
                this.formElement.removeChild(this.formInterface.divsToAppend[i]);
            }
        }
    }

}



/*                              ANOTHER FORM                                */
//Interface
class AnotherFormInterface implements FormInterface{
    divsToAppend: HTMLDivElement[] = [];

    organizationNameDiv: HTMLDivElement = document.createElement("div");
    organizationNameLabel: HTMLLabelElement = document.createElement("label");
    organizationNameInput: HTMLInputElement = document.createElement("input");

    constructor(){
        /*              OrgName                     */
        //label
        this.organizationNameLabel.textContent = "Название организации";
        //input
        this.organizationNameInput.name = "organization_name";
        this.organizationNameInput.type = "text";
        this.organizationNameInput.required = true;
        //build div
        this.organizationNameLabel.appendChild(this.organizationNameInput);
        this.organizationNameDiv.appendChild(this.organizationNameLabel);

        /*              DIVS TO APPEND              */
        this.divsToAppend.push(this.organizationNameDiv);
    }
}

//Manager
class AnotherFormManager implements FormManager {
    formInterface: AnotherFormInterface = new AnotherFormInterface();

    isShowed: Boolean = false;

    formElement: HTMLElement;
    organizationDiv: HTMLDivElement;

    constructor(form: HTMLElement, orgDiv: HTMLElement){
        this.organizationDiv = orgDiv as HTMLDivElement;
        this.formElement = form;
    }

    show = () => {
        if (!this.isShowed){  
            this.isShowed = true;      
            for(var i = 0; i < this.formInterface.divsToAppend.length; i++){
                this.organizationDiv.after(this.formInterface.divsToAppend[i]);
            }
        }
    }
    remove = () => {
        if (this.isShowed){
            this.isShowed = false;
            for(var i = 0; i < this.formInterface.divsToAppend.length; i++){
                this.formElement.removeChild(this.formInterface.divsToAppend[i]);
            }
        }
    }
}

/*                              Checker                                     */
class OrganizationSelectManager{
    organizationSelect: HTMLSelectElement;

    narfuFormManager: NarfuFormManager;
    anotherFormManager: AnotherFormManager;
    
    constructor(orgSelect: HTMLElement, formElement: HTMLElement){
        this.organizationSelect = orgSelect as HTMLSelectElement;

        this.narfuFormManager = new NarfuFormManager(formElement, orgSelect.parentElement?.parentElement!);
        this.anotherFormManager = new AnotherFormManager(formElement, orgSelect.parentElement?.parentElement!)

        this.organizationSelect.onchange = this.onChangeSelect;
    }

    onChangeSelect = (event: Event) => {
        switch(this.organizationSelect.selectedIndex) {
            case 1:
                this.narfuFormManager.show();
                this.anotherFormManager.remove();
                break;
            case 2:
                this.anotherFormManager.show();
                this.narfuFormManager.remove();
                break;
            default:
                console.log(this.organizationSelect.selectedIndex);
                break;
        }
    }
}

let manager = new OrganizationSelectManager(
    document.getElementById("organization-select")!,
    document.getElementById("application-form")!
)