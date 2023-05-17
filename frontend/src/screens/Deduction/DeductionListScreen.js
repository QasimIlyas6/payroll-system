import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Form, Button, ListGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

import {
	createDeduction,
	deleteDeduction,
	listDeductions,
} from "../../store/Actions/deductionAction";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { DEDUCTION_CREATE_RESET } from "../../store/Constants/deductionConstant";

const DeductionListScreen = ({ deductionList }) => {
	const [name, setName] = useState("");

	const dispatch = useDispatch();

	const { loading, error, deductions } = deductionList;

	const deductionCreate = useSelector((state) => state.deductionCreate);
	const { success: deductionCreateSuccess, error: deductionCreateError } =
		deductionCreate;

	useEffect(() => {
		// call back funtion
		return () => {
			if (deductionCreateSuccess || deductionCreateError) {
				dispatch({ type: DEDUCTION_CREATE_RESET });
			}
		};
	}, [dispatch, deductionCreateSuccess, deductionCreateError]);

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			await dispatch(createDeduction({ name }));
			await dispatch(listDeductions());
		} catch (error) {
			console.error(error);
			alert("Error creating deduction. Please try again.");
		}
	};

	const [showModal, setShowModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const handleShowModal = (id) => {
		setDeleteId(id);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setDeleteId(null);
		setShowModal(false);
	};

	const handleDelete = async () => {
		await dispatch(deleteDeduction(deleteId));
		await dispatch(listDeductions());
		handleCloseModal();
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
					<FormContainer>
						<Form onSubmit={submitHandler} className="mb-3">
							<Form.Label>Deduction</Form.Label>
							<Row className="d-flex justify-content-between align-items-center">
								<Col md={8}>
									<Form.Group controlId="name">
										<Form.Control
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											className="p-2 rounded"
											style={{
												border: "1px solid #e5e7eb",
												backgroundColor: "#ffff",
											}}
											required
										/>
									</Form.Group>
								</Col>
								<Col md={4}>
									<Button type="submit" className="btn btn-primary">
										Add
									</Button>
								</Col>
							</Row>
						</Form>
					</FormContainer>
				</ListGroup.Item>
				{deductionCreateError && (
					<Message variant={"danger"}>{deductionCreateError}</Message>
				)}
				{deductionCreateSuccess && (
					<Message variant={"success"}>
						New deduction are added successfully
					</Message>
				)}
				<ListGroup.Item className="rounded p-4">
					{loading ? (
						<Loader />
					) : error ? (
						<Message Message variant="danger">
							{error}{" "}
						</Message>
					) : deductions && deductions.length > 0 ? (
						<>
							<h2>Deduction List</h2>
							<Table
								striped
								responsive
								border={"2px"}
								hover
								className="table-sm"
							>
								<thead>
									<tr>
										<th>s.no</th>
										<th>Deduction Name</th>
										<th>Date</th>
										<th>ACTIONS</th>
									</tr>
								</thead>
								<tbody>
									{deductions.map((deduction) => (
										<tr key={deduction._id}>
											<td>{itemCount++}</td>
											<td>{deduction.name}</td>
											<td>{deduction.createdAt.substring(0, 10)}</td>
											<td>
												<LinkContainer
													to={`/deduction/${deduction._id}/edit`}
													style={{ color: "#34d399", paddingRight: "10px" }}
												>
													<FontAwesomeIcon icon={faPenToSquare} role="button" />
												</LinkContainer>

												<FontAwesomeIcon
													icon={faTrash}
													onClick={() => handleShowModal(deduction._id)}
													role="button"
													style={{ color: "#f43f5e" }}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</>
					) : (
						<p>No Deductions found!</p>
					)}
				</ListGroup.Item>
			</ListGroup>
			<DeleteConfirmationModal
				show={showModal}
				handleClose={handleCloseModal}
				handleDelete={handleDelete}
			/>
		</>
	);
};

export default DeductionListScreen;
