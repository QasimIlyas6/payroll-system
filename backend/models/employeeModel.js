import mongoose from "mongoose";

// Employee schema
const employeeSchema = new mongoose.Schema(
	{
		employeeBasicDetailId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "EmployeeBasicDetails",
		},
		bankDetailId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "EmployeeBankDetails",
		},
		employeeAllowancesId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EmployeeAllowance",
		},
		employeeDeductionsId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EmployeeDeduction",
		},
	},
	{
		timestamps: true,
	}
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
