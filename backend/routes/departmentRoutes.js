import express from "express";
import {
	createDepartment,
	deleteDepartment,
	getDepartments,
	updateDepartment,
} from "../controllers/departmentController.js";
import { getDepartmentById } from "../controllers/departmentController.js";
import { admin, protect } from "../middlewares/authMddleware.js";

const router = express.Router();

router
	.route("/")
	.post(protect, admin, createDepartment)
	.get(protect, getDepartments);

router
	.route("/:id")
	.delete(protect, admin, deleteDepartment)
	.get(protect, getDepartmentById)
	.put(protect, admin, updateDepartment);

export default router;
