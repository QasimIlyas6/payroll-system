import axios from "axios";

import {
	DEPARTMENT_CREATE_FAIL,
	DEPARTMENT_CREATE_REQUEST,
	DEPARTMENT_CREATE_SUCCESS,
	DEPARTMENT_DELETE_FAIL,
	DEPARTMENT_DELETE_REQUEST,
	DEPARTMENT_DELETE_SUCCESS,
	DEPARTMENT_DETAILS_FAIL,
	DEPARTMENT_DETAILS_REQUEST,
	DEPARTMENT_DETAILS_SUCCESS,
	DEPARTMENT_LIST_FAIL,
	DEPARTMENT_LIST_REQUEST,
	DEPARTMENT_LIST_SUCCESS,
} from "../Constants/departmentConstant";

export const createDepartment = (department) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEPARTMENT_CREATE_REQUEST,
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

		const { data } = await axios.post(`/api/departments`, department, config);

		dispatch({
			type: DEPARTMENT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DEPARTMENT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteDepartment = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEPARTMENT_DELETE_REQUEST,
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

		await axios.delete(`/api/departments/${id}`, config);

		dispatch({
			type: DEPARTMENT_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: DEPARTMENT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listDepartments = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEPARTMENT_LIST_REQUEST,
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
		const { data } = await axios.get(`/api/departments`, config);

		dispatch({
			type: DEPARTMENT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DEPARTMENT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getDepartmentDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEPARTMENT_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/departments/${id}`, config);

		dispatch({
			type: DEPARTMENT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DEPARTMENT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
