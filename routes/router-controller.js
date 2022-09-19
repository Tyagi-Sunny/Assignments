const fs = require("fs");
var pool = require("../db");
const getEmployeeData = (req, res) => {
    // res.json({ success: true, employee: data });
    pool.query("select * from employee", (q_err, q_res) => {
        res.json(q_res.rows);
    });
};
const delEmployee = (req, res) => {
    const id = Number(req.params.id);
    pool.query("DELETE FROM employee WHERE id=$1", [id], (q_err, q_res) => {
        res.json(q_res.rows);
    });
};
const updateEmployee = (req, res) => {
    const values = [
        Number(req.params.id),
        req.body.firstName,
        req.body.middleName,
        req.body.lastName,
        req.body.email,
        req.body.contact,
        req.body.role,
        req.body.address,
    ];
    pool.query("UPDATE employee SET id=$1,first_name=$2,middle_name=$3,last_name=$4,email=$5,contact=$6,role=$7,address=$8 where id=$1", values, (q_err, q_res) => {
        return res.json({ success: true });
    });
};
module.exports = { getEmployeeData, delEmployee, updateEmployee };
