import axios from "axios";

import {
	EMPLOYEE_DEDUCTION_CREATE_FAIL,
	EMPLOYEE_DEDUCTION_CREATE_REQUEST,
	EMPLOYEE_DEDUCTION_CREATE_SUCCESS,
	EMPLOYEE_DEDUCTION_DELETE_FAIL,
	EMPLOYEE_DEDUCTION_DELETE_REQUEST,
	EMPLOYEE_DEDUCTION_DELETE_SUCCESS,
	EMPLOYEE_DEDUCTION_DETAILS_FAIL,
	EMPLOYEE_DEDUCTION_DETAILS_REQUEST,
	EMPLOYEE_DEDUCTION_DETAILS_SUCCESS,
	EMPLOYEE_DEDUCTION_LIST_FAIL,
	EMPLOYEE_DEDUCTION_LIST_REQUEST,
	EMPLOYEE_DEDUCTION_LIST_SUCCESS,
} from "../Constants/employeeDeductionConstant";

export const createEmployeeDeduction =
	(employeeDeduction) => async (dispatch, getState) => {
		try {
			dispatch({
				type: EMPLOYEE_DEDUCTION_CREATE_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const { data } = await axios.post(
				`/api/employee-deductions`,
				employeeDeduction,
				config
			);

			dispatch({
				type: EMPLOYEE_DEDUCTION_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: EMPLOYEE_DEDUCTION_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const deleteEmployeeDeduction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_DEDUCTION_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/employee-deductions/${id}`, config);

		dispatch({
			type: EMPLOYEE_DEDUCTION_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_DEDUCTION_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listEmployeeDeductions = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_DEDUCTION_LIST_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/employee-deductions`, config);

		dispatch({
			type: EMPLOYEE_DEDUCTION_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_DEDUCTION_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getEmployeeDeductionDetails =
	(id) => async (dispatch, getState) => {
		try {
			dispatch({
				type: EMPLOYEE_DEDUCTION_DETAILS_REQUEST,
			});

			const {
				userLogin: { userInfo },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			const { data } = await axios.get(
				`/api/employee-deductions/${id}`,
				config
			);

			dispatch({
				type: EMPLOYEE_DEDUCTION_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: EMPLOYEE_DEDUCTION_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
