import axios from "axios";
import {
	PAYROLL_CREATE_FAIL,
	PAYROLL_CREATE_REQUEST,
	PAYROLL_CREATE_SUCCESS,
	PAYROLL_DELETE_FAIL,
	PAYROLL_DELETE_REQUEST,
	PAYROLL_DELETE_SUCCESS,
	PAYROLL_DETAILS_FAIL,
	PAYROLL_DETAILS_REQUEST,
	PAYROLL_DETAILS_SUCCESS,
	PAYROLL_LIST_FAIL,
	PAYROLL_LIST_REQUEST,
	PAYROLL_LIST_SUCCESS,
	PAYROLL_UPDATE_FAIL,
	PAYROLL_UPDATE_REQUEST,
	PAYROLL_UPDATE_SUCCESS,
} from "../Constants/payrollConstant";

export const createPayroll = (payroll) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PAYROLL_CREATE_REQUEST,
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

		const { data } = await axios.post(`/api/payrolls`, payroll, config);

		dispatch({
			type: PAYROLL_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PAYROLL_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deletePayroll = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PAYROLL_DELETE_REQUEST,
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

		await axios.delete(`/api/payrolls/${id}`, config);

		dispatch({
			type: PAYROLL_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: PAYROLL_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listPayrolls = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PAYROLL_LIST_REQUEST,
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

		const { data } = await axios.get(`/api/payrolls`, config);

		dispatch({
			type: PAYROLL_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PAYROLL_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getPayrollDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PAYROLL_DETAILS_REQUEST,
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

		const { data } = await axios.get(`/api/payrolls/${id}`, config);

		dispatch({
			type: PAYROLL_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PAYROLL_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updatePayroll = (payroll) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PAYROLL_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/payrolls/:id`, payroll, config);

		dispatch({
			type: PAYROLL_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PAYROLL_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
