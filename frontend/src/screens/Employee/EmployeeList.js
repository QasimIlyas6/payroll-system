import {
	faAdd,
	faAngleLeft,
	faAngleRight,
	faPenToSquare,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { ListGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import {
	deleteEmployee,
	listEmployees,
} from "../../store/Actions/employeeAction";

import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import { EMPLOYEE_CREATE_RESET } from "../../store/Constants/employeeConstant";
import { Form, Link } from "react-router-dom";

const EmployeeList = (props) => {
	const { employeeList, designationList, scaleList, departmentList } = props;

	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const { loading: departmentLoading, departments } = departmentList;
	const { loading: designationLoading, designations } = designationList;
	const { loading: scaleLoading, scales } = scaleList;
	const {
		loading: employeeListLoading,
		error: employeeListError,
		employees,
	} = employeeList;

	const employeeCreate = useSelector((state) => state.employeeCreate);
	const { success: employeeCreateSuccess, error: employeeCreateError } =
		employeeCreate;

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	const handleSearch = (e) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm);

		const filteredResults = employees.filter((employee) =>
			employee.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setSearchResults(filteredResults);
		console.log(searchResults);
	};

	useEffect(() => {
		if (employees) {
			setSearchResults(employees);
		}
		return () => {
			if (employeeCreateError || employeeCreateSuccess) {
				dispatch({ type: EMPLOYEE_CREATE_RESET });
			}
		};
	}, [dispatch, employeeCreateError, employeeCreateSuccess, employees]);

	const handleShowModal = (id) => {
		setDeleteId(id);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setDeleteId(null);
		setShowModal(false);
	};

	const handleDelete = async () => {
		await dispatch(deleteEmployee(deleteId));
		await dispatch(listEmployees());
		handleCloseModal();
	};

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const totalItems = employees ? employees.length : null;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	const handlePrevClick = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const handleNextClick = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};

	if (
		employeeListLoading ||
		departmentLoading ||
		scaleLoading ||
		designationLoading
	) {
		return <Loader />;
	}

	let itemCount = 1;

	return (
		<ListGroup variant="flush">
			<ListGroup.Item className="rounded p-3">
				{!employeeListLoading && employeeListError ? (
					<Message variant="danger">{employeeListError}</Message>
				) : employees && employees.length > 0 ? (
					<>
						<div className="d-flex justify-content-between">
							<h2>Employees</h2>
							<input
								type="text"
								placeholder="Search employee..."
								value={searchTerm}
								onChange={handleSearch}
								className="search-bar"
							/>

							<Link
								to="/employee-form"
								className="text-center mb-3"
								style={{
									textDecoration: "none",
									fontSize: ".8rem",
									color: "#fff",
									backgroundColor: "#1f2937",
									width: "auto",
									borderRadius: "50px",
									padding: ".4rem .8rem",
								}}
							>
								<FontAwesomeIcon icon={faAdd} style={{ marginRight: "5px" }} />
								Add Employee
							</Link>
						</div>

						<Table
							striped
							responsive
							border={"2px"}
							hover
							className="table-sm"
							style={{ fontSize: "15px" }}
						>
							<thead>
								<tr>
									<th>S.No</th>
									<th>Name</th>
									<th>Father Name</th>
									<th>CNIC</th>
									<th>Section</th>
									<th>Designation</th>
									<th>Scale</th>
									<th>Basic Pay</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{searchResults &&
									searchResults.length > 0 &&
									searchResults.slice(startIndex, endIndex).map((employee) => (
										<tr key={employee._id}>
											<td>{itemCount++}</td>
											<td>{employee.name}</td>
											<td>{employee.fatherName}</td>
											<td>{employee.cnic}</td>
											<td>
												{departments &&
													departments.find(
														(department) =>
															department._id === employee.departmentId
													)?.name}
											</td>
											<td>
												{designations &&
													designations.find(
														(designation) =>
															designation._id === employee.designationId
													)?.name}
											</td>
											<td>
												{scales &&
													scales.find((scale) => scale._id === employee.scaleId)
														?.name}
											</td>
											<td>{employee.basicPay}</td>
											<td>{employee.status}</td>
											<td className="d-flex align-item-center">
												<LinkContainer
													to={`/employee-pay-slip/${employee._id}`}
													style={{ color: "#1e3152", paddingRight: "3px" }}
												>
													<button type="button" className="payslip-btn">
														Payslip
													</button>
												</LinkContainer>
												<LinkContainer
													to={`/employee/edit/${employee._id}`}
													style={{ color: "#34d399", paddingRight: "6px" }}
												>
													<FontAwesomeIcon icon={faPenToSquare} role="button" />
												</LinkContainer>
												<FontAwesomeIcon
													icon={faTrash}
													onClick={() => handleShowModal(employee._id)}
													role="button"
													style={{ color: "#f43f5e" }}
												/>
											</td>
										</tr>
									))}
							</tbody>
						</Table>
						{searchResults.length === 0 && (
							<p className="p-4">Employee not found!</p>
						)}
						<div className="d-flex justify-content-end mt-3">
							<button
								className="btn btn-light me-2"
								disabled={currentPage === 1}
								onClick={handlePrevClick}
							>
								<FontAwesomeIcon icon={faAngleLeft} />
							</button>
							<button
								className="btn btn-light"
								disabled={currentPage === totalPages}
								onClick={handleNextClick}
							>
								<FontAwesomeIcon icon={faAngleRight} />
							</button>
						</div>
					</>
				) : (
					<p>No Employees are found!</p>
				)}
			</ListGroup.Item>
			<DeleteConfirmationModal
				show={showModal}
				handleClose={handleCloseModal}
				handleDelete={handleDelete}
			/>
		</ListGroup>
	);
};

export default EmployeeList;
