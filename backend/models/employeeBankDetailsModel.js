import mongoose from "mongoose";

const employeeBankDetailsSchema = new mongoose.Schema(
	{
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EmployeeBasicDetails",
			required: true,
		},
		accountTitle: { type: String, required: true },
		bank: { type: String, required: true },
		accountNumber: { type: String, required: true },
		branch: { type: String, required: true },
		branchCode: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const EmployeeBankDetails = mongoose.model(
	"EmployeeBankDetails",
	employeeBankDetailsSchema
);

export default EmployeeBankDetails;
