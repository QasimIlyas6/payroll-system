import asyncHandler from "express-async-handler";
import Scale from "../models/scaleModel.js";

// @desc   Create Scale
// @route  POST /Scale
// @access Private

export const createScale = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const bpsScale = `BPS-${name}`;

	const ScaleExisit = await Scale.findOne({ name: bpsScale });

	if (ScaleExisit) {
		res.status(400);
		throw new Error("This Scale aleardy register");
	}

	const scale = await Scale.create({
		name: bpsScale,
	});

	if (scale) {
		res.status(201).json({
			_id: scale._id,
			name: scale.name,
		});
	} else {
		res.status(404);
		throw new Error("Scale not found!");
	}
});

// @desc   Get all scales
// @route  GET /scales
// @access Private/Admin

export const getScales = asyncHandler(async (req, res) => {
	const scales = await Scale.find({});
	res.json(scales);
});

// @desc   Delete the scale by id
// @route  DELETE /scales/:id
// @access Private/Admin

export const deleteScale = asyncHandler(async (req, res) => {
	const scale = await Scale.findById(req.params.id);

	if (scale) {
		await scale.remove();
		res.json("scale removed");
	} else {
		res.status(404);
		throw new Error("no scale found");
	}
});

// @desc   GET the scale by id
// @route  GET /scales/:id
// @access Private/Admin

export const getScaleById = asyncHandler(async (req, res) => {
	const scale = await Scale.findById(req.params.id);

	if (scale) {
		res.json(scale);
	} else {
		res.status(404);
		throw new Error("no scale found");
	}
});
