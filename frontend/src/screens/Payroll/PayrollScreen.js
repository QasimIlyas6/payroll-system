import React from "react";
import { Button, Col, Form, ListGroup, Row, Table } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";

const PayrollScreen = () => {
	const submitHandler = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<ListGroup variant="flush">
				<ListGroup.Item
					className="mb-3"
					style={{
						backgroundColor: "#e2e8f0",
					}}
				>
					<FormContainer>
						<Form onSubmit={submitHandler} className="mb-3">
							<Form.Label>Allowance</Form.Label>
							<Row className="d-flex justify-content-between align-items-center">
								<Col md={4}>
									<Button type="submit" className="btn btn-primary">
										Generte
									</Button>
								</Col>
							</Row>
						</Form>
					</FormContainer>
				</ListGroup.Item>
				{/* <ListGroup.Item className="rounded p-4">
					<h2>Allowances List</h2>
					<Table striped responsive border={"2px"} hover className="table-sm">
						<thead>
							<tr>
								<th>S.No</th>
								<th>Allowance Name</th>
								<th>Date</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody>
							{allowances.map((allowance) => (
								<tr key={allowance._id}>
									<td>{itemCount++}</td>
									<td>{allowance.name}</td>
									<td>{allowance.createdAt.substring(0, 10)}</td>
									<td>
										<LinkContainer
											to={`/allowance/${allowance._id}/edit`}
											style={{ color: "#34d399", paddingRight: "10px" }}
										>
											<FontAwesomeIcon icon={faPenToSquare} role="button" />
										</LinkContainer>

										<FontAwesomeIcon
											icon={faTrash}
											onClick={() => handleShowModal(allowance._id)}
											role="button"
											style={{ color: "#f43f5e" }}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</ListGroup.Item> */}
			</ListGroup>
		</>
	);
};

export default PayrollScreen;
