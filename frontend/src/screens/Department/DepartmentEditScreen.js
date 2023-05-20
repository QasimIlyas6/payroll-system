import React, { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	getDepartmentDetails,
	updateDepartment,
} from "../../store/Actions/departmentAction";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { DEPARTMENT_UPDATE_RESET } from "../../store/Constants/departmentConstant";

const DepartmentEditScreen = () => {
	const [name, setName] = useState("");

	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const departmentId = params.id;
	console.log(params.id);

	const departmentDetails = useSelector((state) => state.departmentDetails);
	const { loading, error, department } = departmentDetails;

	const departmentUpdate = useSelector((state) => state.departmentUpdate);
	const { success: successUpdate, error: successError } = departmentUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: DEPARTMENT_UPDATE_RESET });
			navigate("/departments");
		} else {
			if (!department.name || department._id !== departmentId) {
				dispatch(getDepartmentDetails(departmentId));
			} else {
				setName(department.name);
			}
		}
	}, [dispatch, navigate, successUpdate, department, departmentId]);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			dispatch(updateDepartment(departmentId));
		} catch (error) {
			console.error(error);
			alert("Error updating department. Please try again.");
		}
	};
	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
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
							Update
						</Button>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default DepartmentEditScreen;
