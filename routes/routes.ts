const express = require("express");
const subRoute = require("./sub-route");
const { getEmployeeData } = require("./user-controller");

const router = express.Router({ mergeParams: true });
router.use("/employee", subRoute);

router.route("/allEmployee").get(getEmployeeData);

module.exports = router;
export {};
