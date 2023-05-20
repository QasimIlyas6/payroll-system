import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../../components/FormContainer";
import { Row, Col, Form, Button, ListGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

import {
	createAllowance,
	deleteAllowance,
	listAllowances,
} from "../../store/Actions/allowanceAction";
import { ALLOWANCE_CREATE_RESET } from "../../store/Constants/allowanceConstant";

const AllowanceListScreen = ({ allowanceList }) => {
	const [name, setName] = useState("");

	const [showModal, setShowModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const dispatch = useDispatch();

	const { loading, error, allowances } = allowanceList;

	const allowanceCreate = useSelector((state) => state.allowanceCreate);
	const { success: allowanceCreateSuccess, error: allowanceCreateError } =
		allowanceCreate;

	useEffect(() => {
		// dispatch(listAllowances());
		// call back funtion
		return () => {
			if (allowanceCreateSuccess || allowanceCreateError) {
				dispatch({ type: ALLOWANCE_CREATE_RESET });
			}
		};
	}, [dispatch, allowanceCreateSuccess, allowanceCreateError]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await dispatch(createAllowance({ name }));
			await dispatch(listAllowances());
		} catch (error) {
			console.error(error);
			alert("Error creating allowance. Please try again.");
		}
	};

	const handleShowModal = (id) => {
		setDeleteId(id);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setDeleteId(null);
		setShowModal(false);
	};

	const handleDelete = async () => {
		await dispatch(deleteAllowance(deleteId));
		await dispatch(listAllowances());
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
							<Form.Label>Allowance</Form.Label>
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
				{allowanceCreateSuccess && (
					<Message variant={"success"}>Allowance added successfully</Message>
				)}
				{allowanceCreateError && (
					<Message variant={"danger"}>{allowanceCreateError}</Message>
				)}
				<ListGroup.Item className="rounded p-4">
					{loading ? (
						<Loader />
					) : error ? (
						<Message Message variant="danger">
							{error}{" "}
						</Message>
					) : allowances && allowances.length > 0 ? (
						<>
							<h2>Allowances List</h2>
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
						</>
					) : (
						<p>No Allowances found!</p>
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

export default AllowanceListScreen;
