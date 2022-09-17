"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const { delEmployee, updateEmployee, postEmployee, } = require("./router-controller");
const subroute = express.Router({ mergeParams: true });
subroute.route("/:id").delete(delEmployee);
subroute.route("/:id").put(updateEmployee);
subroute.route("/").post(postEmployee);
module.exports = subroute;
