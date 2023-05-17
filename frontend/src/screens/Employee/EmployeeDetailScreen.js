import React, { useEffect, useRef } from "react";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Image, ListGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { getEmployeeDetails } from "../../store/Actions/employeeAction";

import logo from "../../assets/bise-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getEmployeeAllowanceDetails } from "../../store/Actions/employeeAllowanceAction";
import { getEmployeeDeductionDetails } from "../../store/Actions/employeeDeductionAction";
import EmployeePayslip from "./EmployePayslip";
import { getEmployeeBankDetails } from "../../store/Actions/bankAction";

const EmployeeDetailScreen = (props) => {
	const {
		departmentList,
		designationList,
		scaleList,
		allowanceList,
		deductionList,
	} = props;
	const dispatch = useDispatch();

	const params = useParams();
	const employeeId = params.id;

	const employeeDetails = useSelector((state) => state.employeeDetails);
	const {
		loading: employeeDetailsLoading,
		error: employeeDetailsError,
		employee,
	} = employeeDetails;

	const { departments } = departmentList;
	const { designations } = designationList;
	const { scales } = scaleList;
	const { allowances } = allowanceList;
	const { deductions } = deductionList;

	const bankDetails = useSelector((state) => state.bankDetails);
	const {
		loading: bankDetailsLoading,
		error: bankDetailsError,
		bankDetail,
	} = bankDetails;

	const employeeAllowanceDetails = useSelector(
		(state) => state.employeeAllowanceDetails
	);
	const { employeeAllowances } = employeeAllowanceDetails;

	const employeeDeductionDetails = useSelector(
		(state) => state.employeeDeductionDetails
	);
	const { employeeDeductions } = employeeDeductionDetails;

	const currentDate = new Date();

	useEffect(() => {
		const fetchData = async () => {
			dispatch(getEmployeeDetails(employeeId));
			dispatch(getEmployeeBankDetails(employeeId));
			dispatch(getEmployeeAllowanceDetails(employeeId));
			dispatch(getEmployeeDeductionDetails(employeeId));
		};

		fetchData();
	}, [dispatch, employeeId]);

	let years, months, days;

	if (employee && employee.entryDate) {
		const totalDays = Math.floor(
			(currentDate - new Date(employee.entryDate)) / (1000 * 60 * 60 * 24)
		);
		years = Math.floor(totalDays / 365);
		months = Math.floor((totalDays - years * 365) / 30);
		days = Math.floor((totalDays - years * 365) % 30);
	}

	let summary = {};

	if (employee && employeeAllowances && employeeDeductions) {
		summary = {
			basicPay: employee.basicPay,
			totalAllowances: employeeAllowances.totalAllowances,
			totalDeductions: employeeDeductions.totalDeductions,
			grossPay: employee.basicPay + employeeAllowances.totalAllowances,
			netPay:
				employee.basicPay +
				employeeAllowances.totalAllowances -
				employeeDeductions.totalDeductions,
		};
	}

	const lengthOfService = years ? (
		<span>
			{years} Years, {months} Months {days} Days
		</span>
	) : months ? (
		<span>
			{months} Months {days} Days
		</span>
	) : (
		<span>{days} Days</span>
	);

	if (
		employeeAllowances &&
		employeeDeductions &&
		employeeDetailsLoading &&
		bankDetailsLoading &&
		allowances &&
		deductions
	) {
		return <Loader />;
	}

	return employeeDetailsError ? (
		<Message variant="danger">{employeeDetailsError}</Message>
	) : bankDetailsError ? (
		<Message variant="danger">{bankDetailsError} </Message>
	) : (
		<>
			<div className="d-flex justify-content-between align-items-center">
				<Link
					to="/employees"
					className="btn btn-primary"
					style={{ width: "150px" }}
				>
					<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
					Go Back
				</Link>
				{employee && employeeAllowances && allowances && (
					<>
						<div>
							<PDFDownloadLink
								document={
									<EmployeePayslip
										employee={employee}
										employeeAllowances={employeeAllowances}
										employeeDeductions={employeeDeductions}
										departments={departments}
										designations={designations}
										scales={scales}
										years={years}
										months={months}
										days={days}
										allowances={allowances}
										deductions={deductions}
										summary={summary}
									/>
								}
								fileName={`${employee.name} ${currentDate.toLocaleString(
									"default",
									{
										month: "long",
									}
								)} ${currentDate.getUTCFullYear()} - payslip.pdf`}
							>
								{({ blob, url, loading, error }) =>
									loading ? (
										<Button type="button" className="btn download-btn">
											Loading document...
										</Button>
									) : (
										<Button type="button" className="btn download-btn">
											Download Payslip
										</Button>
									)
								}
							</PDFDownloadLink>
						</div>
					</>
				)}
			</div>

			<ListGroup variant="flush" className="rounded border p-4">
				<ListGroup.Item className="p-4">
					<Row style={{ alignItems: "center" }}>
						<Col md={10} className="text-center">
							<h3>Board of Intermediate & Secondary Eduction</h3>
							<h3>District Dera Ismail Khan</h3>
							<p>
								Monthly Salary Statement (
								{currentDate.toLocaleString("default", { month: "long" })}-{" "}
								{currentDate.getUTCFullYear()})
							</p>
						</Col>
						<Col md={2}>
							<Image
								src={logo}
								alt="board-logo"
								width={150}
								height={150}
								style={{ objectFit: "contain" }}
							/>
						</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item className="p-4">
					<div>
						<p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
							Personal Information of Mr{" "}
							{employee.name && employee.name.toUpperCase()} d/w/s of{" "}
							{employee.fatherName && employee.fatherName.toUpperCase()}
						</p>
					</div>

					<Row className="mb-2">
						<Col md={4}>
							<div className="info-item">
								<strong>Personnel Number:</strong> {employee.personnelNumber}
							</div>
							<div className="info-item">
								<strong>Date of Birth:</strong>{" "}
								{employee.dob && employee.dob.substring(0, 10)}
							</div>
						</Col>
						<Col md={4}>
							<div className="info-item">
								<strong>Entry Date:</strong>{" "}
								{employee.entryDate && employee.entryDate.substring(0, 10)}
							</div>

							<div className="info-item">
								<strong>CNIC:</strong> {employee.cnic}
							</div>
						</Col>
						<Col md={4}>
							<div className="info-item">
								<strong>NTN:</strong> {employee.NTN}
							</div>
							<div className="info-item">
								<strong>Status:</strong> {employee.status}
							</div>
						</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item className="p-4">
					<Row className="d-flex justify-content-between align-items-center mb-2">
						<Col md={6}>
							<div className="info-item">
								<strong>Designation:</strong>{" "}
								{designations &&
									designations.find(
										(designation) => designation._id === employee.designationId
									)?.name}
							</div>
							<div className="info-item">
								<strong>Section:</strong>{" "}
								{departments &&
									departments.find(
										(department) => department._id === employee.departmentId
									)?.name}
							</div>
							<div className="info-item">
								<strong>Scale:</strong>{" "}
								{scales &&
									scales.find((scale) => scale._id === employee.scaleId)?.name}
							</div>
						</Col>
						<Col md={6}>
							<div className="info-item">
								<strong>Length of Service:</strong> {lengthOfService}
							</div>
							<div className="info-item">
								<strong>Posting City:</strong> {employee.postingCity}
							</div>
							<div className="info-item">
								<strong>Gender:</strong> {employee.gender}
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={8}>
							<div className="info-item">
								<strong>Email:</strong>{" "}
								<a
									href={`mailto:${employee.email}`}
									style={{ color: "#0ea5e9", textDecoration: "none" }}
								>
									{employee.email}
								</a>{" "}
							</div>
							<div className="info-item">
								<strong>Permanent Address:</strong> {employee.permanentAddress}
							</div>
						</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item className="p-4">
					<h3 className="secondary-heading">Pay and Allowances</h3>
					<Table striped responsive border={"2px"} hover className="table-sm">
						<thead>
							<tr>
								<th>Wage Type</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Basic Pay</td>
								<td>
									{employee.basicPay && employee.basicPay.toLocaleString()}
								</td>
							</tr>
							{employeeAllowances &&
								employeeAllowances.allowances &&
								employeeAllowances.allowances.length > 0 &&
								employeeAllowances.allowances.map((employeeAllowance) => (
									<tr key={employeeAllowance._id}>
										<td>
											{allowances &&
												allowances.find(
													(allowance) =>
														allowance._id === employeeAllowance.allowanceId
												)?.name}
										</td>
										<td>{employeeAllowance.amount.toLocaleString()}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</ListGroup.Item>

				<ListGroup.Item className="p-4">
					<h3 className="secondary-heading">Deductions</h3>
					<Table striped responsive border={"2px"} hover className="table-sm">
						<thead>
							<tr>
								<th>Wage Type</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{employeeDeductions &&
								employeeDeductions.deductions &&
								employeeDeductions.deductions.length > 0 &&
								employeeDeductions.deductions.map((employeeDeduction) => (
									<tr key={employeeDeduction._id}>
										<td>
											{deductions &&
												deductions.find(
													(deduction) =>
														deduction._id === employeeDeduction.deductionId
												)?.name}
										</td>
										<td>{employeeDeduction.amount}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</ListGroup.Item>
				<ListGroup.Item className="p-4">
					<h2 className="secondary-heading">Summary</h2>
					<Table striped responsive border={"2px"} hover className="table-sm">
						<thead className="text-center">
							<tr>
								<th>Basic Pay</th>
								<th>Allowances</th>
								<th>Gross Pay</th>
								<th>Deductions</th>
								<th>Net Pay</th>
							</tr>
						</thead>
						<tbody className="text-center">
							{employee && employeeAllowances && employeeDeductions && (
								<tr>
									<td>{summary.basicPay}</td>
									<td>{summary.totalAllowances}</td>
									<td>{summary.grossPay}</td>
									<td>-{summary.totalDeductions}</td>
									<td>{summary.netPay}</td>
								</tr>
							)}
						</tbody>
					</Table>
				</ListGroup.Item>
				<ListGroup.Item className="p-4">
					<h3>Bank Details</h3>
					<Row className="d-flex justify-content-between align-items-center">
						<Col md={4}>
							<div className="info-item">
								<strong>Account Title:</strong> {bankDetail.accountTitle}
							</div>
							<div className="info-item">
								<strong>Acccount Number:</strong> {bankDetail.accountNumber}
							</div>
						</Col>
						<Col md={4}>
							<div className="info-item">
								<strong>Bank:</strong> {bankDetail.bank}, {bankDetail.branch}
							</div>
							<div className="info-item">
								<strong>Branch Code:</strong> {bankDetail.branchCode}
							</div>
						</Col>
					</Row>
				</ListGroup.Item>
			</ListGroup>
		</>
	);
};

export default EmployeeDetailScreen;

// <PDFDownloadLink
// 	document={
// 		<PayslipPDF
// 			employee={employee}
// 			allowances={allowances}
// 			employeeAllowances={employeeAllowances}
// 		/>
// 	}
// 	fileName="Employee-Payslip"
// >
// 	{({ blob, url, loading, error }) =>
// 		loading ? "Loading document..." : "Download now!"
// 	}
// </PDFDownloadLink>
