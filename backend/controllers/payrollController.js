import asyncHandler from "express-async-handler";
import Payroll from "../models/payrollModel.js";

// @desc   Create a new payroll
// @route  POST /payrolls
// @access Private/Admin
export const createPayroll = asyncHandler(async (req, res) => {
	try {
		const payroll = new Payroll(req.body);
		await payroll.save();
		res.status(201).json(payroll);
	} catch (error) {
		res.status(500).json({ error: "Failed to create payroll" });
	}
});

// @desc   Get all payrolls
// @route  GET /payrolls
// @access Private/Admin
export const getPayrolls = asyncHandler(async (req, res) => {
	try {
		const payrolls = await Payroll.find();
		res.json(payrolls);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve payrolls" });
	}
});

// @desc   Get a specific payroll by ID
// @route  GET /payrolls/:id
// @access Private/Admin
export const getPayrollById = asyncHandler(async (req, res) => {
	try {
		const payroll = await Payroll.findById(req.params.id);
		if (!payroll) {
			return res.status(404).json({ error: "Payroll not found" });
		}
		res.json(payroll);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve payroll" });
	}
});

// @desc   Update a payroll by ID
// @route  PUT /payrolls/:id
// @access Private/Admin
export const updatePayroll = asyncHandler(async (req, res) => {
	try {
		const payroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!payroll) {
			return res.status(404).json({ error: "Payroll not found" });
		}
		res.json(payroll);
	} catch (error) {
		res.status(500).json({ error: "Failed to update payroll" });
	}
});

// @desc   Delete a payroll by ID
// @route  DELETE /payrolls/:id
// @access Private/Admin
export const deletePayroll = asyncHandler(async (req, res) => {
	try {
		const payroll = await Payroll.findByIdAndDelete(req.params.id);
		if (!payroll) {
			return res.status(404).json({ error: "Payroll not found" });
		}
		res.json({ message: "Payroll deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: "Failed to delete payroll" });
	}
});
