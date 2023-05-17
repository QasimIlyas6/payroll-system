import express from "express";
import {
	createDepartment,
	deleteDepartment,
	getDepartments,
} from "../controllers/departmentController.js";
import { getDeductionById } from "../controllers/deductionController.js";
import { admin, protect } from "../middlewares/authMddleware.js";

const router = express.Router();

router
	.route("/")
	.post(protect, admin, createDepartment)
	.get(protect, getDepartments);

router
	.route("/:id")
	.delete(protect, admin, deleteDepartment)
	.get(protect, getDeductionById);

export default router;
