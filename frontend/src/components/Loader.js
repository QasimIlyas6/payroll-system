import React, { useState, useEffect } from "react";

const Loader = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShow(true), 2000);
		return () => clearTimeout(timer);
	}, []);

	if (!show) {
		return null;
	}

	return (
		<div className="loader">
			<div className="circle1"></div>
			<div className="circle2"></div>
			<div className="circle3"></div>
		</div>
	);
};

export default Loader;

// import React from "react";
// import { Spinner } from "react-bootstrap";

// const Loader = () => {
// 	return (
// 		<Spinner
// 			animation="broder"
// 			role="status"
// 			style={{
// 				width: "100px",
// 				height: "100px",
// 				margin: "auto",
// 				display: "block",
// 			}}
// 		>
// 			<span className="visually-hidden">Loading...</span>
// 		</Spinner>
// 	);
// };

// export default Loader;
