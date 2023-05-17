import mongoose from "mongoose";

// Employee Designation schema
const employeeDesignationSchema = new mongoose.Schema(
	{
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EmployeeBasicDetails",
		},
		designationId: { type: mongoose.Schema.Types.ObjectId, ref: "Designation" },
	},
	{
		timestamps: true,
	}
);

const EmployeeDesignation = mongoose.model(
	"EmployeeDesignation",
	employeeDesignationSchema
);

export default EmployeeDesignation;
