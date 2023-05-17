import { Form, Row, Col } from "react-bootstrap";

const BankForm = ({ bankData, setBankData }) => {
	console.log("bank data: ", bankData);

	return (
		<>
			<div style={{ width: "480px", margin: "0 auto" }}>
				<Row>
					<Col md={12}>
						<Form.Group controlId="accountTitle" className="mb-3">
							<Form.Label>
								Account Title<span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								inline="true"
								type="text"
								placeholder="Enter account title"
								required
								value={bankData.accountTitle}
								onChange={(e) =>
									setBankData({ ...bankData, accountTitle: e.target.value })
								}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="bankName" className="mb-3">
							<Form.Label>
								Bank<span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								inline="true"
								type="text"
								placeholder="Enter bank name"
								required
								value={bankData.bank}
								onChange={(e) =>
									setBankData({ ...bankData, bank: e.target.value })
								}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="branchName" className="mb-3">
							<Form.Label>
								Branch<span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								inline="true"
								type="text"
								placeholder="Enter branch"
								required
								value={bankData.branch}
								onChange={(e) =>
									setBankData({ ...bankData, branch: e.target.value })
								}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="accountNumber" className="mb-3">
							<Form.Label>
								Account Number<span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								inline="true"
								type="text"
								placeholder="Enter account number"
								required
								value={bankData.accountNumber}
								onChange={(e) =>
									setBankData({ ...bankData, accountNumber: e.target.value })
								}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={12}>
						<Form.Group controlId="branchCode" className="mb-3">
							<Form.Label>
								Branch Code<span className="text-danger">*</span>
							</Form.Label>
							<Form.Control
								inline="true"
								type="text"
								placeholder="Enter branch code"
								required
								value={bankData.branchCode}
								onChange={(e) =>
									setBankData({ ...bankData, branchCode: e.target.value })
								}
							/>
						</Form.Group>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default BankForm;
