import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Row } from "react-bootstrap";

const ProgressCard = ({ title, value, icon, bgColor }) => {
	return (
		<Card className="h-100" style={{ backgroundColor: bgColor }}>
			<Card.Body>
				<Row className="align-items-center">
					<Col md={8}>
						<Card.Title className="text-white">{title}</Card.Title>
						<Card.Text className="text-white">
							{value} <small className="text-muted">items</small>
						</Card.Text>
					</Col>
					<Col md={4} className="text-center">
						<FontAwesomeIcon icon={icon} size="4x" className="text-white" />
					</Col>
				</Row>
			</Card.Body>
			<Card.Footer className="d-flex align-items-center justify-content-between">
				<span className="text-white font-weight-bold">View Details</span>
				<FontAwesomeIcon icon={faArrowRight} className="text-white" />
			</Card.Footer>
		</Card>
	);
};

const Dashboard = () => {
	return (
		<div className="container my-5">
			<Row>
				<Col md={6}>
					<ProgressCard
						title="Allowances"
						value={10}
						icon={["fas", "money-check-alt"]}
						bgColor="#6C5B7B"
					/>
				</Col>
				<Col md={6}>
					<ProgressCard
						title="Deductions"
						value={5}
						icon={["fas", "hand-holding-usd"]}
						bgColor="#C06C84"
					/>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
