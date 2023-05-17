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
	createDepartment,
	deleteDepartment,
	listDepartments,
} from "../../store/Actions/departmentAction";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { DEPARTMENT_CREATE_RESET } from "../../store/Constants/departmentConstant";

const DepartmentListScreen = ({ departmentList }) => {

	const [name, setName] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const dispatch = useDispatch();

	const { loading, error, departments } = departmentList;

	const departmentCreate = useSelector((state) => state.departmentCreate);
	const { success: departmentCreateSuccess, error: departmentCreateError } =
		departmentCreate;

	useEffect(() => {
		// dispatch(listDepartments());
		return () => {
			if (departmentCreateSuccess || departmentCreateError) {
				dispatch({ type: DEPARTMENT_CREATE_RESET });
			}
		};
	}, [dispatch, departmentCreateSuccess, departmentCreateError]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			await dispatch(createDepartment({ name }));
			await dispatch(listDepartments());
		} catch (error) {
			console.error(error);
			alert("Error creating department. Please try again.");
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
		await dispatch(deleteDepartment(deleteId));
		await dispatch(listDepartments());
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
							<Form.Label>Section</Form.Label>
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
				<ListGroup.Item className="rounded p-4">
					{departmentCreateError ? (
						<Message Message variant="danger">
							{departmentCreateError}
						</Message>
					) : (
						departmentCreateSuccess && (
							<Message Message variant="success">
								Section added successfully
							</Message>
						)
					)}
					{loading ? (
						<Loader />
					) : error ? (
						<Message Message variant="danger">
							{error}
						</Message>
					) : departments && departments.length > 0 ? (
						<>
							<h2>Sections List</h2>
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
										<th>Section Name</th>
										<th>Date</th>
										<th>ACTIONS</th>
									</tr>
								</thead>
								<tbody>
									{departments.map((department) => (
										<tr key={department._id}>
											<td>{itemCount++}</td>
											<td>{department.name}</td>
											<td>{department.createdAt.substring(0, 10)}</td>
											<td>
												<LinkContainer
													to={`/department/${department._id}/edit`}
													style={{ color: "#34d399", paddingRight: "10px" }}
												>
													<FontAwesomeIcon icon={faPenToSquare} role="button" />
												</LinkContainer>

												<FontAwesomeIcon
													icon={faTrash}
													onClick={() => handleShowModal(department._id)}
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
						<p>No Sections found!</p>
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

export default DepartmentListScreen;
