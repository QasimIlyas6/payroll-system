import asyncHandler from "express-async-handler";
import EmployeeDeduction from "../models/employeeDeductionModel.js";

// @desc    Fetch all employee deduction
// @route   GET /api/employee-deductions
// @access  Public
export const getEmployeesDeductions = asyncHandler(async (req, res) => {
	const employeesDeductions = await EmployeeDeduction.find({});
	if (employeesDeductions) {
		res.json(employeesDeductions);
	} else {
		res.status(404);
		throw new Error("Employees deductions not founded");
	}
});

// @desc    Fetch single employee deduction by ID
// @route   GET /api/employee-deductions/:id
// @access  Public
export const getEmployeeDeductionById = asyncHandler(async (req, res) => {
	const employeeDeduction = await EmployeeDeduction.findOne({
		employeeId: req.params.id,
	});
	if (employeeDeduction) {
		res.json(employeeDeduction);
	} else {
		res.status(404);
		throw new Error("Employee deduction not found");
	}
});

// @desc    Create a new employee deduction
// @route   POST /api/employee-deductions
// @access  Private/Admin
export const creatEemployeeDeduction = asyncHandler(async (req, res) => {
	const { employeeId, deductionId, amount } = req.body;

	const employee = await EmployeeDeduction.findOne({ employeeId });

	if (employee) {
		// check if the deduction already exists in the deduction array
		const deductionExists = employee.deductions.some((deduction) =>
			deduction.deductionId.equals(deductionId)
		);

		if (deductionExists) {
			res.status(404);
			throw new Error("deduction already added to this employee");
		}

		console.log("employee: ", employee);
		employee.deductions.push({ deductionId, amount });
		console.log("employee push: ", employee);

		employee.totalDeductions = employee.deductions.reduce(
			(total, deduction) => total + deduction.amount,
			0
		);
		console.log("employee totalDed: ", employee);

		const updatedEmployeeDeduction = await employee.save();

		res.status(200).json(updatedEmployeeDeduction);
	} else {
		try {
			const employeeDeduction = new EmployeeDeduction({
				employeeId,
				deductions: [{ deductionId, amount }],
			});

			const newEmployeeDeduction = await employeeDeduction.save();
			res.status(201).json(newEmployeeDeduction);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: "Server error" });
		}
	}
});
