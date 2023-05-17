import express from "express";
import {
	createAllowance,
	deleteAllowance,
	getAllowanceById,
	getAllowances,
} from "../controllers/allowanceController.js";
import { admin, protect } from "../middlewares/authMddleware.js";

const router = express.Router();

router
	.route("/")
	.post(protect, admin, createAllowance)
	.get(protect, getAllowances);

router
	.route("/:id")
	.delete(protect, admin, deleteAllowance)
	.get(protect, getAllowanceById);

export default router;
