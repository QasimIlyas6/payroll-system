import express from "express";
import {
	createDesignation,
	deleteDesignation,
	getDesignationById,
	getDesignations,
} from "../controllers/designationController.js";
import { admin, protect } from "../middlewares/authMddleware.js";

const router = express.Router();

router
	.route("/")
	.post(protect, admin, createDesignation)
	.get(protect, getDesignations);

router
	.route("/:id")
	.delete(protect, admin, deleteDesignation)
	.get(protect, getDesignationById);

export default router;
