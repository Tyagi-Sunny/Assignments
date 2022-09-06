import employeeData from "../data.json" assert { type: "json" };
let data = employeeData;

function loadData() {
  const table = document.getElementById("datatable");
  let rowCount = table.rows.length;
  for (let employeeData of data) {
    let row = table.insertRow(rowCount);
    let cellNum = 0;
    for (let property in employeeData) {
      let newCell = row.insertCell(cellNum);
      if (cellNum != 7) {
        newCell.innerHTML = `<p class=\"info-row-${row.rowIndex}\">${employeeData[property]}</p>
                                    <input type="text" class=\"edit-info-row-${row.rowIndex}\" name=\"${property}\" style="display:none" value=\"${employeeData[property]}\">`;
        cellNum += 1;
      } else {
        newCell.innerHTML = `
                              <div id=\"normal-action-${row.rowIndex}\">
                                  <button id=\"del-row-${employeeData[property]}\" onclick=\"window.functionDefinedInModuleScope.deleteRow(${row.rowIndex})\">del</button>
                                  <button id=\"edit-row-${employeeData[property]}\" onclick=\"window.functionDefinedInModuleScope.editRow(${row.rowIndex})\">edit</button>
                              </div>
                              <div id=\"edit-action-${row.rowIndex}\" style=\"display:none\">
                                  <button id=\"save-row-${employeeData[property]}\" onclick=\"window.functionDefinedInModuleScope.save(${row.rowIndex})\">save</button>
                                  <button id=\"cancel-row-${employeeData[property]}\" onclick=\"window.functionDefinedInModuleScope.cancel(${row.rowIndex})\">cancel</button>
                              </div>
                              `;
      }
    }

    rowCount++;
  }
  document.getElementById("reload").style.display = "inline";
  document.getElementById("load").style.display = "none";
}
window.loadData = loadData;

function save(n) {
  let editableRowInput = document.getElementsByClassName(`edit-info-row-${n}`);
  Array.from(editableRowInput).forEach((input) => {
    data[n - 1][input.name] = input.value;
  });
  reloadData();
}

function cancel(id) {
  let {
    editableRowInput,
    staticCellData,
    editActionButtons,
    normalActionButtons,
  } = getEditActions(id);
  changeBetweenInputAndPlainText(
    staticCellData,
    editableRowInput,
    normalActionButtons,
    editActionButtons
  );
}

function getEditActions(id) {
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

function editRow(id) {
  let {
    editableRowInput,
    staticCellData,
    editActionButtons,
    normalActionButtons,
  } = getEditActions(id);
  changeBetweenInputAndPlainText(
    editableRowInput,
    staticCellData,
    editActionButtons,
    normalActionButtons
  );
}

function changeBetweenInputAndPlainText(
  editableRowInput,
  staticCellData,
  editActionButtons,
  normalActionButtons
) {
  Array.from(editableRowInput).forEach((input) => {
    input.style.display = "inline";
  });
  Array.from(staticCellData).forEach((input) => {
    input.style.display = "none";
  });
  editActionButtons.style.display = "inline";
  normalActionButtons.style.display = "none";
}

function deleteRow(id) {
  data = [...data.slice(0, id - 1), ...data.slice(id)];
  reloadData();
}

function reloadData() {
  const table = document.getElementById("datatable");
  let rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
  loadData();
}
window.functionDefinedInModuleScope = {
  loadData,
  deleteRow,
  save,
  reloadData,
  editRow,
  cancel,
};
