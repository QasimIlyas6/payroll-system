import axios from "axios";

import {
	SCALE_CREATE_FAIL,
	SCALE_CREATE_REQUEST,
	SCALE_CREATE_SUCCESS,
	SCALE_DELETE_FAIL,
	SCALE_DELETE_REQUEST,
	SCALE_DELETE_SUCCESS,
	SCALE_DETAILS_FAIL,
	SCALE_DETAILS_REQUEST,
	SCALE_DETAILS_SUCCESS,
	SCALE_LIST_FAIL,
	SCALE_LIST_REQUEST,
	SCALE_LIST_SUCCESS,
} from "../Constants/scaleConstant";

export const createScale = (scale) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SCALE_CREATE_REQUEST,
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
		const { data } = await axios.post(`/api/scales`, scale, config);

		dispatch({
			type: SCALE_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SCALE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteScale = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SCALE_DELETE_REQUEST,
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

		await axios.delete(`/api/scales/${id}`, config);

		dispatch({
			type: SCALE_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: SCALE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listScale = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: SCALE_LIST_REQUEST,
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

		const { data } = await axios.get(`/api/scales`, config);

		dispatch({
			type: SCALE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SCALE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getScaleDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SCALE_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/scales/${id}`, config);

		dispatch({
			type: SCALE_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SCALE_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
