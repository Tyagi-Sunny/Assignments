enum role {
  "SuperAdmin",
  "Admin",
  "Subscriber",
}

interface CRUD<T, R> {
  data: T[];
  loadData: () => void;
  deleteRow: (rowNum: R) => void;
  save: (rowNum: R) => void;
  cancel: (rowNum: R) => void;
  editRow: (rowNum: R) => void;
  refreshData: () => void;
}

function getDate(_date: Date) {
  return function (target: Function & typeof userDataTable) {
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

@getDate(new Date())
class userDataTable<T, R> implements CRUD<T, R> {
  static date: string;
  data: T[];
  constructor() {}

  public set dataSetter(_data: T[]) {
    this.data = _data;
  }

  loadData(): void {
    const table = document.getElementById(
      "dataTable"
    ) as HTMLTableElement | null;
    let rowCount = table.rows.length;
    for (let employeeData of this.data) {
      let row = table.insertRow(rowCount);
      let cellNum = 0;
      for (let colName in employeeData) {
        let newCell = row.insertCell(cellNum);
        if (cellNum != 7) {
          newCell.innerHTML = `<p class="info-row-${row.rowIndex}">${
            colName == "role"
              ? role[employeeData["role"]]
              : employeeData[colName]
          }</p><br>
      <input type="text" class=\"edit-info-row-${
        row.rowIndex
      }\" name=\"${colName}\" style="display:none" value=\"${
            colName == "role"
              ? role[employeeData["role"]]
              : employeeData[colName]
          }\">`;
        } else {
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

  deleteRow(rowNum: R): void {
    this.data = [
      ...this.data.slice(0, Number(rowNum) - 1),
      ...this.data.slice(Number(rowNum)),
    ];
    this.refreshData();
  }

  editRow(rowNum: R): void {
    let {
      editableRowInput,
      staticCellData,
      editActionButtons,
      normalActionButtons,
    } = this.getEditActions(rowNum);
    this.changeBetweenInputAndPlainText(
      editableRowInput,
      staticCellData,
      editActionButtons,
      normalActionButtons
    );
  }

  getEditActions(id: R) {
    let editableRowInput = document.getElementsByClassName(
      `edit-info-row-${id}`
    );
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

  changeBetweenInputAndPlainText(
    editableRowInput,
    staticCellData,
    editActionButtons,
    normalActionButtons
  ) {
    Array.from(editableRowInput).forEach((input: HTMLElement) => {
      input.style.display = "inline";
    });
    Array.from(staticCellData).forEach((input: HTMLElement) => {
      input.style.display = "none";
    });
    editActionButtons.style.display = "inline";
    normalActionButtons.style.display = "none";
  }

  save(rowNum: R): void {
    let editableRowInput = document.getElementsByClassName(
      `edit-info-row-${rowNum}`
    ) as HTMLCollectionOf<HTMLInputElement>;
    Array.from(editableRowInput).forEach((input) => {
      let value = input.value;
      input.name == "role"
        ? (this.data[Number(rowNum) - 1][input.name] = role[value])
        : (this.data[Number(rowNum) - 1][input.name] = value);
    });

    this.refreshData();
  }

  cancel(rowNum: R): void {
    let {
      editableRowInput,
      staticCellData,
      editActionButtons,
      normalActionButtons,
    } = this.getEditActions(rowNum);
    this.changeBetweenInputAndPlainText(
      staticCellData,
      editableRowInput,
      normalActionButtons,
      editActionButtons
    );
  }

  refreshData(): void {
    const table = document.getElementById(
      "dataTable"
    ) as HTMLTableElement | null;
    while (table.rows.length !== 1) {
      table.deleteRow(1);
    }
    this.loadData();
  }
}

let obj = new userDataTable<JSON, number>();
fetch("../data.json")
  .then((res) => res.json())
  .then((data) => {
    obj.dataSetter = data;
  });

console.log(userDataTable.date);
