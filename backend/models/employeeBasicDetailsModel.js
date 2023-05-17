import mongoose from "mongoose";

// Employee Basic Details schema
const employeeBasicDetailsSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		fatherName: { type: String, required: true },
		employeeType: { type: String, required: true },
		personnelNumber: { type: Number, required: true },
		departmentId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Department",
			required: true,
		},
		basicPay: { type: Number, required: true, default: 0.0 },
		phoneNumber: { type: String, required: true },
		whatsApp: { type: String },
		email: { type: String, unique: true },
		cnic: { type: String, required: true, unique: true },
		dob: { type: Date, required: true },
		gender: { type: String, required: true },
		entryDate: { type: Date, required: true },
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "active",
		},
		NTN: { type: String },
		designationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Designation",
			required: true,
		},
		scaleId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Scale",
			required: true,
		},
		permanentAddress: { type: String, required: true },
		postingCity: { type: String },
	},
	{
		timestamps: true,
	}
);

const EmployeeBasicDetails = mongoose.model(
	"EmployeeBasicDetails",
	employeeBasicDetailsSchema
);

export default EmployeeBasicDetails;
