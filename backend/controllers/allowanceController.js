import Allowance from "../models/allowanceModel.js";
import asyncHandler from "express-async-handler";

// @desc   Create Allowance
// @route  POST /allowance
// @access Private

export const createAllowance = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const allowanceExisit = await Allowance.findOne({ name });

	if (allowanceExisit) {
		res.status(400);
		throw new Error("This allowance aleardy register");
	}

	const allowance = await Allowance.create({
		name,
	});

	if (allowance) {
		res.status(201).json({
			_id: allowance._id,
			name: allowance.name,
		});
	} else {
		res.status(404);
		throw new Error("allowance not found!");
	}
});

// @desc   Get all Allowances
// @route  GET /allowances
// @access Private/Admin

export const getAllowances = asyncHandler(async (req, res) => {
	const allowances = await Allowance.find({});
	res.json(allowances);
});

// @desc   Delete the allowance by id
// @route  DELETE /allowances/:id
// @access Private/Admin

export const deleteAllowance = asyncHandler(async (req, res) => {
	const allowance = await Allowance.findById(req.params.id);

	if (allowance) {
		await allowance.remove();
		res.json("allowance removed");
	} else {
		res.status(404);
		throw new Error("no allowance found");
	}
});

// @desc   GET the allowance by id
// @route  GET /allowances/:id
// @access Private/Admin

export const getAllowanceById = asyncHandler(async (req, res) => {
	const allowance = await Allowance.findById(req.params.id);

	if (allowance) {
		res.json(allowance);
	} else {
		res.status(404);
		throw new Error("no allowance found");
	}
});
