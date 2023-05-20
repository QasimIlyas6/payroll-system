import asyncHandler from "express-async-handler";
import EmployeeAllowance from "../models/employeeAllowanceModel.js";

// @desc    Fetch all employee allowances
// @route   GET /api/employee-allowances
// @access  Public
const getEmployeesAllowances = asyncHandler(async (req, res) => {
	const employeesAllowances = await EmployeeAllowance.find({});
	if (employeesAllowances) {
		res.json(employeesAllowances);
	} else {
		res.status(404);
		throw new Error("Employees allowances not founded");
	}
});

// @desc    Fetch single employee allowance by ID
// @route   GET /api/employee-allowances/:id
// @access  Public
const getEmployeeAllowanceById = asyncHandler(async (req, res) => {
	const employeeAllowance = await EmployeeAllowance.findOne({
		employeeId: req.params.id,
	});
	if (employeeAllowance) {
		res.json(employeeAllowance);
	} else {
		res.status(404);
		throw new Error("Employee allowance not found");
	}
});

// @desc    Create a new employee allowance
// @route   POST /api/employee-allowances
// @access  Private/Admin
const createEmployeeAllowance = asyncHandler(async (req, res) => {
	const { employeeId, allowanceId, amount } = req.body;

	const employee = await EmployeeAllowance.findOne({ employeeId });

	if (employee) {
		// check if the allowance already exists in the allowances array
		const allowanceExists = employee.allowances.some((allowance) =>
			allowance.allowanceId.equals(allowanceId)
		);

		if (allowanceExists) {
			res.status(199);
			throw new Error("Allowance already added to this employee");
		}

		employee.allowances.push({ allowanceId, amount });

		employee.totalAllowances = employee.allowances.reduce(
			(total, allowance) => total + allowance.amount,
			0
		);

		const updatedEmployeeAllowance = await employee.save();

		res.status(200).json(updatedEmployeeAllowance);
	} else {
		try {
			const employeeAllowance = new EmployeeAllowance({
				employeeId,
				allowances: [{ allowanceId, amount }],
			});

			const newEmployeeAllowance = await employeeAllowance.save();
			res.status(201).json(newEmployeeAllowance);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Server error" });
		}
	}
});

// @desc    Update an existing employee allowance
// @route   PUT /api/employee-allowances/:id
// @access  Private/Admin
const updateEmployeeAllowance = asyncHandler(async (req, res) => {
	const { employeeId, allowances } = req.body;
	const employeeAllowance = await EmployeeAllowance.findById(req.params.id);
	if (employeeAllowance) {
		employeeAllowance.employeeId = employeeId || employeeAllowance.employeeId;
		employeeAllowance.allowances = allowances || employeeAllowance.allowances;

		const updatedEmployeeAllowance = await employeeAllowance.save();
		res.json(updatedEmployeeAllowance);
	} else {
		res.status(404);
		throw new Error("Employee allowance not found");
	}
});

// @desc    Delete an existing employee allowance
// @route   DELETE /api/employee-allowances/:id
// @access  Private/Admin
const deleteEmployeeAllowance = asyncHandler(async (req, res) => {
	const employeeAllowance = await EmployeeAllowance.findById(req.params.id);
	if (employeeAllowance) {
		await employeeAllowance.remove();
		res.json({ message: "Employee allowance removed" });
	} else {
		res.status(404);
		throw new Error("Employee allowance not found");
	}
});

export {
	getEmployeesAllowances,
	getEmployeeAllowanceById,
	createEmployeeAllowance,
	updateEmployeeAllowance,
	deleteEmployeeAllowance,
};
