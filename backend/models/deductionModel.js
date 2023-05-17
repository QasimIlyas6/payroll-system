import mongoose from "mongoose";

// Deductions schema
const deductionSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Deduction = mongoose.model("Deduction", deductionSchema);

export default Deduction;
