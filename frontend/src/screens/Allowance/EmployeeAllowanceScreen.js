import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, ListGroup, Row, Col, Table } from "react-bootstrap";
import {
	createEmployeeAllowance,
	listEmployeeAllowances,
} from "../../store/Actions/employeeAllowanceAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { EMPLOYEE_ALLOWANCE_CREATE_RESET } from "../../store/Constants/employeeAllowanceConstant";

const EmployeeAllowanceScreen = (props) => {
	const { employeeList, departmentList, allowanceList, employeeAllowanceList } =
		props;
	const dispatch = useDispatch();

	const { employees } = employeeList;
	const { departments } = departmentList;
	const {
		loading: loadingAllowance,
		error: errorAllowance,
		allowances,
	} = allowanceList;
	const { employeesAllowances } = employeeAllowanceList;

	// Local state for form inputs and allowance list
	const [department, setDepartment] = useState("");
	const [employeeId, setEmployeeId] = useState("");
	const [allowanceId, setAllowanceId] = useState("");
	const [amount, setAmount] = useState("");

	const [filterEmployees, setFilterEmployees] = useState([]);

	const employeeAllowanceCreate = useSelector(
		(state) => state.employeeAllowanceCreate
	);
	const {
		loading: loadingAllowanceCreate,
		success: successAllowanceCreate,
		error: errorAllowanceCreate,
	} = employeeAllowanceCreate;

	// // Fetch departments and employees on component mount
	useEffect(() => {
		if (department !== "") {
			setFilterEmployees(
				employees.filter((employee) => employee.departmentId === department)
			);
		}

		return () => {
			if (successAllowanceCreate || errorAllowanceCreate) {
				dispatch({ type: EMPLOYEE_ALLOWANCE_CREATE_RESET });
			}
		};
	}, [
		department,
		dispatch,
		employees,
		errorAllowanceCreate,
		successAllowanceCreate,
	]);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			await dispatch(
				createEmployeeAllowance({
					employeeId,
					allowanceId,
					amount,
				})
			);
			await dispatch(listEmployeeAllowances());
			setAmount("");
		} catch (error) {
			console.error(error);
			alert("Error creating allowance. Please try again.");
		}
	};

	let itemCount = 1;

	return (
		<>
			<ListGroup variant="flush">
				<ListGroup.Item
					className="mb-3"
					style={{
						backgroundColor: "#e2e8f0",
					}}
				>
					<h2 className="mb-3">Add Employee Allowance</h2>
					<Form onSubmit={submitHandler}>
						<Row className="mb-4">
							<Col md={4}>
								<Form.Group controlId="departmentSelect">
									<Form.Label>Section</Form.Label>
									<div className="position-relative">
										<Form.Control
											as="select"
											value={department}
											onChange={(e) => {
												setDepartment(e.target.value);
											}}
										>
											<option value="">Select section</option>
											{departments &&
												departments.length > 0 &&
												departments.map((d) => (
													<option key={d._id} value={d._id}>
														{d.name}
													</option>
												))}
										</Form.Control>
										<FontAwesomeIcon
											icon={faCaretDown}
											className="position-absolute top-50 end-0 translate-middle-y p-3"
											style={{ color: "#374653", pointerEvents: "none" }}
										/>
									</div>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="employeeSelect">
									<Form.Label>Employee</Form.Label>
									<div className="position-relative">
										<Form.Control
											as="select"
											value={employeeId}
											onChange={(e) => setEmployeeId(e.target.value)}
										>
											<option value="">Select employee</option>
											{filterEmployees &&
												filterEmployees.length > 0 &&
												filterEmployees.map((employee) => (
													<option key={employee._id} value={employee._id}>
														{employee.name}
													</option>
												))}
										</Form.Control>
										<FontAwesomeIcon
											icon={faCaretDown}
											className="position-absolute top-50 end-0 translate-middle-y p-3"
											style={{ color: "#374653", pointerEvents: "none" }}
										/>
									</div>
								</Form.Group>
							</Col>
							<Col md={4}>
								<Form.Group controlId="allowanceSelect">
									<Form.Label>Allownace</Form.Label>
									<div className="position-relative">
										<Form.Control
											as="select"
											value={allowanceId}
											onChange={(e) => setAllowanceId(e.target.value)}
										>
											<option value="">Select allowance</option>
											{allowances &&
												allowances.length &&
												allowances.map((allowance) => (
													<option key={allowance._id} value={allowance._id}>
														{allowance.name}
													</option>
												))}
										</Form.Control>
										<FontAwesomeIcon
											icon={faCaretDown}
											className="position-absolute top-50 end-0 translate-middle-y p-3"
											style={{ color: "#374653", pointerEvents: "none" }}
										/>
									</div>
								</Form.Group>
							</Col>
						</Row>
						<Row className="mb-3">
							<div className="d-flex align-items-center justify-content-center gap-5">
								<Col md={4}>
									<Form.Group controlId="amount">
										<Form.Label>Amount</Form.Label>
										<Form.Control
											type="number"
											value={amount}
											onChange={(e) => setAmount(e.target.value)}
											required
										/>
									</Form.Group>
								</Col>
								<Col md={2}>
									<Button variant="primary" type="submit" className="add-btn">
										Add
									</Button>
								</Col>
							</div>
						</Row>
					</Form>
				</ListGroup.Item>
				{successAllowanceCreate && (
					<Message variant="success">
						Employee allowance created successfully
					</Message>
				)}
				{errorAllowanceCreate && (
					<Message variant="danger">{errorAllowanceCreate}</Message>
				)}
				{loadingAllowance ? (
					<Loader />
				) : errorAllowance ? (
					<Message variant="danger">{errorAllowance}</Message>
				) : filterEmployees &&
				  filterEmployees.length > 0 &&
				  allowances &&
				  allowances.length > 0 ? (
					<ListGroup.Item className="rounded p-4">
						<h2>Employee Allowances</h2>
						<Form onSubmit={submitHandler} className="mb-3">
							<Table
								striped
								responsive
								border={"2px"}
								hover
								className="table-sm"
							>
								<thead>
									<tr>
										<th>S.No</th>
										<th>Employee</th>
										{allowances &&
											allowances.length > 0 &&
											allowances.map((allowance) => (
												<th key={allowance._id} className="text-center">
													{allowance.name}
												</th>
											))}
										<th className="text-center">Total Allowances</th>
									</tr>
								</thead>

								<tbody>
									{filterEmployees.map((employee) => (
										<tr key={employee._id}>
											<th>{itemCount++}</th>
											<td>{employee.name}</td>
											{employeesAllowances &&
												employeesAllowances.length > 0 &&
												allowances.map((allowance) => {
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
													return (
														<td
															key={`${employee._id}-${allowance._id}`}
															className="text-center"
														>
															{allowanceAmount}
														</td>
													);
												})}
											<td className="text-center">
												{employeesAllowances &&
													employeesAllowances.length > 0 &&
													employeesAllowances.find(
														(employeeAllowance) =>
															employeeAllowance.employeeId === employee._id
													)?.totalAllowances}
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Form>
					</ListGroup.Item>
				) : (
					<p className="p-3">No employee found!</p>
				)}
			</ListGroup>
		</>
	);
};

export default EmployeeAllowanceScreen;
