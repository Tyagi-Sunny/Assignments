const fs = require("fs");
let data = require("../data.json");

const getEmployeeData = (req: any, res: any) => {
  res.json({ success: true, employee: data });
};

const delEmployee = (req: any, res: any) => {
  let id: Number = Number(req.params.id);
  let emp = data.find((employee) => employee.id === id);
  if (emp) {
    data = data.filter((employee) => employee.id !== id);

    fs.writeFile("./data.json", JSON.stringify(data), (err) => {
      if (err) console.log("error in deleting");
      else console.log("done deleting");
    });
  }
  res.status(200).json({ success: true, employee: data });
};

const updateEmployee = (req: any, res: any) => {
  data = data.map((employee) => {
    if (employee.id === Number(req.params.id)) {
      employee = { id: Number(req.params.id), ...req.body };
    }
    return employee;
  });
  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) console.log("error in deleting");
    else console.log("done deleting");
  });
  res.status(200).json({ success: true, employee: data });
};

module.exports = { getEmployeeData, delEmployee, updateEmployee };
