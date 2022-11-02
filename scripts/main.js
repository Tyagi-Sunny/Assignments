var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var role;
(function (role) {
    role[role["SuperAdmin"] = 0] = "SuperAdmin";
    role[role["Admin"] = 1] = "Admin";
    role[role["Subscriber"] = 2] = "Subscriber";
})(role || (role = {}));
function getDate(_date) {
    return function (target) {
        target.date =
            "Today's Date is " +
                _date.getDay() +
                "-" +
                _date.getMonth() +
                "-" +
                _date.getFullYear() +
                " and Time is " +
                _date.getHours() +
                ":" +
                _date.getMinutes();
    };
}
let userDataTable = class userDataTable {
    constructor() { }
    set dataSetter(_data) {
        this.data = _data;
    }
    loadData() {
        const table = document.getElementById("dataTable");
        let rowCount = table.rows.length;
        for (let employeeData of this.data) {
            let row = table.insertRow(rowCount);
            let cellNum = 0;
            for (let colName in employeeData) {
                let newCell = row.insertCell(cellNum);
                if (cellNum != 7) {
                    newCell.innerHTML = `<p class="info-row-${row.rowIndex}">${colName == "role"
                        ? role[employeeData["role"]]
                        : employeeData[colName]}</p><br>
      <input type="text" class=\"edit-info-row-${row.rowIndex}\" name=\"${colName}\" style="display:none" value=\"${colName == "role"
                        ? role[employeeData["role"]]
                        : employeeData[colName]}\">`;
                }
                else {
                    newCell.innerHTML = ` 
                              <div id=\"normal-action-${row.rowIndex}\">
                                  <button id=\"del-row-${employeeData[colName]}\" onclick=\"obj.deleteRow(${row.rowIndex})\">del</button>
                                  <button id=\"edit-row-${employeeData[colName]}\" onclick=\"obj.editRow(${row.rowIndex})\">edit</button>
                              </div>
                              <div id=\"edit-action-${row.rowIndex}\" style=\"display:none\">
                                  <button id=\"save-row-${employeeData[colName]}\" onclick=\"obj.save(${row.rowIndex})\">save</button>
                                  <button id=\"cancel-row-${employeeData[colName]}\" onclick=\"obj.cancel(${row.rowIndex})\">cancel</button>
                              </div>
                              `;
                }
                cellNum++;
            }
            rowCount++;
        }
        document.getElementById("load").style.display = "none";
        document.getElementById("refresh").style.display = "inline";
    }
    deleteRow(rowNum) {
        this.data = [
            ...this.data.slice(0, Number(rowNum) - 1),
            ...this.data.slice(Number(rowNum)),
        ];
        this.refreshData();
    }
    editRow(rowNum) {
        let { editableRowInput, staticCellData, editActionButtons, normalActionButtons, } = this.getEditActions(rowNum);
        this.changeBetweenInputAndPlainText(editableRowInput, staticCellData, editActionButtons, normalActionButtons);
    }
    getEditActions(id) {
        let editableRowInput = document.getElementsByClassName(`edit-info-row-${id}`);
        let staticCellData = document.getElementsByClassName(`info-row-${id}`);
        let editActionButtons = document.getElementById(`edit-action-${id}`);
        let normalActionButtons = document.getElementById(`normal-action-${id}`);
        return {
            editableRowInput,
            staticCellData,
            editActionButtons,
            normalActionButtons,
        };
    }
    changeBetweenInputAndPlainText(editableRowInput, staticCellData, editActionButtons, normalActionButtons) {
        Array.from(editableRowInput).forEach((input) => {
            input.style.display = "inline";
        });
        Array.from(staticCellData).forEach((input) => {
            input.style.display = "none";
        });
        editActionButtons.style.display = "inline";
        normalActionButtons.style.display = "none";
    }
    save(rowNum) {
        let editableRowInput = document.getElementsByClassName(`edit-info-row-${rowNum}`);
        Array.from(editableRowInput).forEach((input) => {
            let value = input.value;
            input.name == "role"
                ? (this.data[Number(rowNum) - 1][input.name] = role[value])
                : (this.data[Number(rowNum) - 1][input.name] = value);
        });
        this.refreshData();
    }
    cancel(rowNum) {
        let { editableRowInput, staticCellData, editActionButtons, normalActionButtons, } = this.getEditActions(rowNum);
        this.changeBetweenInputAndPlainText(staticCellData, editableRowInput, normalActionButtons, editActionButtons);
    }
    refreshData() {
        const table = document.getElementById("dataTable");
        while (table.rows.length !== 1) {
            table.deleteRow(1);
        }
        this.loadData();
    }
};
userDataTable = __decorate([
    getDate(new Date())
], userDataTable);
let obj = new userDataTable();
fetch("../data.json")
    .then((res) => res.json())
    .then((data) => {
    obj.dataSetter = data;
});
console.log(userDataTable.date);
