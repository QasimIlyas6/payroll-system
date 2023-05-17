import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Col, Row, ListGroup } from "react-bootstrap";
import { createEmployeeDeduction } from "../../store/Actions/employeeDeductionAction";

const EmployeedeductionScreen = (props) => {
	const { employeeList, departmentList, deductionList } = props;
	const dispatch = useDispatch();

	const { employees } = employeeList;
	const { departments } = departmentList;
	const { deductions } = deductionList;

	// Local state for form inputs and deduction list
	const [department, setDepartment] = useState("");
	const [employeeId, setEmployeeId] = useState("");
	const [deductionId, setDeductionId] = useState("");
	const [amount, setAmount] = useState("");

	// // Fetch departments and employees on component mount
	// useEffect(() => {
	// 	// Filter employees by selected department

	// }, []);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			createEmployeeDeduction({
				employeeId,
				deductionId,
				amount,
			})
		);
		setDeductionId("");
		setAmount("");
	};

	let filterEmployees = [];

	if (department !== "") {
		filterEmployees = employees.filter(
			(employee) => employee.departmentId === department
		);
	}

	return (
		<>
			<ListGroup variant="flush">
				<ListGroup.Item
					className="mb-3"
					style={{
						backgroundColor: "#e2e8f0",
					}}
				>
					<h2 style={{ marginBottom: "3rem" }}>Add Employee Deduction</h2>

					<Form onSubmit={submitHandler} className="mb-3">
						<Row className="mb-4">
							<Col md={6}>
								<Form.Group controlId="departmentSelect">
									<Form.Label>Section</Form.Label>
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
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group controlId="employeeSelect">
									<Form.Label>Employee</Form.Label>
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
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<div className="d-flex align-items-center justify-content-between">
								<Col md={4}>
									<Form.Group controlId="deductionSelect">
										<Form.Label>Deduction</Form.Label>
										<Form.Control
											as="select"
											value={deductionId}
											onChange={(e) => setDeductionId(e.target.value)}
										>
											<option value="">Select deduction</option>
											{deductions &&
												deductions.length &&
												deductions.map((deduction) => (
													<option key={deduction._id} value={deduction._id}>
														{deduction.name}
													</option>
												))}
										</Form.Control>
									</Form.Group>
								</Col>
								<Col md={4}>
									<Form.Group controlId="amount">
										<Form.Label>Amount</Form.Label>
										<Form.Control
											type="text"
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
			</ListGroup>
		</>
	);
};

export default EmployeedeductionScreen;
