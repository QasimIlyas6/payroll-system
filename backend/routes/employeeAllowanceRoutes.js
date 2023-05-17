import express from "express";

import { admin, protect } from "../middlewares/authMddleware.js";
import {
	createEmployeeAllowance,
	deleteEmployeeAllowance,
	getEmployeeAllowanceById,
	getEmployeesAllowances,
	updateEmployeeAllowance,
} from "../controllers/employeeAllowanceController.js";

const router = express.Router();

router
	.route("/")
	.post(protect, admin, createEmployeeAllowance)
	.get(protect, getEmployeesAllowances);

router
	.route("/:id")
	.get(protect, getEmployeeAllowanceById)
	.put(protect, updateEmployeeAllowance)
	.delete(protect, admin, deleteEmployeeAllowance);

export default router;
