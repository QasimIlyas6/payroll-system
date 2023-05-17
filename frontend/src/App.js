import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import "./bootstrap.min.css";
// components
import Loader from "./components/Loader";

// screens
const UserLoginScreen = React.lazy(() =>
	import("./screens/User/UserLoginScreen")
);
const RegisterScreen = React.lazy(() =>
	import("./screens/User/RegisterScreen")
);
const StartupScreen = React.lazy(() => import("./screens/StartupScreen"));
const Layout = React.lazy(() => import("./components/Layout"));
const Message = React.lazy(() => import("./components/Message"));

function App() {
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	return (
		<Suspense fallback={<Loader />}>
			{error && <Message variant="danger">{error}</Message>}
			{!loading && !userInfo && (
				<div className="welcome">
					<Routes>
						<Route path="/" element={<StartupScreen />} />
						<Route path="/login" element={<UserLoginScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
					</Routes>
				</div>
			)}
			{userInfo && <Layout />}
		</Suspense>
	);
}

/* <Routes>
					<Route
						path="/pdf"
						element={
							<PDFViewer>
								<EmployeePayslip />
							</PDFViewer>
						}
					/>
				</Routes> */

export default App;

// import "./App.css";
// import "./bootstrap.min.css";
// import { Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// // components
// import Loader from "./components/Loader";

// // screens

// import UserLoginScreen from "./screens/User/UserLoginScreen";
// import RegisterScreen from "./screens/User/RegisterScreen";
// import StartupScreen from "./screens/StartupScreen";
// import { Fragment } from "react";

// import Layout from "./components/Layout";
// import Message from "./components/Message";

// function App() {
// 	const userLogin = useSelector((state) => state.userLogin);
// 	const { loading, error, userInfo } = userLogin;

// 	return (
// 		<Fragment>
// 			{loading && <Loader />}
// 			{error && <Message variant={"danger"}>{error}</Message>}
// 			{!userInfo && (
// 				<div className="welcome">
// 					<Routes>
// 						<Route path="/" element={<StartupScreen />} />
// 						<Route path="/login" element={<UserLoginScreen />} />
// 						<Route path="/register" element={<RegisterScreen />} />
// 					</Routes>
// 				</div>
// 			)}
// 			{userInfo && <Layout />}
// 		</Fragment>
// 	);
// }

// export default App;
