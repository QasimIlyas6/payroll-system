import axios from "axios";

import {
	ALLOWANCE_CREATE_FAIL,
	ALLOWANCE_CREATE_REQUEST,
	ALLOWANCE_CREATE_SUCCESS,
	ALLOWANCE_DELETE_FAIL,
	ALLOWANCE_DELETE_REQUEST,
	ALLOWANCE_DELETE_SUCCESS,
	ALLOWANCE_DETAILS_FAIL,
	ALLOWANCE_DETAILS_REQUEST,
	ALLOWANCE_DETAILS_SUCCESS,
	ALLOWANCE_LIST_FAIL,
	ALLOWANCE_LIST_REQUEST,
	ALLOWANCE_LIST_SUCCESS,
	ALLOWANCE_UPDATE_FAIL,
	ALLOWANCE_UPDATE_REQUEST,
	ALLOWANCE_UPDATE_SUCCESS,
} from "../Constants/allowanceConstant";

export const createAllowance = (allowance) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ALLOWANCE_CREATE_REQUEST,
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

		const { data } = await axios.post(`/api/allowances`, allowance, config);

		dispatch({
			type: ALLOWANCE_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALLOWANCE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listAllowances = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ALLOWANCE_LIST_REQUEST,
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
		const { data } = await axios.get(`/api/allowances`, config);

		dispatch({
			type: ALLOWANCE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALLOWANCE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteAllowance = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ALLOWANCE_DELETE_REQUEST,
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

		await axios.delete(`/api/allowances/${id}`, config);

		dispatch({
			type: ALLOWANCE_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: ALLOWANCE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getAllowanceDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ALLOWANCE_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/allowances/${id}`, config);

		dispatch({
			type: ALLOWANCE_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALLOWANCE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateAllowance = (allowance) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ALLOWANCE_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/allowances/:id`, allowance, config);

		dispatch({
			type: ALLOWANCE_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALLOWANCE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
