import EmployeeBankDetails from "../models/employeeBankDetailsModel.js";
import asyncHandler from "express-async-handler";
import EmployeeBasicDetails from "../models/employeeBasicDetailsModel.js";

function generatePersonnelNumber() {
	const timestamp = new Date().getTime();
	const random = Math.floor(Math.random() * 1000)
		.toString()
		.padStart(3, "0");
	return (timestamp + random).slice(-6);
}

// @desc   Create Employee
// @route  POST /employee
// @access Private/Admin

let employee;

export const createEmployee = asyncHandler(async (req, res) => {
	const {
		name,
		fatherName,
		employeeType,
		departmentId,
		designationId,
		basicPay,
		phoneNumber,
		whatsApp,
		email,
		cnic,
		dob,
		status,
		gender,
		scaleId,
		entryDate,
		NTN,
		permanentAddress,
		postingCity,
	} = req.body;

	const employeeExisits = await EmployeeBasicDetails.findOne({ cnic });

	if (employeeExisits) {
		res.status(400);
		throw new Error("This Employee aleardy register");
	}

	try {
		employee = await EmployeeBasicDetails.create({
			name,
			fatherName,
			personnelNumber: generatePersonnelNumber(),
			employeeType,
			departmentId,
			designationId,
			basicPay,
			phoneNumber,
			whatsApp,
			email,
			status,
			cnic,
			dob,
			gender,
			scaleId,
			entryDate,
			NTN,
			permanentAddress,
			postingCity,
		});

		if (employee) {
			res.status(201).json({
				_id: employee._id,
				name: employee.name,
				fatherName: employee.fatherName,
				employeeType: employee.employeeType,
				personnelNumber: employee.personnelNumber,
				departmentId: employee.departmentId,
				designationId: employee.designationId,
				basicPay: employee.basicPay,
				phoneNumber: employee.phoneNumber,
				whatsApp: employee.whatsApp,
				email: employee.email,
				status: employee.status,
				cnic: employee.cnic,
				dob: employee.dob,
				gender: employee.gender,
				scaleId: employee.scaleId,
				entryDate: employee.entryDate,
				NTN: employee.NTN,
				permanentAddress: employee.permanentAddress,
				postingCity: employee.postingCity,
			});
		} else {
			res.status(404);
			throw new Error("Employee not found!");
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
});

// @desc   Create Employee bank details
// @route  POST /api/employees/bank-details
// @access Private/Admin

export const createBankDetails = asyncHandler(async (req, res) => {
	const { accountTitle, bank, accountNumber, branch, branchCode } = req.body;

	const bankDetailsExisit = await EmployeeBankDetails.findOne({
		accountNumber,
	});

	if (bankDetailsExisit) {
		res.status(400);
		throw new Error("This account number aleardy register");
	}

	try {
		const employeeExisit = await EmployeeBasicDetails.findOne({
			email: employee.email,
		});

		const bankDetails = await EmployeeBankDetails.create({
			employeeId: employeeExisit._id,
			accountTitle,
			bank,
			accountNumber,
			branch,
			branchCode,
		});

		res.status(201).json(bankDetails);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Server error" });
	}
});

// @desc   Get all employees
// @route  GET /employees
// @access Private/Admin

export const getEmployees = asyncHandler(async (req, res) => {
	const employees = await EmployeeBasicDetails.find({});
	res.json(employees);
});

// @desc   Delete the Employees by id
// @route  DELETE /employees/:id
// @access Private/Admin

export const deleteEmployees = asyncHandler(async (req, res) => {
	const employee = await EmployeeBasicDetails.findById(req.params.id);

	if (employee) {
		await employee.remove();
		res.json("employee removed");
	} else {
		res.status(404);
		throw new Error("no employee found");
	}
});

// @desc   GET the employee by id
// @route  GET /employees/:id
// @access Private/Admin

export const getEmployeeById = asyncHandler(async (req, res) => {
	const employee = await EmployeeBasicDetails.findById(req.params.id);

	if (employee) {
		res.json(employee);
	} else {
		res.status(404);
		throw new Error("no employee found");
	}
});

// @desc   GET the employee bank details by id
// @route  GET /employees/bank-details/:id
// @access Private/Admin

export const getBankDetailById = asyncHandler(async (req, res) => {
	const bankDetails = await EmployeeBankDetails.findOne({
		employeeId: req.params.id,
	});

	if (bankDetails) {
		res.json(bankDetails);
	} else {
		res.status(404);
		throw new Error("no bank details found");
	}
});
// const schema = Joi.object({
//   name: Joi.string().required(),
//   fatherName: Joi.string().required(),
//   departmentId: Joi.string().required(),
//   ...
// });

// const { error } = schema.validate(req.body);

// if (error) {
//   res.status(400).json({ message: error.details[0].message });
//   return;
// }

// // @desc   Update employee only Admin
// // @route  PUT /employees/:id
// // @access Private

export const updateEmployee = asyncHandler(async (req, res) => {
	const employee = await EmployeeBasicDetails.findById(req.params.id);
	const {
		name,
		fatherName,
		employeeType,
		departmentId,
		designationId,
		basicPay,
		phoneNumber,
		whatsApp,
		email,
		cnic,
		dob,
		status,
		gender,
		scaleId,
		entryDate,
		NTN,
		permanentAddress,
		postingCity,
	} = req.body;

	if (employee) {
		employee.name = name || employee.name;
		employee.fatherName = fatherName || employee.fatherName;
		employee.employeeType = employeeType || employee.employeeType;
		employee.departmentId = departmentId || employee.departmentId;
		employee.designationId = designationId || employee.designationId;
		employee.basicPay = basicPay || employee.basicPay;
		employee.phoneNumber = phoneNumber || employee.phoneNumber;
		employee.whatsApp = whatsApp || employee.whatsApp;
		employee.email = email || employee.email;
		employee.status = status || employee.status;
		employee.cnic = cnic || employee.cnic;
		employee.dob = dob || employee.dob;
		employee.gender = gender || employee.gender;
		employee.scaleId = scaleId || employee.scaleId;
		employee.entryDate = entryDate || employee.entryDate;
		employee.NTN = NTN || employee.NTN;
		employee.permanentAddress = permanentAddress || employee.permanentAddress;
		employee.postingCity = postingCity || employee.postingCity;

		const updatedEmployee = await employee.save();

		res.json({
			_id: updatedEmployee._id,
			name: updatedEmployee.name,
			fatherName: updatedEmployee.fatherName,
			employeeType: updatedEmployee.employeeType,
			personnelNumber: updatedEmployee.personnelNumber,
			departmentId: updatedEmployee.departmentId,
			designationId: updatedEmployee.designationId,
			basicPay: updatedEmployee.basicPay,
			phoneNumber: updatedEmployee.phoneNumber,
			whatsApp: updatedEmployee.whatsApp,
			email: updatedEmployee.email,
			status: updatedEmployee.status,
			cnic: updatedEmployee.cnic,
			dob: updatedEmployee.dob,
			gender: updatedEmployee.gender,
			scaleId: updatedEmployee.scaleId,
			entryDate: updatedEmployee.entryDate,
			NTN: updatedEmployee.NTN,
			permanentAddress: updatedEmployee.permanentAddress,
			postingCity: updatedEmployee.postingCity,
		});
	} else {
		res.status(404);
		throw new Error("employee not found");
	}
});
