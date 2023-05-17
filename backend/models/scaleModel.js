import mongoose from "mongoose";

// Scale schema
const scaleSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Scale = mongoose.model("Scale", scaleSchema);

export default Scale;
