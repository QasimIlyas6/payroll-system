import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Form, Button, ListGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
	createDesignation,
	deleteDesignation,
	listDesignations,
} from "../../store/Actions/designationAction";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { DESIGNATION_CREATE_RESET } from "../../store/Constants/designationConstant";

const DesignationListScreen = ({ designationList }) => {
	const [name, setName] = useState("");
	const dispatch = useDispatch();

	const { loading, error, designations } = designationList;

	const designationCreate = useSelector((state) => state.designationCreate);
	const { success: designationCreateSuccess, error: designationCreateError } =
		designationCreate;

	useEffect(() => {
		// call back funtion
		return () => {
			if (designationCreateSuccess || designationCreateError) {
				dispatch({ type: DESIGNATION_CREATE_RESET });
			}
		};
	}, [dispatch, designationCreateSuccess, designationCreateError]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await dispatch(createDesignation({ name }));
			await dispatch(listDesignations());
		} catch (error) {
			console.error(error);
			alert("Error creating allowance. Please try again.");
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
		await dispatch(deleteDesignation(deleteId));
		await dispatch(listDesignations());
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
							<Form.Label>Designation</Form.Label>
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
									<Button
										type="submit"
										variant="primary"
										className="btn btn-primary"
									>
										Add
									</Button>
								</Col>
							</Row>
						</Form>
					</FormContainer>
				</ListGroup.Item>
				{designationCreateError && (
					<Message variant={"danger"}>{designationCreateError}</Message>
				)}
				{designationCreateSuccess && (
					<Message variant={"success"}>
						{"Designation added successfully"}
					</Message>
				)}
				<ListGroup.Item className="rounded p-4">
					{loading ? (
						<Loader />
					) : error ? (
						<Message Message variant="danger">
							{error}{" "}
						</Message>
					) : designations && designations.length > 0 ? (
						<>
							<h2>Designation List</h2>
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
										<th>Designation Name</th>
										<th>Date</th>
										<th>ACTIONS</th>
									</tr>
								</thead>
								<tbody>
									{designations.map((designation) => (
										<tr key={designation._id}>
											<td>{itemCount++}</td>
											<td>{designation.name}</td>
											<td>{designation.createdAt.substring(0, 10)}</td>
											<td>
												<LinkContainer
													to={`/designation/${designation._id}/edit`}
													style={{ color: "#34d399", paddingRight: "10px" }}
												>
													<FontAwesomeIcon icon={faPenToSquare} role="button" />
												</LinkContainer>

												<FontAwesomeIcon
													icon={faTrash}
													onClick={() => handleShowModal(designation.id)}
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
						<p>No Designation found!</p>
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

export default DesignationListScreen;
