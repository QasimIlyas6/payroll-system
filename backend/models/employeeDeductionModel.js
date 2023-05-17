import mongoose from "mongoose";

// Employee Deduction schema
const employeeDeductionSchema = new mongoose.Schema(
	{
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EmployeeBasicDetails",
			required: true,
		},
		deductions: [
			{
				deductionId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Deduction",
					required: true,
				},
				amount: {
					type: Number,
					required: true,
					default: 0.0,
				},
			},
		],
		totalDeductions: {
			type: Number,
			required: true,
			default: 0.0,
		},
	},
	{
		timestamps: true,
	}
);

// Calculate total deductions before saving the data
employeeDeductionSchema.pre("save", function (next) {
	this.totalDeductions = this.deductions.reduce(
		(total, deduction) => total + deduction.amount,
		0
	);
	next();
});

const EmployeeDeduction = mongoose.model(
	"EmployeeDeduction",
	employeeDeductionSchema
);

export default EmployeeDeduction;
