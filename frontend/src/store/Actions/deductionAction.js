import axios from "axios";

import {
	DEDUCTION_CREATE_FAIL,
	DEDUCTION_CREATE_REQUEST,
	DEDUCTION_CREATE_SUCCESS,
	DEDUCTION_DELETE_FAIL,
	DEDUCTION_DELETE_REQUEST,
	DEDUCTION_DELETE_SUCCESS,
	DEDUCTION_DETAILS_FAIL,
	DEDUCTION_DETAILS_REQUEST,
	DEDUCTION_DETAILS_SUCCESS,
	DEDUCTION_LIST_FAIL,
	DEDUCTION_LIST_REQUEST,
	DEDUCTION_LIST_SUCCESS,
	DEDUCTION_UPDATE_FAIL,
	DEDUCTION_UPDATE_REQUEST,
	DEDUCTION_UPDATE_SUCCESS,
} from "../Constants/deductionConstant";

export const createDeduction = (deduction) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEDUCTION_CREATE_REQUEST,
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
		const { data } = await axios.post(`/api/deductions/`, deduction, config);

		dispatch({
			type: DEDUCTION_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DEDUCTION_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteDeduction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEDUCTION_DELETE_REQUEST,
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

		await axios.delete(`/api/deductions//${id}`, config);

		dispatch({
			type: DEDUCTION_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: DEDUCTION_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listDeductions = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEDUCTION_LIST_REQUEST,
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

		const { data } = await axios.get(`/api/deductions/`, config);

		dispatch({
			type: DEDUCTION_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DEDUCTION_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getDeductionDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEDUCTION_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/deductions//${id}`, config);

		dispatch({
			type: DEDUCTION_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DEDUCTION_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateDeduction = (deduction) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DEDUCTION_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/deductions/:id`, deduction, config);

		dispatch({
			type: DEDUCTION_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DEDUCTION_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
