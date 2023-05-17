import Designation from "../models/designationModel.js";
import asyncHandler from "express-async-handler";

// @desc   Create Designation
// @route  POST /Designation
// @access Private

export const createDesignation = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const DesignationExisit = await Designation.findOne({ name });

	if (DesignationExisit) {
		res.status(400);
		throw new Error("This Designation aleardy register");
	}

	const designation = await Designation.create({
		name,
	});

	if (designation) {
		res.status(201).json({
			_id: designation._id,
			name: designation.name,
		});
	} else {
		res.status(404);
		throw new Error("Designation not found!");
	}
});

// @desc   Get all designations
// @route  GET /designations
// @access Private/Admin

export const getDesignations = asyncHandler(async (req, res) => {
	const designations = await Designation.find({});
	res.json(designations);
});

// @desc   Delete the designation by id
// @route  DELETE /designations/:id
// @access Private/Admin

export const deleteDesignation = asyncHandler(async (req, res) => {
	const designation = await Designation.findById(req.params.id);

	if (designation) {
		await designation.remove();
		res.json("Designation removed");
	} else {
		res.status(404);
		throw new Error("no designation found");
	}
});

// @desc   GET the designation by id
// @route  GET /designations/:id
// @access Private/Admin

export const getDesignationById = asyncHandler(async (req, res) => {
	const designation = await Designation.findById(req.params.id);

	if (designation) {
		res.json(designation);
	} else {
		res.status(404);
		throw new Error("no designation found");
	}
});
