let data = [
  {
    firstName: "Sunny",
    middleName: "NA",
    lastName: "Tyagi",
    email: "sunny.tyagi@sourcefuse.com",
    phone: "6396786017",
    role: "Web-Apps Trainee",
    address: "Ghaziabad",
    id: 1,
  },
  {
    firstName: "Deepak",
    middleName: "NA",
    lastName: "Kumar",
    email: "deepak.kumar@sourcefuse.com",
    phone: "8559010326",
    role: "Snr. Tech. Head",
    address: "Mohali",
    id: 2,
  },
  {
    firstName: "Meghna",
    middleName: "NA",
    lastName: "kashyap",
    email: "meghna.kashyap@sourcefuse.com",
    phone: "7834086997",
    role: "HR Recruiter",
    address: "Mohali",
    id: 3,
  },
  {
    firstName: "Samarpan",
    middleName: "NA",
    lastName: "Bhattacharya",
    email: "samarpan.bhattacharya@sourcefuse.com",
    phone: "9999909854",
    role: "Principal Architect",
    address: "Mohali",
    id: 4,
  },
];

function loadData() {
  const table = document.getElementById("datatable");
  let rowCount = table.rows.length;
  for (let employeeData of data) {
    let row = table.insertRow(rowCount);
    let cellNum = 0;
    for (let j in employeeData) {
      let newCell = row.insertCell(cellNum);
      if (cellNum != 7) {
        newCell.innerHTML = `<p class=\"info-row-${row.rowIndex}\">${employeeData[j]}</p>
                                      <input type="text" class=\"edit-info-row-${row.rowIndex}\" name=\"${j}\" style="display:none" value=\"${employeeData[j]}\">`;
        cellNum += 1;
      } else {
        newCell.innerHTML = `
                                <div id=\"normal-action-${row.rowIndex}\">
                                    <button id=\"del-row-${employeeData[j]}\" onclick=\"deleteRow(${row.rowIndex})\">del</button>
                                    <button id=\"edit-row-${employeeData[j]}\" onclick=\"editRow(${row.rowIndex})\">edit</button>
                                </div>
                                <div id=\"edit-action-${row.rowIndex}\" style=\"display:none\">
                                    <button id=\"save-row-${employeeData[j]}\" onclick=\"save(${row.rowIndex})\">save</button>
                                    <button id=\"cancel-row-${employeeData[j]}\" onclick=\"cancel(${row.rowIndex})\">cancel</button>
                                </div>
                                `;
      }
    }

    rowCount++;
  }
  document.getElementById("reload").style.display = "inline";
  document.getElementById("load").style.display = "none";
}

function save(n) {
  let editableRowInput = document.getElementsByClassName(`edit-info-row-${n}`);
  Array.from(editableRowInput).forEach((input) => {
    data[n - 1][input.name] = input.value;
  });
  reloadData();
}

function cancel(n) {
  let editableRowInput = document.getElementsByClassName(`edit-info-row-${n}`);
  let staticCellData = document.getElementsByClassName(`info-row-${n}`);

  Array.from(editableRowInput).forEach((input) => {
    input.style.display = "none";
  });
  Array.from(staticCellData).forEach((input) => {
    input.style.display = "inline";
  });
  document.getElementById(`normal-action-${n}`).style.display = "inline";
  document.getElementById(`edit-action-${n}`).style.display = "none";
}

function editRow(n) {
  let editableRowInput = document.getElementsByClassName(`edit-info-row-${n}`);
  let staticCellData = document.getElementsByClassName(`info-row-${n}`);
  console.log(typeof editableRowInput);
  Array.from(editableRowInput).forEach((input) => {
    input.style.display = "inline";
  });
  Array.from(staticCellData).forEach((input) => {
    input.style.display = "none";
  });
  document.getElementById(`normal-action-${n}`).style.display = "none";
  document.getElementById(`edit-action-${n}`).style.display = "inline";
}

function deleteRow(n) {
  data = [...data.slice(0, n - 1), ...data.slice(n)];
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
