import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
	{
		payrollNumber: {
			type: String,
			required: true,
			unique: true,
		},
		employees: [
			{
				employeeId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "EmployeeBasicDetails",
				},
				basicPay: {
					type: Number,
					required: true,
					default: 0,
				},
				employeeAllowances: {
					type: Number,
					required: true,
					default: 0,
				},
				employeeDeductions: {
					type: Number,
					required: true,
					default: 0,
				},
				netPay: {
					type: Number,
					required: true,
					default: 0,
				},
			},
		],
		totalAllowances: {
			type: Number,
			required: true,
		},
		totalDeductions: {
			type: Number,
			required: true,
		},
		month: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		totalPay: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Payroll = mongoose.model("Payroll", payrollSchema);

export default Payroll;
