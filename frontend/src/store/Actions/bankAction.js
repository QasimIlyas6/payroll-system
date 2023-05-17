import axios from "axios";
import { BANK_DETAILS_CREATE_FAIL, BANK_DETAILS_CREATE_REQUEST, BANK_DETAILS_CREATE_SUCCESS, BANK_DETAILS_FAIL, BANK_DETAILS_REQUEST, BANK_DETAILS_SUCCESS, BANK_UPDATE_FAIL, BANK_UPDATE_REQUEST, BANK_UPDATE_SUCCESS } from "../Constants/bankConstant";

export const createBankDetails = (bankData) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BANK_DETAILS_CREATE_REQUEST,
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
			`/api/employees/bank-details`,
			bankData,
			config
		);

		dispatch({
			type: BANK_DETAILS_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: BANK_DETAILS_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getEmployeeBankDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BANK_DETAILS_REQUEST,
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
			`/api/employees/bank-details/${id}`,
			config
		);

		dispatch({
			type: BANK_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: BANK_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateBankDetails = (bankDetail) => async (dispatch, getState) => {
	try {
		dispatch({
			type: BANK_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/employees/bank-details/:id`, bankDetail, config);

		dispatch({
			type: BANK_UPDATE_SUCCESS,
			payload: data,
		});

      
	} catch (error) {
		dispatch({
			type: BANK_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
