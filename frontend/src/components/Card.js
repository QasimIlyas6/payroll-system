import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const StatisticCard = ({ icon, message, value, bgColor }) => {
	return (
		<Card
			style={{
				width: "450px",
				padding: "20px",
				borderRadius: "20px",
				backgroundColor: bgColor,
				color: "#ffff",
				border: "none",
				marginBottom: "30px",
				fontSize: "24px",
			}}
		>
			<Card.Body>
				<div className="d-flex align-items-center justify-content-between">
					<div className="mr-3">
						<FontAwesomeIcon icon={icon} size="3x" />
					</div>
					<div>
						<h4>{message}</h4>
						<h2 style={{ textAlign: "right", fontSize: "40px" }}>{value}</h2>
					</div>
				</div>
			</Card.Body>
		</Card>
	);
};

export default StatisticCard;
