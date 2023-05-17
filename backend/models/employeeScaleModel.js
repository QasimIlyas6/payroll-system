import mongoose from "mongoose";

// Employee Scale schema
const employeeScaleSchema = new mongoose.Schema(
	{
		employeeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "EmployeeBasicDetails",
		},
		scaleId: { type: mongoose.Schema.Types.ObjectId, ref: "Scale" },
	},
	{
		timestamps: true,
	}
);

const EmployeeScale = mongoose.model("EmployeeScale", employeeScaleSchema);

export default EmployeeScale;
