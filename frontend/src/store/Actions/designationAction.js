import axios from "axios";

import {
	DESIGNATION_CREATE_FAIL,
	DESIGNATION_CREATE_REQUEST,
	DESIGNATION_CREATE_SUCCESS,
	DESIGNATION_DELETE_FAIL,
	DESIGNATION_DELETE_REQUEST,
	DESIGNATION_DELETE_SUCCESS,
	DESIGNATION_DETAILS_FAIL,
	DESIGNATION_DETAILS_REQUEST,
	DESIGNATION_DETAILS_SUCCESS,
	DESIGNATION_LIST_FAIL,
	DESIGNATION_LIST_REQUEST,
	DESIGNATION_LIST_SUCCESS,
	DESIGNATION_UPDATE_FAIL,
	DESIGNATION_UPDATE_REQUEST,
	DESIGNATION_UPDATE_SUCCESS,
} from "../Constants/designationConstant";

export const createDesignation =
	(designation) => async (dispatch, getState) => {
		try {
			dispatch({
				type: DESIGNATION_CREATE_REQUEST,
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
				`/api/designations`,
				designation,
				config
			);

			dispatch({
				type: DESIGNATION_CREATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: DESIGNATION_CREATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const deleteDesignation = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DESIGNATION_DELETE_REQUEST,
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

		await axios.delete(`/api/designations/${id}`, config);

		dispatch({
			type: DESIGNATION_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: DESIGNATION_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listDesignations = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: DESIGNATION_LIST_REQUEST,
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

		const { data } = await axios.get(`/api/designations`, config);

		dispatch({
			type: DESIGNATION_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DESIGNATION_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getDesignationDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DESIGNATION_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/designations/${id}`, config);

		dispatch({
			type: DESIGNATION_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DESIGNATION_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};


export const updateDesignation = (designation) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DESIGNATION_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/designations/:id`, designation, config);

		dispatch({
			type: DESIGNATION_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DESIGNATION_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
