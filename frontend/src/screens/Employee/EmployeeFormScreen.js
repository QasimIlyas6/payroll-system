import { useEffect, useState } from "react";
import { Tabs, Tab, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
	createEmployee,
	listEmployees,
} from "../../store/Actions/employeeAction";

import Loader from "../../components/Loader";

import EmployeeInfoForm from "./EmployeeInfoForm";
import BankForm from "./BankForm";
import Message from "../../components/Message";
import { listScale } from "../../store/Actions/scaleAction";
import { listDepartments } from "../../store/Actions/departmentAction";
import { listDesignations } from "../../store/Actions/designationAction";
import { EMPLOYEE_CREATE_RESET } from "../../store/Constants/employeeConstant";
import { createBankDetails } from "../../store/Actions/bankAction";

const EmployeeFormScreen = ({ departmentList, scaleList, designationList }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [loading, setLoading] = useState(false);
	// define error state
	const [emailError, setEmailError] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");

	// define the employee data states using object destructer
	const [employeeData, setEmployeeData] = useState({
		name: "",
		fatherName: "",
		employeeType: "",
		departmentId: "",
		designationId: "",
		scaleId: "",
		basicPay: "",
		email: "",
		cnic: "",
		phoneNumber: "",
		whatsApp: "",
		dob: "",
		gender: "Male",
		status: "active",
		entryDate: "",
		NTN: "",
		permanentAddress: "",
		postingCity: "",
	});

	const [bankData, setBankData] = useState({
		accountTitle: "",
		bank: "",
		accountNumber: "",
		branch: "",
		branchCode: "",
	});

	const employeeCreate = useSelector((state) => state.employeeCreate);
	const {
		loading: employeeCreateLoading,
		success: employeeCreateSuccess,
		error: employeeCreateError,
	} = employeeCreate;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		// fetch initial data
		dispatch(listScale());
		dispatch(listDepartments());
		dispatch(listDesignations());
		setLoading(false);

		// create employee success
		if (employeeCreateSuccess) {
			dispatch(listEmployees());
			navigate("/employees");
		}

		// reset create employee state
		return () => {
			if (employeeCreateSuccess || employeeCreateError) {
				dispatch({ type: EMPLOYEE_CREATE_RESET });
			}
		};
	}, [dispatch, employeeCreateSuccess, employeeCreateError, navigate]);

	const handleNext = () => {
		setLoading(true);
		setCurrentStep(currentStep + 1);
		setLoading(false);
	};

	const handlePrevious = () => {
		setLoading(true);
		setCurrentStep(currentStep - 1);
		setLoading(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await dispatch(createEmployee(employeeData));
			await dispatch(createBankDetails(bankData));
		} catch (error) {
			console.error(error);
			alert("Employee is not created!", error.message);
		}
	};

	return (
		<Container fluid>
			<Tabs activeKey={currentStep} className="mb-3">
				<Tab eventKey={1} title="Employee Info" />
				<Tab eventKey={2} title="Bank Details" />
			</Tabs>

			{employeeCreateLoading && <Loader />}
			{employeeCreateError && (
				<Message variant="danger">{employeeCreateError}</Message>
			)}
			{!employeeCreateError && employeeCreateSuccess && (
				<Message variant="success">
					New employee are created successfully!
				</Message>
			)}
			<Form onSubmit={handleSubmit} className="p-4">
				{currentStep === 1 && (
					<>
						{loading ? (
							<Loader />
						) : (
							<>
								<EmployeeInfoForm
									departmentList={departmentList}
									designationList={designationList}
									scaleList={scaleList}
									employeeData={employeeData}
									setEmployeeData={setEmployeeData}
									emailError={emailError}
									setEmailError={setEmailError}
									phoneNumberError={phoneNumberError}
									setPhoneNumberError={setPhoneNumberError}
								/>
								<Row md={4} className="d-flex justify-content-end">
									<Col md={2}>
										<Button
											variant="secondary"
											onClick={handlePrevious}
											disabled
											style={{ width: "100%" }}
										>
											Previous
										</Button>
									</Col>
									<Col md={2}>
										<Button
											variant="primary"
											onClick={handleNext}
											style={{ width: "100%" }}
										>
											Next
										</Button>
									</Col>
								</Row>
							</>
						)}
					</>
				)}
				{currentStep === 2 && (
					<>
						<BankForm bankData={bankData} setBankData={setBankData} />
						<Row md={4} className="d-flex justify-content-end">
							<Col md={2}>
								<Button
									variant="secondary"
									onClick={handlePrevious}
									style={{ width: "100%" }}
								>
									Previous
								</Button>
							</Col>
							<Col md={2}>
								<Button
									variant="primary"
									type="submit"
									style={{ width: "100%" }}
								>
									Submit
								</Button>
							</Col>
						</Row>
					</>
				)}
			</Form>
		</Container>
	);
};

export default EmployeeFormScreen;
