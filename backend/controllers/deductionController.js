import Deduction from "../models/deductionModel.js";
import asyncHandler from "express-async-handler";

// @desc   Create Deduction
// @route  POST /deduction
// @access Private

export const createDeduction = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const deductionExisit = await Deduction.findOne({ name });

	if (deductionExisit) {
		res.status(400);
		throw new Error("This deduction aleardy register");
	}

	const deduction = await Deduction.create({
		name,
	});

	if (deduction) {
		res.status(201).json({
			_id: deduction._id,
			name: deduction.name,
		});
	} else {
		res.status(404);
		throw new Error("deduction not found!");
	}
});

// @desc   Get all deductions
// @route  GET /deductions
// @access Private/Admin

export const getDeductions = asyncHandler(async (req, res) => {
	const deductions = await Deduction.find({});
	res.json(deductions);
});

// @desc   Delete the deduction by id
// @route  DELETE /deductions/:id
// @access Private/Admin

export const deleteDeduction = asyncHandler(async (req, res) => {
	const deduction = await Deduction.findById(req.params.id);

	if (deduction) {
		await deduction.remove();
		res.json("deduction removed");
	} else {
		res.status(404);
		throw new Error("no deduction found");
	}
});

// @desc   GET the deduction by id
// @route  GET /deductions/:id
// @access Private/Admin

export const getDeductionById = asyncHandler(async (req, res) => {
	const deduction = await Deduction.findById(req.params.id);

	if (deduction) {
		res.json(deduction);
	} else {
		res.status(404);
		throw new Error("no deduction found");
	}
});
