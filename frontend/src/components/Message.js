import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

const Message = ({ variant, children }) => {
	const [show, setShow] = useState(true);

	const handleClose = () => {
		setShow(false);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setShow(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<CSSTransition in={show} timeout={500} classNames="alert" unmountOnExit>
			<div className="alert-container">
				<Alert
					variant={variant}
					onClose={handleClose}
					dismissible
					className="alert-content"
				>
					{children}
				</Alert>
			</div>
		</CSSTransition>
	);
};
Message.defaultProps = {
	variant: "info",
};

export default Message;

// import React, { useState, useEffect } from "react";
// import { Modal } from "react-bootstrap";

// const Message = ({ show, handleClose, message, type }) => {
// 	const [modalClass, setModalClass] = useState("");

// 	useEffect(() => {
// 		// Set the appropriate modal class based on the type prop
// 		switch (type) {
// 			case "success":
// 				setModalClass("modal-success");
// 				break;
// 			case "warning":
// 				setModalClass("modal-warning");
// 				break;
// 			case "error":
// 				setModalClass("modal-danger");
// 				break;
// 			default:
// 				setModalClass("modal-info");
// 				break;
// 		}
// 	}, [type]);

// 	useEffect(() => {
// 		let timeoutId;
// 		// Automatically close the modal after 5 seconds
// 		if (show) {
// 			timeoutId = setTimeout(handleClose, 5000);
// 		}
// 		return () => clearTimeout(timeoutId);
// 	}, [show, handleClose]);

// 	return (
// 		<Modal show={show} onHide={handleClose} className={modalClass}>
// 			<Modal.Body>{message}</Modal.Body>
// 		</Modal>
// 	);
// };

// export default Message;
