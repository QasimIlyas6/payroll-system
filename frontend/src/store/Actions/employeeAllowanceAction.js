import axios from "axios";

import {
	EMPLOYEE_ALLOWANCE_CREATE_FAIL,
	EMPLOYEE_ALLOWANCE_CREATE_REQUEST,
	EMPLOYEE_ALLOWANCE_CREATE_SUCCESS,
	EMPLOYEE_ALLOWANCE_DELETE_FAIL,
	EMPLOYEE_ALLOWANCE_DELETE_REQUEST,
	EMPLOYEE_ALLOWANCE_DELETE_SUCCESS,
	EMPLOYEE_ALLOWANCE_DETAILS_FAIL,
	EMPLOYEE_ALLOWANCE_DETAILS_REQUEST,
	EMPLOYEE_ALLOWANCE_DETAILS_SUCCESS,
	EMPLOYEE_ALLOWANCE_LIST_FAIL,
	EMPLOYEE_ALLOWANCE_LIST_REQUEST,
	EMPLOYEE_ALLOWANCE_LIST_SUCCESS,
} from "../Constants/employeeAllowanceConstant";

export const createEmployeeAllowance =
	(employeeAllowance) => async (dispatch, getState) => {
		try {
			dispatch({
				type: EMPLOYEE_ALLOWANCE_CREATE_REQUEST,
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
				`/api/employee-allowances`,
				employeeAllowance,
				config
			);

			dispatch({
				type: EMPLOYEE_ALLOWANCE_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: EMPLOYEE_ALLOWANCE_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const listEmployeeAllowances = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_ALLOWANCE_LIST_REQUEST,
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
		const { data } = await axios.get(`/api/employee-allowances`, config);

		dispatch({
			type: EMPLOYEE_ALLOWANCE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_ALLOWANCE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteEmployeeAllowance = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_ALLOWANCE_DELETE_REQUEST,
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

		await axios.delete(`/api/employee-allowances/${id}`, config);

		dispatch({
			type: EMPLOYEE_ALLOWANCE_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_ALLOWANCE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getEmployeeAllowanceDetails =
	(id) => async (dispatch, getState) => {
		try {
			dispatch({
				type: EMPLOYEE_ALLOWANCE_DETAILS_REQUEST,
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
				`/api/employee-allowances/${id}`,
				config
			);

			dispatch({
				type: EMPLOYEE_ALLOWANCE_DETAILS_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: EMPLOYEE_ALLOWANCE_DETAILS_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
