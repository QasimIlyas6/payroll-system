import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../../components/FormContainer";
import { Row, Col, Form, Button, ListGroup, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
	createScale,
	deleteScale,
	listScale,
} from "../../store/Actions/scaleAction";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { SCALE_CREATE_RESET } from "../../store/Constants/scaleConstant";

const ScaleListScreen = ({ scaleList }) => {
	const [name, setName] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const dispatch = useDispatch();

	const { loading, error, scales } = scaleList;

	const scaleCreate = useSelector((state) => state.scaleCreate);
	const { success: scaleCreateSuccess, error: scaleCreateError } = scaleCreate;

	useEffect(() => {
		// dispatch(listScale());
		return () => {
			if (scaleCreateSuccess || scaleCreateError) {
				dispatch({ type: SCALE_CREATE_RESET });
			}
		};
	}, [dispatch, scaleCreateSuccess, scaleCreateError]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await dispatch(createScale({ name }));
			await dispatch(listScale());
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
		await dispatch(deleteScale(deleteId));
		await dispatch(listScale());
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
							<Form.Label>Scale</Form.Label>
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
				{scaleCreateError && (
					<Message variant={"danger"}>{scaleCreateError}</Message>
				)}
				{scaleCreateSuccess && (
					<Message variant={"success"}>
						New scale are added successfully
					</Message>
				)}
				<ListGroup.Item className="rounded p-4">
					{loading ? (
						<Loader />
					) : error ? (
						<Message Message variant="danger">
							{error}
						</Message>
					) : scales && scales.length > 0 ? (
						<>
							<h1>Scale List</h1>

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
										<th>Scale Name</th>
										<th>Date</th>
										<th>ACTIONS</th>
									</tr>
								</thead>
								<tbody>
									{scales.map((scale) => (
										<tr key={scale._id}>
											<td>{itemCount++}</td>
											<td>{scale.name}</td>
											<td>{scale.createdAt.substring(0, 10)}</td>
											<td>
												<LinkContainer
													to={`/scale/${scale._id}/edit`}
													style={{ color: "#34d399", paddingRight: "10px" }}
												>
													<FontAwesomeIcon icon={faPenToSquare} role="button" />
												</LinkContainer>

												<FontAwesomeIcon
													icon={faTrash}
													onClick={() => handleShowModal(scale.id)}
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
						<p>No Scales found!</p>
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

export default ScaleListScreen;
