import Department from "../models/departmentModel.js";
import asyncHandler from "express-async-handler";

// @desc   Create Department
// @route  POST /department
// @access Private

export const createDepartment = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const departmentExisit = await Department.findOne({ name });

	if (departmentExisit) {
		res.status(400);
		throw new Error("This department aleardy register");
	}

	const department = await Department.create({
		name,
	});

	if (department) {
		res.status(201).json({
			_id: department._id,
			name: department.name,
		});
	} else {
		res.status(404);
		throw new Error("Department not found!");
	}
});

// @desc   Get all Departments
// @route  GET /departments
// @access Private/Admin

export const getDepartments = asyncHandler(async (req, res) => {
	const departments = await Department.find({});
	res.json(departments);
});

// @desc   Delete the Department by id
// @route  DELETE /departments/:id
// @access Private/Admin

export const deleteDepartment = asyncHandler(async (req, res) => {
	const department = await Department.findById(req.params.id);

	if (department) {
		await department.remove();
		res.json("Department removed");
	} else {
		res.status(404);
		throw new Error("no department found");
	}
});

// @desc   GET the department by id
// @route  GET /departments/:id
// @access Private/Admin

export const getDepartmentById = asyncHandler(async (req, res) => {
	const department = await Department.findById(req.params.id);

	if (department) {
		res.json(department);
	} else {
		res.status(404);
		throw new Error("no department found");
	}
});
