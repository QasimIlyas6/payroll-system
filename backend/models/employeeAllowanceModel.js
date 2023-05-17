import mongoose from "mongoose";

// Employee Allowance schema
const employeeAllowanceSchema = new mongoose.Schema(
	{
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EmployeeBasicDetails",
			required: true,
		},
		allowances: [
			{
				allowanceId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Allowance",
					required: true,
				},
				amount: {
					type: Number,
					default: 0.0,
				},
			},
		],
		totalAllowances: {
			type: Number,
			required: true,
			default: 0.0,
		},
	},
	{
		timestamps: true,
	}
);

// Calculate total allowances before saving the data
employeeAllowanceSchema.pre("save", function (next) {
	this.totalAllowances = this.allowances.reduce(
		(total, allowance) => total + allowance.amount,
		0
	);

	next();
});

const EmployeeAllowance = mongoose.model(
	"EmployeeAllowance",
	employeeAllowanceSchema
);

export default EmployeeAllowance;
