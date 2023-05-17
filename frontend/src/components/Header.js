import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../store/Actions/userAction";
const Header = () => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<header className="sticky-nav" style={{ backgroundColor: "#1f2937" }}>
			<Navbar
				collapseOnSelect
				className="navbar navbar-expand-lg navbar-dark "
				style={{ height: "10vh" }}
			>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>
							<span className="md:fs-1">PayRoll</span>
						</Navbar.Brand>
					</LinkContainer>
					<Nav className="ml-auto ">
						{userInfo ? (
							<NavDropdown title={userInfo.name} id="username">
								<LinkContainer to="/profile">
									<NavDropdown.Item>Profile</NavDropdown.Item>
								</LinkContainer>
								<LinkContainer to="/">
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						) : (
							<LinkContainer to="/login">
								<Nav.Link>
									<i className="fas fa-shopping-cart"></i> Sign In
								</Nav.Link>
							</LinkContainer>
						)}
					</Nav>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
