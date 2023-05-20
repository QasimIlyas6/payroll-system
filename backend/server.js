import express from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import morgan from "morgan";

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import allowanceRoutes from "./routes/allowanceRoutes.js";
import designationRoutes from "./routes/designationRoutes.js";
import deductionRoutes from "./routes/deductionRoutes.js";
import scaleRoutes from "./routes/scaleRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import employeeAllowanceRoutes from "./routes/employeeAllowanceRoutes.js";
import employeeDeductionRoutes from "./routes/employeeDeductionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import payrollRoutes from "./routes/payrollRoutes.js";

dotenv.config();

connectDB();

const app = express();

// This is show the api calls in the console
if (process.env.NODE_MODE === "development") {
	app.use(morgan("dev"));
}

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/allowances", allowanceRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);
app.use("/api/scales", scaleRoutes);
app.use("/api/deductions", deductionRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/employee-allowances", employeeAllowanceRoutes);
app.use("/api/employee-deductions", employeeDeductionRoutes);
app.use("/api/payrolls", payrollRoutes);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_MODE === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
	});
} else {
	app.get("/", (req, res) => {
		res.send("API is running");
	});
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
	PORT,
	console.log(`Server is Running on ${process.env.NODE_MODE} mode in ${PORT} `)
);
