import express from "express";
import {
	createDeduction,
	deleteDeduction,
	getDeductionById,
	getDeductions,
} from "../controllers/deductionController.js";
import { admin, protect } from "../middlewares/authMddleware.js";

const router = express.Router();

router
	.route("/")
	.post(protect, admin, createDeduction)
	.get(protect, getDeductions);

router
	.route("/:id")
	.delete(protect, admin, deleteDeduction)
	.get(protect, getDeductionById);

export default router;
