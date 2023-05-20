import React from "react";
import {
	Document,
	Page,
	View,
	Text,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";

import logo from "../../assets/bise-logo.png";
// Define styles for the document
const styles = StyleSheet.create({
	page: {
		padding: 50,
		margin: "0 auto",
	},
	title: {
		fontSize: 12,
		fontWeight: "bold",
		marginBottom: 5,
		textAlign: "center",
	},
	header: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		fontSize: 20,
		fontWeight: "bold",
	},
	titleContainer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		marginTop: 20,
	},
	flex: {
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	image: {
		width: 100,
		height: 80,
		objectFit: "contain",
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 10,
	},
	text: {
		fontSize: 10,
		marginBottom: 2,
	},
	// Table styles
	table: {
		display: "table",
		width: "80%",
		borderStyle: "solid",
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	tableRow: {
		margin: "auto",
		flexDirection: "row",
	},
	tableCol: {
		width: "25%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	employeeCol: {
		width: "50%",
	},
	mainCol: {
		width: "45%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	numberCol: {
		width: "10%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCell: {
		margin: "auto",
		marginTop: 5,
		fontSize: 7,
		paddingLeft: 5,
		paddingRight: 5,
		paddingTop: 2,
		paddingBottom: 2,
		textAlign: "left",
	},
	tableHeader: {
		backgroundColor: "#0ea5e9",
		color: "#ffff",
		fontWeight: "600",
	},
	summary: {
		marginTop: 20,
		textAlign: "right",
	},
	summaryLabel: {
		fontSize: 12,
		fontWeight: "bold",
	},
	summaryValue: {
		fontSize: 12,
		fontWeight: "normal",
		marginLeft: 10,
	},
});

const EmployeePayslip = (props) => {
	const {
		employee,
		employeeAllowances,
		employeeDeductions,
		years,
		months,
		days,
		departments,
		designations,
		scales,
		allowances,
		deductions,
		summary,
	} = props;

	const currentDate = new Date();

	let allowanceCount = 1;
	let deductionCount = 1;

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* Title section */}
				<View style={styles.header}>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>
							BOARD OF INTERMEDIATE & SECONDARY EDUCTION
						</Text>
						<Text style={styles.title}>DISTRICT DERA ISMAIL KHAN</Text>
						<Text style={styles.title}>
							Monthly Salary Statement (
							{currentDate.toLocaleString("default", { month: "long" })}-{" "}
							{currentDate.getUTCFullYear()})
						</Text>
					</View>
					<Image style={styles.image} src={logo} />
				</View>
				{/* Basic Information section */}
				{employee && (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>
							Personal Information of Mr{" "}
							{employee.name && employee.name.toUpperCase()} d/w/s of{" "}
							{employee.fatherName && employee.fatherName.toUpperCase()}
						</Text>
						<View style={[styles.tableRow, { marginBottom: "25px" }]}>
							<View style={styles.employeeCol}>
								<Text style={styles.text}>
									Personnel Number: {employee.personnelNumber}
								</Text>
								<Text style={styles.text}>Date of Birth: 12/3/1990</Text>
								<Text style={styles.text}>Entry Date: 12/3/2020</Text>
							</View>
							<View style={styles.employeeCol}>
								<Text style={styles.text}>CNIC: {employee.cnic} </Text>
								<Text style={styles.text}>NTN: {employee.NTN}</Text>
								<Text style={styles.text}>
									Length of Service:{" "}
									{years ? (
										<Text>
											{years} Years, {months} Months {days} Days
										</Text>
									) : months ? (
										<Text>
											{months} Months {days} Days
										</Text>
									) : (
										<Text>{days} Days</Text>
									)}
								</Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={styles.employeeCol}>
								<Text style={styles.text}>
									Employee Type: {employee.employeeType}
								</Text>
								<Text style={styles.text}>
									Designation:{" "}
									{designations &&
										designations.find(
											(designation) =>
												designation._id === employee.designationId
										)?.name}
								</Text>
								<Text style={styles.text}>
									Section:{" "}
									{departments &&
										departments.find(
											(department) => department._id === employee.departmentId
										)?.name}
								</Text>
								<Text style={styles.text}>
									Scale:{" "}
									{scales &&
										scales.find((scale) => scale._id === employee.scaleId)
											?.name}
								</Text>
								<Text style={styles.text}>Gender: {employee.gender}</Text>
							</View>
							<View style={styles.employeeCol}>
								<Text style={styles.text}>
									Posting City: {employee.postingCity}
								</Text>
								<Text style={styles.text}>Email: {employee.email}</Text>
								<Text style={styles.text}>
									Phone Number: {employee.phoneNumber}{" "}
								</Text>
								<Text style={styles.text}>WhatsApp: {employee.whatsApp} </Text>
							</View>
						</View>
					</View>
				)}
				{/* Allowances table */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Pay and Allowances</Text>
					<View style={styles.table}>
						<View style={[styles.tableRow, styles.tableHeader]}>
							<View style={[styles.numberCol]}>
								<Text style={styles.tableCell}>S.No</Text>
							</View>
							<View style={[styles.mainCol]}>
								<Text style={styles.tableCell}>Wage Type</Text>
							</View>
							<View style={[styles.mainCol]}>
								<Text style={styles.tableCell}>Amount (Rs.)</Text>
							</View>
						</View>
						<View style={styles.tableRow}>
							<View style={[styles.numberCol]}>
								<Text style={styles.tableCell}>{allowanceCount++}</Text>
							</View>
							<View style={[styles.mainCol]}>
								<Text style={styles.tableCell}>Basic Pay</Text>
							</View>
							<View style={[styles.mainCol]}>
								<Text style={styles.tableCell}>{employee.basicPay}</Text>
							</View>
						</View>
						{employeeAllowances.allowances &&
							employeeAllowances.allowances.length > 0 &&
							employeeAllowances.allowances.map((employeeAllowance) => (
								<View style={styles.tableRow} key={employeeAllowance._id}>
									<View style={[styles.numberCol]}>
										<Text style={styles.tableCell}>{allowanceCount++}</Text>
									</View>
									<View style={[styles.mainCol]}>
										<Text
											style={[
												styles.tableCell,
												{ textAlign: "left !important" },
											]}
										>
											{allowances &&
												allowances.find(
													(allowance) =>
														allowance._id === employeeAllowance.allowanceId
												)?.name}
										</Text>
									</View>
									<View style={[styles.mainCol]}>
										<Text style={styles.tableCell}>
											{employeeAllowance.amount.toLocaleString()}
										</Text>
									</View>
								</View>
							))}
					</View>
				</View>
				{/*  Deductions table */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Deductions</Text>
					<View style={styles.table}>
						<View style={[styles.tableRow, styles.tableHeader]}>
							<View style={[styles.numberCol]}>
								<Text style={styles.tableCell}>S.No</Text>
							</View>
							<View style={[styles.mainCol]}>
								<Text style={styles.tableCell}>Wage Type</Text>
							</View>
							<View style={[styles.mainCol]}>
								<Text style={styles.tableCell}>Amount (Rs.)</Text>
							</View>
						</View>
						{employeeDeductions.deductions &&
							employeeDeductions.deductions.length > 0 &&
							employeeDeductions.deductions.map((employeeDeduction) => (
								<View style={styles.tableRow} key={employeeDeduction._id}>
									<View style={[styles.numberCol]}>
										<Text style={styles.tableCell}>{deductionCount++}</Text>
									</View>
									<View style={[styles.mainCol]}>
										<Text
											style={[
												styles.tableCell,
												{ textAlign: "left !important" },
											]}
										>
											{deductions &&
												deductions.find(
													(deduction) =>
														deduction._id === employeeDeduction.deductionId
												)?.name}
										</Text>
									</View>
									<View style={[styles.mainCol]}>
										<Text style={styles.tableCell}>
											{employeeDeduction.amount.toLocaleString()}
										</Text>
									</View>
								</View>
							))}
					</View>
				</View>
				{/* Summary section */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Summary</Text>
					<View style={[styles.table, styles.summaryTable]}>
						<View style={[styles.tableRow, styles.tableHeader]}>
							<View style={[styles.tableCol]}>
								<Text style={styles.tableCell}>Total Allowances</Text>
							</View>
							<View style={[styles.tableCol]}>
								<Text style={styles.tableCell}>Gross Pay</Text>
							</View>
							<View style={[styles.tableCol]}>
								<Text style={styles.tableCell}>Total Deductions</Text>
							</View>
							<View style={[styles.tableCol]}>
								<Text style={styles.tableCell}>Net Pay</Text>
							</View>
						</View>
						{summary && (
							<View style={styles.tableRow}>
								<View style={[styles.tableCol]}>
									<Text style={styles.tableCell}>
										{summary.totalAllowances}
									</Text>
								</View>
								<View style={[styles.tableCol]}>
									<Text style={styles.tableCell}>{summary.grossPay}</Text>
								</View>
								<View style={[styles.tableCol]}>
									<Text style={styles.tableCell}>
										{" "}
										-{summary.totalDeductions}
									</Text>
								</View>
								<View style={[styles.tableCol]}>
									<Text style={styles.tableCell}>{summary.netPay}</Text>
								</View>
							</View>
						)}
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default EmployeePayslip;
