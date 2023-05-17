import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import { createEmployeeAllowance } from "../../store/Actions/employeeAllowanceAction";

const EmployeeAllowanceScreen = (props) => {
	const { employeeList, departmentList, allowanceList } = props;
	const dispatch = useDispatch();

	const { employees } = employeeList;
	const { departments } = departmentList;
	const { allowances } = allowanceList;

	const amountRef = useRef(null);
	// Local state for form inputs and allowance list
	const [department, setDepartment] = useState("");
	const [employeeId, setEmployeeId] = useState("");
	const [allowanceId, setAllowanceId] = useState("");
	const [amount, setAmount] = useState("");

	// // Fetch departments and employees on component mount
	useEffect(() => {
		// focus change when the allowance are select

		if (amountRef.current && allowanceId) {
			amountRef.current.focus();
		}
	}, [allowanceId]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			createEmployeeAllowance({
				employeeId,
				allowanceId,
				amount,
			})
		);
		setAllowanceId("");
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
					<h2 style={{ marginBottom: "3rem" }}>Add Employee Allowance</h2>
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
									<Form.Group controlId="allowanceSelect">
										<Form.Label>Allowance</Form.Label>
										<Form.Control
											as="select"
											value={allowanceId}
											onChange={(e) => setAllowanceId(e.target.value)}
										>
											<option value="">Select allowance</option>
											{allowances &&
												allowances.length > 0 &&
												allowances.map((allowance) => (
													<option key={allowance._id} value={allowance._id}>
														{allowance.name}
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
											ref={amountRef}
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

export default EmployeeAllowanceScreen;

// /* <Table striped responsive border={"2px"} hover className="table-sm ">
// 	<thead className="text-center">
// 		<tr>
// 			<th>S.No</th>
// 			<th>Allowance Name</th>
// 			<th>Amount</th>
// 			<th>Action</th>
// 		</tr>
// 	</thead>
// 	<tbody>
// 		{allowances &&
// 			allowances.length > 0 &&
// 			allowances.map((allowance) => (
// 				<tr key={allowance._id}>
// 					<td>{itemCount++}</td>
// 					<td>{allowance.name}</td>
// 					<td>
// 						<FormGroup controlId="amount">
// 							<Form.Control
// 								type="number"
// 								value={amount}
// 								onChange={(e) => setAmount(e.target.value)}
// 								// ref={amountRef}
// 								min={0}
// 							/>
// 						</FormGroup>
// 					</td>
// 					<td>
// 						<Button
// 							type="submit"
// 							onClick={employeeAllowanceHanlder}
// 							variant="primary"
// 						>
// 							Add
// 						</Button>
// 					</td>
// 				</tr>
// 			))}
// 	</tbody>
// </Table>; */
