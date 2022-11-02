var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs");
const { Sequelize, Employee, Customer, Role } = require("../models");
const getEmployeeData = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const data = yield Employee.findAll({
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
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const delEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let id = req.params.id;
    try {
        const employee = yield Employee.findOne({
            where: { id },
        });
        yield employee.destroy();
        return res.json({ message: "user deleted" });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const updateEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.params.id;
    const { firstName, middleName, lastName, email, contact, role, address } = req.body;
    try {
        const employee = yield Employee.findOne({ where: { id } });
        employee.firstName = firstName;
        employee.middleName = middleName;
        employee.lastName = lastName;
        employee.email = email;
        employee.contact = contact;
        employee.role = role;
        employee.address = address;
        yield employee.save();
        return res.json(employee);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});
module.exports = { getEmployeeData, delEmployee, updateEmployee };
