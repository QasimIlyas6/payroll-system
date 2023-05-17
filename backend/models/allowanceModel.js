import mongoose from "mongoose";

// Allowance schema
const allowanceSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Allowance = mongoose.model("Allowance", allowanceSchema);

export default Allowance;
