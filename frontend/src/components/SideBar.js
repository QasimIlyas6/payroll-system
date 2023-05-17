import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserTie,
	faMoneyBill,
	faBriefcase,
	faBalanceScale,
	faFileInvoiceDollar,
	faMoneyBillWave,
	faBuildingShield,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
	return (
		<Nav className="flex-column p-2" style={{ height: "100vh" }}>
			<Nav.Item>
				<LinkContainer to="/employee-form">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faUserTie} className="icon" />
						Employee Form
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employees">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faUserTie} className="icon" />
						All Employees
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			{/* <Nav.Item>
				<LinkContainer to="/employee-allowances">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faUserTie} className="icon" />
						Employee Allowances
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employee-deductions">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faUserTie} className="icon" />
						Employee Deductions
					</Nav.Link> 
				</LinkContainer>
			</Nav.Item> */}
			<Nav.Item>
				<LinkContainer to="/departments">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faBuildingShield} className="icon" />
						Sections
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/allowances">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faMoneyBillWave} className="icon" />
						Allowances
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/deductions">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faMoneyBill} className="icon" />
						Deductions
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/designations">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faBriefcase} className="icon" />
						Designation
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>

			<Nav.Item>
				<LinkContainer to="/scale">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faBalanceScale} className="icon" />
						Scale
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employees-payroll">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
						Payroll
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employee-allowances">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
						Employee Allowances
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employee-deductions">
					<Nav.Link className="text-light">
						<FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
						Employee Deductions
					</Nav.Link>
				</LinkContainer>
			</Nav.Item>
		</Nav>
	);
};

export default SideBar;
