import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Image, ListGroup, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import logo from "../../assets/bise-logo.png";

import { listEmployeeAllowances } from "../../store/Actions/employeeAllowanceAction";
import { listEmployeeDeductions } from "../../store/Actions/employeeDeductionAction";

const EmployeePayRoll = (props) => {
	const {
		employeeList,
		designationList,
		scaleList,
		allowanceList,
		deductionList,
		employeeAllowanceList,
		employeeDeductionList,
	} = props;

	const dispatch = useDispatch();

	const { designations, loading: designationLoading } = designationList;
	const { scales, loading: scaleLoading } = scaleList;
	const { allowances, loading: allowanceLoading } = allowanceList;
	const { employeesAllowances } = employeeAllowanceList;
	const { deductions, loading: deductionLoading } = deductionList;
	const { employeesDeductions } = employeeDeductionList;
	const {
		loading: employeeListLoading,
		error: employeeListError,
		employees,
	} = employeeList;

	const employeeAllowanceCreate = useSelector(
		(state) => state.employeeAllowanceCreate
	);
	const { success: employeeAllowanceCreateSuccess } = employeeAllowanceCreate;

	const employeeDeductionCreate = useSelector(
		(state) => state.employeeDeductionCreate
	);
	const { success: employeeDeductionCreateSuccess } = employeeDeductionCreate;

	useEffect(() => {
		const fetchData = async () => {
			if (employeeAllowanceCreateSuccess || employeeDeductionCreateSuccess) {
				dispatch(listEmployeeAllowances());
				dispatch(listEmployeeDeductions());
			}
		};
		fetchData();
	}, [
		dispatch,
		employeeAllowanceCreateSuccess,
		employeeDeductionCreateSuccess,
	]);

	const employeeAllowanceDetails = useSelector(
		(state) => state.employeeAllowanceDetails
	);
	const { employeeAllowances } = employeeAllowanceDetails;

	const employeeDeductionDetails = useSelector(
		(state) => state.employeeDeductionDetails
	);
	const { employeeDeductions } = employeeDeductionDetails;

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 7;
	const totalItems = employees ? employees.length : null;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const handlePrevClick = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const handleNextClick = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	if (
		employeeListLoading ||
		allowanceLoading ||
		deductionLoading ||
		scaleLoading ||
		designationLoading
	) {
		return <Loader />;
	}

	const currentDate = new Date();

	return !employeeListLoading && employeeListError ? (
		<Message variant="danger">{employeeListError}</Message>
	) : employees.length > 0 ? (
		<ListGroup variant="flush">
			<ListGroup.Item className="rounded p-3">
				<>
					<Row className="text-center">
						<Col md={10}>
							<h2>Board of Intermediate & secondary eduction</h2>
							<h3>dera ismail khan</h3>
							<p>
								Pay Bill for Month{" "}
								<strong>
									{currentDate.toLocaleString("default", { month: "long" })},{" "}
									{currentDate.getFullYear()}
								</strong>
							</p>
						</Col>
						<Col md={2}>
							<Image
								src={logo}
								alt="board-logo"
								width={100}
								height={100}
								style={{ objectFit: "contain" }}
							/>
						</Col>
					</Row>
					{employees &&
						allowances &&
						employeesAllowances &&
						employeesAllowances.length > 0 &&
						employeesDeductions &&
						employeesDeductions.length > 0 &&
						allowances.length > 0 &&
						employees.length > 0 &&
						employees &&
						employees.length > 0 && (
							<>
								<Table
									striped
									bordered
									responsive
									border={"2px"}
									hover
									className="table-sm text-center"
									style={{ fontSize: "14px" }}
								>
									<thead
										style={{
											backgroundColor: "#e5e5e5",
											color: "#444",
											fontWeight: "600",
										}}
									>
										<tr>
											<th
												rowSpan={4}
												style={{ textAlign: "center", verticalAlign: "middle" }}
											>
												Particulars
											</th>

											{employees.slice(startIndex, endIndex).map((employee) => (
												<td key={employee._id}>{employee.name}</td>
											))}
										</tr>
										<tr>
											{employees.slice(startIndex, endIndex).map((employee) => (
												<td key={employee._id}>
													{designations &&
														designations.find(
															(designation) =>
																designation._id === employee.designationId
														)?.name}
												</td>
											))}
										</tr>
										<tr>
											{employees.slice(startIndex, endIndex).map((employee) => (
												<td key={employee._id}>
													{scales &&
														scales.find(
															(scale) => scale._id === employee.scaleId
														)?.name}
												</td>
											))}
										</tr>
									</thead>
									<tbody>
										<tr>
											<th style={{ textAlign: "left" }}>
												<strong>Basic Pay</strong>{" "}
											</th>
											{employees.slice(startIndex, endIndex).map((employee) => (
												<td key={employee._id}>
													<strong>{employee.basicPay.toLocaleString()}</strong>
												</td>
											))}
										</tr>
										{allowances.map((allowance) => (
											<tr>
												<td style={{ textAlign: "left" }}>{allowance.name}</td>
												{employees
													.slice(startIndex, endIndex)
													.map((employee) => {
														const employeeAllowance = employeesAllowances.find(
															(employeeAllowance) =>
																employeeAllowance.employeeId === employee._id &&
																employeeAllowance.allowances.some(
																	(allowanceItem) =>
																		allowanceItem.allowanceId === allowance._id
																)
														);
														const allowanceAmount =
															employeeAllowance?.allowances.find(
																(allowanceItem) =>
																	allowanceItem.allowanceId === allowance._id
															)?.amount ?? "-";
														return <td>{allowanceAmount}</td>;
													})}
											</tr>
										))}
										<tr>
											<th>
												<strong>Gross Pay</strong>{" "}
											</th>
											{employees.slice(startIndex, endIndex).map((employee) => {
												const employeeAllowance = employeesAllowances.find(
													(employeeAllowance) =>
														employeeAllowance.employeeId === employee._id
												);
												return (
													<td>
														<strong>
															{employeeAllowance && employee.basicPay
																? (
																		employeeAllowance.totalAllowances +
																		employee.basicPay
																  ).toLocaleString()
																: "-"}
														</strong>
													</td>
												);
											})}
										</tr>
										<tr
											style={{
												backgroundColor: "#082f49",
											}}
										>
											<th colSpan={8}>
												<strong style={{ color: "#fff" }}>Deductions</strong>
											</th>
										</tr>
										{deductions.map((deduction) => (
											<tr>
												<td style={{ textAlign: "left" }}>{deduction.name}</td>
												{employees
													.slice(startIndex, endIndex)
													.map((employee) => {
														const employeeDeduction = employeesDeductions.find(
															(employeeDeduction) =>
																employeeDeduction.employeeId === employee._id &&
																employeeDeduction.deductions.some(
																	(deductionItem) =>
																		deductionItem.deductionId === deduction._id
																)
														);
														const deductionAmount =
															employeeDeduction?.deductions.find(
																(deductionItem) =>
																	deductionItem.deductionId === deduction._id
															)?.amount ?? "-";
														return <td>{deductionAmount}</td>;
													})}
											</tr>
										))}
										<tr>
											<th>
												<strong>Payable Amount</strong>{" "}
											</th>
											{employees.slice(startIndex, endIndex).map((employee) => {
												const employeeAllowance = employeesAllowances.find(
													(employeeAllowance) =>
														employeeAllowance.employeeId === employee._id
												);
												const employeeDeduction = employeesDeductions.find(
													(employeeDeduction) =>
														employeeDeduction.employeeId === employee._id
												);

												return (
													<td>
														<strong>
															{employeeAllowance &&
															employee.basicPay &&
															employeeDeduction
																? (
																		employeeAllowance.totalAllowances +
																		employee.basicPay -
																		employeeDeduction.totalDeductions
																  ).toLocaleString()
																: "-"}
														</strong>
													</td>
												);
											})}
										</tr>
									</tbody>
								</Table>
								<div className="d-flex justify-content-end mt-3">
									<button
										className="btn btn-light me-2"
										disabled={currentPage === 1}
										onClick={handlePrevClick}
									>
										<FontAwesomeIcon icon={faAngleLeft} />
									</button>
									<button
										className="btn btn-light"
										disabled={currentPage === totalPages}
										onClick={handleNextClick}
									>
										<FontAwesomeIcon icon={faAngleRight} />
									</button>
								</div>
							</>
						)}
				</>
			</ListGroup.Item>
		</ListGroup>
	) : (
		<p>Employees are not found!</p>
	);
};

export default EmployeePayRoll;
