import React, { useRef } from "react";
import { toPdf } from "react-to-pdf";
import EmployeeDetailScreen from "../screens/Employee/EmployeeDetailScreen";

const PayrollPdf = () => {
	const ref = useRef();

	const options = {
		orientation: "portrait",
		unit: "in",
		format: [8.5, 11],
	};

	const generatePdf = async () => {
		const pdf = await toPdf(ref.current, options);
		window.open(pdf);
	};

	return (
		<div>
			<h1>Employee Payroll PDF</h1>
			<div ref={ref}>
				<EmployeeDetailScreen />
			</div>
			<button onClick={generatePdf}>Generate PDF</button>
		</div>
	);
};

export default PayrollPdf;
