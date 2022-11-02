const fs = require("fs");
const { Sequelize, Employee, Customer, Role } = require("../models");

const getEmployeeData = async (req: any, res: any) => {
  try {
    const data = await Employee.findAll({
      include: [
        {
          model: Role,
        },
        {
          model: Customer,
        },
      ],
    });
    return res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

const delEmployee = async (req: any, res: any) => {
  let id = req.params.id;
  try {
    const employee = await Employee.findOne({
      where: { id },
    });
    await employee.destroy();
    return res.json({ message: "user deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateEmployee = async (req: any, res: any) => {
  const id = req.params.id;
  const { firstName, middleName, lastName, email, contact, role, address } =
    req.body;
  try {
    const employee = await Employee.findOne({ where: { id } });
    employee.firstName = firstName;
    employee.middleName = middleName;
    employee.lastName = lastName;
    employee.email = email;
    employee.contact = contact;
    employee.role = role;
    employee.address = address;

    await employee.save();

    return res.json(employee);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { getEmployeeData, delEmployee, updateEmployee };
