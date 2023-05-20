import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import SideBar from "./SideBar";

import Dashboard from "../screens/Dashboard";
import EmployeeList from "../screens/Employee/EmployeeList";
import EmployeeAllowanceScreen from "../screens/Allowance/EmployeeAllowanceScreen";
import EmployeeDeductionScreen from "../screens/Deduction/EmployeeDeductionScreen";
import EmployeeDetailScreen from "../screens/Employee/EmployeeDetailScreen";
import DeductionListScreen from "../screens/Deduction/DeductionListScreen";
import ScaleListScreen from "../screens/Scale/ScaleListScreen";
import DepartmentListScreen from "../screens/Department/DepartmentListScreen";
import AllowanceListScreen from "../screens/Allowance/AllowanceListScreen";
import DesignationListScreen from "../screens/Designation/DesignationListScreen";
import EmployeeFormScreen from "../screens/Employee/EmployeeFormScreen";
import EmployeePayRoll from "../screens/Employee/EmployeePayRoll";
import EmployeeEditScreen from "../screens/Employee/EmployeeEditForm";

import { listEmployees } from "../store/Actions/employeeAction";
import { listAllowances } from "../store/Actions/allowanceAction";
import { listDeductions } from "../store/Actions/deductionAction";
import { listDepartments } from "../store/Actions/departmentAction";
import { listDesignations } from "../store/Actions/designationAction";
import { listScale } from "../store/Actions/scaleAction";
import { listEmployeeAllowances } from "../store/Actions/employeeAllowanceAction";
import { listEmployeeDeductions } from "../store/Actions/employeeDeductionAction";
import DepartmentEditScreen from "../screens/Department/DepartmentEditScreen";
import PayrollScreen from "../screens/Payroll/PayrollScreen";

const Layout = () => {
	const dispatch = useDispatch();

	const employeeList = useSelector((state) => state.employeeList);
	const allowanceList = useSelector((state) => state.allowanceList);
	const scaleList = useSelector((state) => state.scaleList);
	const designationList = useSelector((state) => state.designationList);
	const deductionList = useSelector((state) => state.deductionList);
	const departmentList = useSelector((state) => state.departmentList);
	const employeeDeductionList = useSelector(
		(state) => state.employeeDeductionList
	);
	const employeeAllowanceList = useSelector(
		(state) => state.employeeAllowanceList
	);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(listEmployees());
			dispatch(listAllowances());
			dispatch(listDeductions());
			dispatch(listDepartments());
			dispatch(listDesignations());
			dispatch(listScale());
			dispatch(listEmployeeDeductions());
			dispatch(listEmployeeAllowances());
		};

		fetchData();

		return () => {};
	}, [dispatch]);

	return (
		<>
			<Header className="sticky-nav" />
			<div className="layout-grid">
				<div className="sidebar">
					<SideBar />
				</div>
				<div>
					<main>
						<Routes>
							<Route
								path="/"
								element={
									<Dashboard
										employeeList={employeeList}
										departmentList={departmentList}
									/>
								}
							/>
							<Route
								path="/departments"
								element={
									<DepartmentListScreen departmentList={departmentList} />
								}
							/>
							<Route
								path="/department/:id/edit"
								element={<DepartmentEditScreen />}
							/>
							<Route
								path="/allowances"
								element={<AllowanceListScreen allowanceList={allowanceList} />}
							/>
							<Route
								path="/designations"
								element={
									<DesignationListScreen designationList={designationList} />
								}
							/>
							<Route
								path="/deductions"
								element={<DeductionListScreen deductionList={deductionList} />}
							/>
							<Route
								path="/scale"
								element={<ScaleListScreen scaleList={scaleList} />}
							/>
							<Route
								path="/employee-form"
								element={
									<EmployeeFormScreen
										designationList={designationList}
										departmentList={departmentList}
										scaleList={scaleList}
									/>
								}
							/>
							<Route
								path="/employee/edit/:id"
								element={
									<EmployeeEditScreen
										designationList={designationList}
										departmentList={departmentList}
										scaleList={scaleList}
									/>
								}
							/>
							<Route
								path="/employees"
								element={
									<EmployeeList
										employeeList={employeeList}
										departmentList={departmentList}
										scaleList={scaleList}
										designationList={designationList}
										employeeAllowanceList={employeeAllowanceList}
									/>
								}
							/>
							<Route
								path="/employees-payroll"
								element={
									<EmployeePayRoll
										employeeList={employeeList}
										allowanceList={allowanceList}
										deductionList={deductionList}
										scaleList={scaleList}
										designationList={designationList}
										employeeAllowanceList={employeeAllowanceList}
										employeeDeductionList={employeeDeductionList}
									/>
								}
							/>
							<Route
								path="/employee-pay-slip/:id"
								element={
									<EmployeeDetailScreen
										allowanceList={allowanceList}
										deductionList={deductionList}
										departmentList={departmentList}
										scaleList={scaleList}
										designationList={designationList}
										employeeAllowanceList={employeeAllowanceList}
										employeeDeductionList={employeeDeductionList}
									/>
								}
							/>
							<Route
								path="/employee-allowances"
								element={
									<EmployeeAllowanceScreen
										departmentList={departmentList}
										employeeList={employeeList}
										allowanceList={allowanceList}
										employeeAllowanceList={employeeAllowanceList}
									/>
								}
							/>
							<Route
								path="/employee-deductions"
								element={
									<EmployeeDeductionScreen
										departmentList={departmentList}
										employeeList={employeeList}
										deductionList={deductionList}
									/>
								}
							/>
							<Route
								path="/payroll-monthly"
								element={
									<PayrollScreen
										employeeList={employeeList}
										employeeAllowanceList={employeeAllowanceList}
										employeeDeductionList={employeeDeductionList}
									/>
								}
							/>
						</Routes>
					</main>
				</div>
			</div>
		</>
	);
};

export default Layout;
