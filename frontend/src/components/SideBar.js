import React from "react";
import { Nav, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUserTie,
	faBriefcase,
	faBalanceScale,
	faFileInvoiceDollar,
	faUsers,
	faBuilding,
	faPlus,
	faMinus,
	faPlusSquare,
	faMinusSquare,
	faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import "../dashboard.css";

const SideBar = () => {
	return (
		<Nav className="flex-column p-2" style={{ height: "100vh" }}>
			<Nav.Item>
				<LinkContainer to="/">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faDashboard} className="icon" />
						<span className="nav-text">Dashboard</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employee-form">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faUserTie} className="icon" />
						<span className="nav-text">Add Employee</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employees">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faUsers} className="icon" />
						<span className="nav-text">All Employees</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/departments">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faBuilding} className="icon" />
						<span className="nav-text">Sections</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/allowances">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faPlus} className="icon" />
						<span className="nav-text">Allowances</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/deductions">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faMinus} className="icon" />
						<span className="nav-text">Deductions</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/designations">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faBriefcase} className="icon" />
						<span className="nav-text">Designation</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>

			<Nav.Item>
				<LinkContainer to="/scale">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faBalanceScale} className="icon" />
						<span className="nav-text">Scales</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employees-payroll">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faFileInvoiceDollar} className="icon" />
						<span className="nav-text">PayRoll</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employee-allowances">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faPlusSquare} className="icon" />
						<span className="nav-text">Employee Allowance</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
			<Nav.Item>
				<LinkContainer to="/employee-deductions">
					<NavLink className="nav-link">
						<FontAwesomeIcon icon={faMinusSquare} className="icon" />
						<span className="nav-text">Employee Deduction</span>
					</NavLink>
				</LinkContainer>
			</Nav.Item>
		</Nav>
	);
};

export default SideBar;
