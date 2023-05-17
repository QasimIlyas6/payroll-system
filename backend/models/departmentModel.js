import mongoose from "mongoose";

// Department schema
const departmentSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Department = mongoose.model("Department", departmentSchema);

export default Department;
