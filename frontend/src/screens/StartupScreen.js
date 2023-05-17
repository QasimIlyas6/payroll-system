import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../hero.css";
import { LinkContainer } from "react-router-bootstrap";

const StartupScreen = () => {
	return (
		<div className="hero-container">
			<div className="hero-overlay"></div>
			<div className="hero-text">
				<h1 className="hero-title">Welcome to PayRoll</h1>
				<p className="hero-description">
					Take control of your payroll with our secure and customizable web app.
					Our platform is designed to meet your unique needs, and provides
					easy-to-use tools for managing employee salaries, taxes, and
					deductions.
				</p>
				<LinkContainer to={"/login"}>
					<Button className="hero-button" variant="primary">
						Let's get started!{" "}
						<FontAwesomeIcon icon={faArrowRight} className="hero-button-icon" />
					</Button>
				</LinkContainer>
			</div>
		</div>
	);
};

export default StartupScreen;
