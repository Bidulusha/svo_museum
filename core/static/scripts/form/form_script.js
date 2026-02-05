var FormInterface = /** @class */ (function () {
    function FormInterface() {
    }
    return FormInterface;
}());
var FormManager = /** @class */ (function () {
    function FormManager() {
    }
    return FormManager;
}());
/*                              NARFU FORM                              */
//Interface
var NarfuFormInterface = /** @class */ (function () {
    function NarfuFormInterface() {
        this.divsToAppend = [];
        //Higher school
        this.higherSchoolDiv = document.createElement("div");
        this.higherSchoolLabel = document.createElement("label");
        this.higherSchoolSelect = document.createElement("select");
        this.higherSchoolOptionMassive = [
            "Выберите высшую школу",
            "ВШИТАС", "ВИШ", "ВШСГНиМК", "ВШЭНиГ",
            "ВШППиФК", "ВШЭУиП", "ВШЕНиТ", "ВШРиМТ",
            "ТК Императора Петра I", "ГумИн", "ИСМАРТ",
            "ТК (Северодвинск)"
        ];
        //Course
        this.courseDiv = document.createElement("div");
        this.courseLabel = document.createElement("label");
        this.courseInput = document.createElement("input");
        //group
        this.groupDiv = document.createElement("div");
        this.groupLabel = document.createElement("label");
        this.groupInput = document.createElement("input");
        /*                  Higher school               */
        //label
        this.higherSchoolLabel.textContent = "Высшая школа";
        //select
        this.higherSchoolSelect.name = "higher_school";
        this.higherSchoolSelect.required = true;
        for (var i = 0; i < this.higherSchoolOptionMassive.length; i++) {
            var option = document.createElement("option");
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
    return NarfuFormInterface;
}());
//Manager
var NarfuFormManager = /** @class */ (function () {
    function NarfuFormManager(form, orgDiv) {
        var _this = this;
        this.formInterface = new NarfuFormInterface();
        this.isShowed = false;
        this.show = function () {
            if (!_this.isShowed) {
                _this.isShowed = true;
                for (var i = 0; i < _this.formInterface.divsToAppend.length; i++) {
                    _this.organizationDiv.after(_this.formInterface.divsToAppend[i]);
                }
            }
        };
        this.remove = function () {
            if (_this.isShowed) {
                _this.isShowed = false;
                for (var i = 0; i < _this.formInterface.divsToAppend.length; i++) {
                    _this.formElement.removeChild(_this.formInterface.divsToAppend[i]);
                }
            }
        };
        this.organizationDiv = orgDiv;
        this.formElement = form;
    }
    return NarfuFormManager;
}());
/*                              ANOTHER FORM                                */
//Interface
var AnotherFormInterface = /** @class */ (function () {
    function AnotherFormInterface() {
        this.divsToAppend = [];
        this.organizationNameDiv = document.createElement("div");
        this.organizationNameLabel = document.createElement("label");
        this.organizationNameInput = document.createElement("input");
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
    return AnotherFormInterface;
}());
//Manager
var AnotherFormManager = /** @class */ (function () {
    function AnotherFormManager(form, orgDiv) {
        var _this = this;
        this.formInterface = new AnotherFormInterface();
        this.isShowed = false;
        this.show = function () {
            if (!_this.isShowed) {
                _this.isShowed = true;
                for (var i = 0; i < _this.formInterface.divsToAppend.length; i++) {
                    _this.organizationDiv.after(_this.formInterface.divsToAppend[i]);
                }
            }
        };
        this.remove = function () {
            if (_this.isShowed) {
                _this.isShowed = false;
                for (var i = 0; i < _this.formInterface.divsToAppend.length; i++) {
                    _this.formElement.removeChild(_this.formInterface.divsToAppend[i]);
                }
            }
        };
        this.organizationDiv = orgDiv;
        this.formElement = form;
    }
    return AnotherFormManager;
}());
/*                              Checker                                     */
var OrganizationSelectManager = /** @class */ (function () {
    function OrganizationSelectManager(orgSelect, formElement) {
        var _this = this;
        var _a, _b;
        this.onChangeSelect = function (event) {
            switch (_this.organizationSelect.selectedIndex) {
                case 1:
                    _this.narfuFormManager.show();
                    _this.anotherFormManager.remove();
                    break;
                case 2:
                    _this.anotherFormManager.show();
                    _this.narfuFormManager.remove();
                    break;
                default:
                    console.log(_this.organizationSelect.selectedIndex);
                    break;
            }
        };
        this.organizationSelect = orgSelect;
        this.narfuFormManager = new NarfuFormManager(formElement, (_a = orgSelect.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement);
        this.anotherFormManager = new AnotherFormManager(formElement, (_b = orgSelect.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement);
        this.organizationSelect.onchange = this.onChangeSelect;
    }
    return OrganizationSelectManager;
}());
var manager = new OrganizationSelectManager(document.getElementById("organization-select"), document.getElementById("application-form"));
