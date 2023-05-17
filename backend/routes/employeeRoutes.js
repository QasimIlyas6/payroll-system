import express from "express";

import {
	createBankDetails,
	createEmployee,
	deleteEmployees,
	getBankDetailById,
	getEmployeeById,
	getEmployees,
	updateEmployee,
} from "../controllers/employeeController.js";
import { admin, protect } from "../middlewares/authMddleware.js";

const router = express.Router();

router
	.route("/")
	.post(protect, admin, createEmployee)
	.get(protect, getEmployees);

router.route("/bank-details").post(protect, admin, createBankDetails);

router.route("/bank-details/:id").get(protect, getBankDetailById);

router
	.route("/:id")
	.delete(protect, admin, deleteEmployees)
	.get(protect, getEmployeeById)
	.put(protect, admin, updateEmployee);

export default router;
