"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const delSubRoute = require("./delSubRoute");
const { getEmployeeData } = require("./router-controller");
const router = express.Router({ mergeParams: true });
router.use("/employee", delSubRoute);
router.route("/allEmployee").get(getEmployeeData);
module.exports = router;
