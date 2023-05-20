import express from "express";
import { admin, protect } from "../middlewares/authMddleware.js";
import {
	createPayroll,
	deletePayroll,
	getPayrollById,
	getPayrolls,
	updatePayroll,
} from "../controllers/payrollController.js";

const router = express.Router();

router.route("/").post(protect, admin, createPayroll).get(protect, getPayrolls);

router
	.route("/:id")
	.get(protect, getPayrollById)
	.put(protect, admin, updatePayroll)
	.delete(protect, admin, deletePayroll);

export default router;
