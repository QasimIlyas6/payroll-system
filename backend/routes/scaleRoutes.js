import express from "express";
import {
	createScale,
	deleteScale,
	getScaleById,
	getScales,
} from "../controllers/scaleController.js";
import { admin, protect } from "../middlewares/authMddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, createScale).get(protect, getScales);

router
	.route("/:id")
	.delete(protect, admin, deleteScale)
	.get(protect, getScaleById);

export default router;
