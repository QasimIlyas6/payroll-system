import { useEffect, useState } from "react";
import { Tabs, Tab, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
	getEmployeeDetails,
	listEmployees,
	updateEmployee,
} from "../../store/Actions/employeeAction";

import Loader from "../../components/Loader";

import EmployeeInfoForm from "./EmployeeInfoForm";
import BankForm from "./BankForm";
import Message from "../../components/Message";
import { listScale } from "../../store/Actions/scaleAction";
import { listDepartments } from "../../store/Actions/departmentAction";
import { listDesignations } from "../../store/Actions/designationAction";
import { useNavigate, useParams } from "react-router-dom";
import { EMPLOYEE_CREATE_RESET } from "../../store/Constants/employeeConstant";
import { getEmployeeBankDetails } from "../../store/Actions/bankAction";

const EmployeeEditScreen = ({ departmentList, scaleList, designationList }) => {
	const [currentStep, setCurrentStep] = useState(1);
	const [loading, setLoading] = useState(false);
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

	const employeeDetails = useSelector((state) => state.employeeDetails);
	const {
		loading: employeeLoading,
		error: employeeError,
		employee,
	} = employeeDetails;

	const bankDetails = useSelector((state) => state.bankDetails);
	const {
		loading: bankDetailsLoading,
		error: bankDetailsError,
		bankDetail,
	} = bankDetails;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const params = useParams();

	const employeeId = params.id;
	useEffect(() => {
		setLoading(true);
		// fetch initial data
		dispatch(listScale());
		dispatch(listDepartments());
		dispatch(listDesignations());

		// create employee success
		if (employeeCreateSuccess) {
			dispatch(listEmployees());
			navigate("/employees");
		}

		// get employee details and bank details
		if (employee && !employeeData.name) {
			dispatch(getEmployeeDetails(employeeId));
			dispatch(getEmployeeBankDetails(employeeId));
		}

		// update employee basic information and bank details
		if (employee) {
			setEmployeeData((prev) => ({
				...prev,
				name: employee.name,
				fatherName: employee.fatherName,
				employeeType: employee.employeeType,
				departmentId: employee.departmentId,
				designationId: employee.designationId,
				scaleId: employee.scaleId,
				basicPay: employee.basicPay,
				email: employee.email,
				cnic: employee.cnic,
				phoneNumber: employee.phoneNumber,
				whatsApp: employee.whatsApp,
				dob: employee.dob && employee.dob.toString().split("T")[0],
				gender: employee.gender,
				status: employee.status,
				entryDate:
					employee.entryDate && employee.entryDate.toString().split("T")[0],
				NTN: employee.NTN,
				permanentAddress: employee.permanentAddress,
				postingCity: employee.postingCity,
			}));

			setBankData((prev) => ({
				...prev,
				accountTitle: bankDetail.accountTitle,
				accountNumber: bankDetail.accountNumber,
				bank: bankDetail.bank,
				branch: bankDetail.branch,
				branchCode: bankDetail.branchCode,
			}));
		}

		setLoading(false);

		// reset create employee state
		return () => {
			if (employeeCreateSuccess || employeeCreateError) {
				dispatch({ type: EMPLOYEE_CREATE_RESET });
			}
		};
	}, [
		dispatch,
		employeeCreateSuccess,
		employeeCreateError,
		navigate,
		employeeId,
		employeeData.name,
		employeeData._id,
		employee,

		bankDetail,
	]);

	const [emailError, setEmailError] = useState("");
	const [phoneNumberError, setPhoneNumberError] = useState("");

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
			await dispatch(updateEmployee(employeeId));
			await dispatch(employeeId);
		} catch (error) {
			console.error(error);
			alert("Employee is not update", error.message);
		}
	};

	if (employeeLoading || bankDetailsLoading) {
		return <Loader />;
	}

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
				<Message variant="success">Employee are updated successfully!</Message>
			)}
			<Form onSubmit={handleSubmit} className="p-4">
				{currentStep === 1 && employee && (
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
				{currentStep === 2 && bankDetail && (
					<>
						{loading ? (
							<Loader />
						) : (
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
											Update
										</Button>
									</Col>
								</Row>
							</>
						)}
					</>
				)}
			</Form>
		</Container>
	);
};

export default EmployeeEditScreen;
