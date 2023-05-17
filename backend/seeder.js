import mongoose from "mongoose";
import * as dotenv from "dotenv";

import connectDB from "./config/db.js";

import User from "./models/userModel.js";
import Allowance from "./models/allowanceModel.js";
import Deduction from "./models/deductionModel.js";
import Designation from "./models/designationModel.js";
import Department from "./models/departmentModel.js";
import EmployeeAllowance from "./models/employeeAllowanceModel.js";
import EmployeeBankDetails from "./models/employeeBankDetailsModel.js";
import EmployeeBasicDetails from "./models/employeeBasicDetailsModel.js";
import Scale from "./models/scaleModel.js";
import Employee from "./models/employeeModel.js";
import EmployeeDeduction from "./models/employeeDeductionModel.js";

dotenv.config();

connectDB();

// destory the data from database
const destoryData = async () => {
	try {
		// await User.deleteMany();
		await Allowance.deleteMany();
		await Deduction.deleteMany();
		await Designation.deleteMany();
		await Department.deleteMany();
		await EmployeeAllowance.deleteMany();
		await EmployeeDeduction.deleteMany();
		await Employee.deleteMany();
		await EmployeeBankDetails.deleteMany();
		await EmployeeBasicDetails.deleteMany();
		await Scale.deleteMany();

		console.log("DATA DESTORY!");
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

// process.argv :: it is property that holds a array of command-line values

if (process.argv[2] === "-d") {
	destoryData();
}
