import {
	BANK_DETAILS_CREATE_FAIL,
	BANK_DETAILS_CREATE_REQUEST,
	BANK_DETAILS_CREATE_SUCCESS,
	BANK_DETAILS_FAIL,
	BANK_DETAILS_REQUEST,
	BANK_DETAILS_SUCCESS,
	BANK_UPDATE_FAIL,
	BANK_UPDATE_REQUEST,
	BANK_UPDATE_SUCCESS,
} from "../Constants/bankConstant";

export const bankDetailsCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case BANK_DETAILS_CREATE_REQUEST:
			return {
				loading: true,
			};
		case BANK_DETAILS_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				bankData: action.payload,
			};
		case BANK_DETAILS_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const bankDetailsReducer = (state = { bankDetail: {} }, action) => {
	switch (action.type) {
		case BANK_DETAILS_REQUEST:
			return { ...state, loading: true };
		case BANK_DETAILS_SUCCESS:
			return { loading: false, bankDetail: action.payload };
		case BANK_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const bankUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case BANK_UPDATE_REQUEST:
			return { loading: true };
		case BANK_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				bankDetail: action.payload,
			};
		case BANK_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
