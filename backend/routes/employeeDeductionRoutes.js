import express from "express";

import { admin, protect } from "../middlewares/authMddleware.js";
import {
	creatEemployeeDeduction,
	getEmployeesDeductions,
	getEmployeeDeductionById,
} from "../controllers/employeeDeductionController.js";

const router = express.Router();

router
	.route("/")
	.post(protect, admin, creatEemployeeDeduction)
	.get(protect, getEmployeesDeductions);

router.route("/:id").get(protect, getEmployeeDeductionById);
// .put(protect, updateEmployeeAllowance)
// .delete(protect, admin, deleteEmployeeAllowance);

export default router;
