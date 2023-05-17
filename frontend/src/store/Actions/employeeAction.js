import axios from "axios";

import {
	EMPLOYEE_CREATE_FAIL,
	EMPLOYEE_CREATE_REQUEST,
	EMPLOYEE_CREATE_SUCCESS,
	EMPLOYEE_DELETE_FAIL,
	EMPLOYEE_DELETE_REQUEST,
	EMPLOYEE_DELETE_SUCCESS,
	EMPLOYEE_DETAILS_FAIL,
	EMPLOYEE_DETAILS_REQUEST,
	EMPLOYEE_DETAILS_SUCCESS,
	EMPLOYEE_LIST_FAIL,
	EMPLOYEE_LIST_REQUEST,
	EMPLOYEE_LIST_SUCCESS,
	EMPLOYEE_UPDATE_FAIL,
	EMPLOYEE_UPDATE_REQUEST,
	EMPLOYEE_UPDATE_SUCCESS,
} from "../Constants/employeeConstant";

export const createEmployee = (employeeData) => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_CREATE_REQUEST,
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

		const { data } = await axios.post(`/api/employees`, employeeData, config);

		dispatch({
			type: EMPLOYEE_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteEmployee = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_DELETE_REQUEST,
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

		await axios.delete(`/api/employees/${id}`, config);

		dispatch({
			type: EMPLOYEE_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listEmployees = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_LIST_REQUEST,
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

		const { data } = await axios.get(`/api/employees`, config);

		dispatch({
			type: EMPLOYEE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getEmployeeDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/employees/${id}`, config);

		dispatch({
			type: EMPLOYEE_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: EMPLOYEE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateEmployee = (employee) => async (dispatch, getState) => {
	try {
		dispatch({
			type: EMPLOYEE_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/employees/:id`, employee, config);

		dispatch({
			type: EMPLOYEE_UPDATE_SUCCESS,
			payload: data,
		});

	} catch (error) {
		dispatch({
			type: EMPLOYEE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
