import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import Loader from "../../components/Loader";
import Message from "../../components/Message";

const EmployeeInfoForm = (props) => {
	const {
		departmentList,
		scaleList,
		designationList,
		employeeData,
		setEmployeeData,
		emailError,
		setEmailError,
		phoneNumberError,
		setPhoneNumberError,
	} = props;

	const { loading: scaleLoading, error: scaleError, scales } = scaleList;

	const {
		loading: designationLoading,
		error: designationError,
		designations,
	} = designationList;

	const {
		loading: departmentLoading,
		error: departmentError,
		departments,
	} = departmentList;

	function validateEmail(email) {
		const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
		return emailRegex.test(String(email).toLowerCase());
	}

	function validatePhoneNumber(number) {
		const phoneNumberRegex = /^(?:\+92|0)?(3\d{2})(\d{7})$/;

		return phoneNumberRegex.test(number);
	}

	const hanldePhoneNumberChange = (e) => {
		const number = e.target.value;
		setEmployeeData({ ...employeeData, phoneNumber: number });

		if (!validatePhoneNumber(number)) {
			setPhoneNumberError("Please enter a valid phone number");
		} else {
			setPhoneNumberError("");
		}
	};

	const handleEmailChange = (e) => {
		const emailValue = e.target.value;
		setEmployeeData({ ...employeeData, email: emailValue });

		if (!validateEmail(emailValue)) {
			setEmailError("Please enter a valid email address");
		} else {
			setEmailError("");
		}
	};

	if (scaleLoading || designationLoading || departmentLoading) {
		return <Loader />;
	}

	return scaleError ? (
		<Message variant={"danger"}> {scaleError}</Message>
	) : departmentError ? (
		<Message variant={"danger"}>{departmentError}</Message>
	) : designationError ? (
		<Message variant={"danger"}>{designationError}</Message>
	) : (
		<>
			<Row>
				<Col md={4}>
					<Form.Group controlId="name" className="mb-3">
						<Form.Label>
							Name<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							type="text"
							placeholder="Enter Name"
							value={employeeData.name}
							onChange={(e) =>
								setEmployeeData({ ...employeeData, name: e.target.value })
							}
							required
						/>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="fatherName" className="mb-3">
						<Form.Label>
							Father Name<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							type="text"
							placeholder="Enter Father Name"
							value={employeeData.fatherName}
							onChange={(e) =>
								setEmployeeData({
									...employeeData,
									fatherName: e.target.value,
								})
							}
							required
						/>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="employeeType" className="mb-3">
						<Form.Label>
							Employee Type<span className="text-danger">*</span>
						</Form.Label>
						<div className="position-relative">
							<Form.Control
								inline="true"
								as="select"
								value={employeeData.employeeType}
								onChange={(e) =>
									setEmployeeData({
										...employeeData,
										employeeType: e.target.value,
									})
								}
							>
								<option key="" value="">
									Select the employee type
								</option>
								<option key="Permenant" value="Permenant">
									Permenant
								</option>
								<option key="Deputation" value="Deputation">
									Deputation
								</option>
								<option key="Daily-and-Wages" value="Daily and Wages">
									Daily and Wages
								</option>
								<option key="Fix" value="Fix">
									Fix
								</option>
								<option key="Contract" value="Contract">
									Contract
								</option>
							</Form.Control>
							<FontAwesomeIcon
								icon={faCaretDown}
								className="position-absolute top-50 end-0 translate-middle-y p-3"
								style={{ color: "#374653", pointerEvents: "none" }}
							/>
						</div>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Group controlId="designation" className="mb-3">
						<Form.Label>
							Designation<span className="text-danger">*</span>
						</Form.Label>
						<div className="position-relative">
							<Form.Control
								inline="true"
								as="select"
								value={employeeData.designationId}
								onChange={(e) =>
									setEmployeeData({
										...employeeData,
										designationId: e.target.value,
									})
								}
								required
							>
								<option value="">Select the designation</option>
								{designations &&
									designations.length > 0 &&
									designations.map((designation) => (
										<option key={designation._id} value={designation._id}>
											{designation.name}
										</option>
									))}
							</Form.Control>
							<FontAwesomeIcon
								icon={faCaretDown}
								className="position-absolute top-50 end-0 translate-middle-y p-3"
								style={{ color: "#374653", pointerEvents: "none" }}
							/>
						</div>
					</Form.Group>
				</Col>

				<Col md={4}>
					<Form.Group controlId="department" className="mb-3">
						<Form.Label>
							Section<span className="text-danger">*</span>
						</Form.Label>
						<div className="position-relative">
							<Form.Control
								inline="true"
								as="select"
								value={employeeData.departmentId}
								onChange={(e) =>
									setEmployeeData({
										...employeeData,
										departmentId: e.target.value,
									})
								}
								required
							>
								<option value="">Select the section</option>
								{departments &&
									departments.length > 0 &&
									departments.map((department) => (
										<option key={department._id} value={department._id}>
											{department.name}
										</option>
									))}
							</Form.Control>
							<FontAwesomeIcon
								icon={faCaretDown}
								className="position-absolute top-50 end-0 translate-middle-y p-3"
								style={{ color: "#374653", pointerEvents: "none" }}
							/>
						</div>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="basicPay" className="mb-3">
						<Form.Label>
							Basic Pay<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							type="number"
							placeholder="Enter basic pay"
							value={employeeData.basicPay}
							onChange={(e) =>
								setEmployeeData({ ...employeeData, basicPay: e.target.value })
							}
							required
							min={0}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Group controlId="scale" className="mb-3">
						<Form.Label>
							BPS<span className="text-danger">*</span>
						</Form.Label>
						<div className="position-relative">
							<Form.Control
								inline="true"
								as="select"
								placeholder="Select the scale"
								value={employeeData.scaleId}
								onChange={(e) =>
									setEmployeeData({
										...employeeData,
										scaleId: e.target.value,
									})
								}
								required
							>
								<option value="">Select the scale</option>

								{scales &&
									scales.length > 0 &&
									scales.map((scale) => (
										<option key={scale._id} value={scale._id}>
											{scale.name}
										</option>
									))}
							</Form.Control>
							<FontAwesomeIcon
								icon={faCaretDown}
								className="position-absolute top-50 end-0 translate-middle-y p-3"
								style={{ color: "#374653", pointerEvents: "none" }}
							/>
						</div>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="gender" className="mb-3">
						<Form.Label>
							Gender<span className="text-danger">*</span>
						</Form.Label>
						<div className="position-relative">
							<Form.Control
								inline="true"
								as="select"
								value={employeeData.gender}
								onChange={(e) =>
									setEmployeeData({ ...employeeData, gender: e.target.value })
								}
							>
								<option key="Male" value="Male">
									Male
								</option>
								<option key="Female" value="Female">
									Female
								</option>
								<option key="Other" value="Other">
									Other
								</option>
							</Form.Control>
							<FontAwesomeIcon
								icon={faCaretDown}
								className="position-absolute top-50 end-0 translate-middle-y p-3"
								style={{ color: "#374653", pointerEvents: "none" }}
							/>
						</div>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="cnic" className="mb-3">
						<Form.Label>
							CNIC<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							type="text"
							placeholder="Enter a CNIC"
							value={employeeData.cnic}
							onChange={(e) =>
								setEmployeeData({ ...employeeData, cnic: e.target.value })
							}
							required
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Group controlId="dob" className="mb-3">
						<Form.Label>
							Date of Birth<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							type="date"
							placeholder="Enter date of birth"
							value={employeeData.dob}
							onChange={(e) =>
								setEmployeeData({
									...employeeData,
									dob: e.target.value,
								})
							}
							required
						/>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="email" className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							inline="true"
							type="email"
							placeholder="xyz@example.com"
							value={employeeData.email}
							onChange={handleEmailChange}
						/>
						{emailError && <div className="text-danger">{emailError}</div>}
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="phoneNumber" className="mb-3">
						<Form.Label>
							Phone Number<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							type="text"
							placeholder="Enter a phone number"
							value={employeeData.phoneNumber}
							onChange={hanldePhoneNumberChange}
						/>
						{phoneNumberError && (
							<div className="text-danger">{phoneNumberError}</div>
						)}
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Group controlId="whatsapp" className="mb-3">
						<Form.Label>WhatsApp</Form.Label>
						<Form.Control
							inline="true"
							type="text"
							placeholder="Enter a WhatsApp number"
							value={employeeData.whatsApp}
							onChange={(e) =>
								setEmployeeData({ ...employeeData, whatsApp: e.target.value })
							}
						/>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="ntn" className="mb-3">
						<Form.Label>NTN</Form.Label>
						<Form.Control
							inline="true"
							type="text"
							placeholder="Enter NTN number"
							value={employeeData.NTN}
							onChange={(e) =>
								setEmployeeData({ ...employeeData, NTN: e.target.value })
							}
						/>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="entryDate" className="mb-3">
						<Form.Label>
							Entry Date<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							type="date"
							placeholder="Enter entry date"
							value={employeeData.entryDate}
							onChange={(e) =>
								setEmployeeData({
									...employeeData,
									entryDate: e.target.value,
								})
							}
							required
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Group controlId="postingCity" className="mb-3">
						<Form.Label>
							Posting City<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							type="text"
							placeholder="Enter positing city"
							value={employeeData.postingCity}
							onChange={(e) =>
								setEmployeeData({
									...employeeData,
									postingCity: e.target.value,
								})
							}
							required
						/>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group controlId="status" className="mb-3">
						<Form.Label>
							Status<span className="text-danger">*</span>
						</Form.Label>
						<div className="position-relative">
							<Form.Control
								inline="true"
								as="select"
								value={employeeData.status}
								onChange={(e) =>
									setEmployeeData({ ...employeeData, status: e.target.value })
								}
							>
								<option key="active" value="active">
									Active
								</option>
								<option key="inactive" value="inactive">
									InActive
								</option>
							</Form.Control>
							<FontAwesomeIcon
								icon={faCaretDown}
								className="position-absolute top-50 end-0 translate-middle-y p-3"
								style={{ color: "#374653", pointerEvents: "none" }}
							/>
						</div>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={12}>
					<Form.Group controlId="address" className="mb-3">
						<Form.Label>
							Permenant Address<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							inline="true"
							as="textarea"
							placeholder="Enter permenant address"
							rows={"3"}
							cols={"3"}
							value={employeeData.permanentAddress}
							onChange={(e) =>
								setEmployeeData({
									...employeeData,
									permanentAddress: e.target.value,
								})
							}
							required
						/>
					</Form.Group>
				</Col>
			</Row>
		</>
	);
};

export default EmployeeInfoForm;
