import {
	DEDUCTION_CREATE_FAIL,
	DEDUCTION_CREATE_REQUEST,
	DEDUCTION_CREATE_RESET,
	DEDUCTION_CREATE_SUCCESS,
	DEDUCTION_DELETE_FAIL,
	DEDUCTION_DELETE_REQUEST,
	DEDUCTION_DELETE_SUCCESS,
	DEDUCTION_DETAILS_FAIL,
	DEDUCTION_DETAILS_REQUEST,
	DEDUCTION_DETAILS_SUCCESS,
	DEDUCTION_LIST_FAIL,
	DEDUCTION_LIST_REQUEST,
	DEDUCTION_LIST_RESET,
	DEDUCTION_LIST_SUCCESS,
	DEDUCTION_UPDATE_FAIL,
	DEDUCTION_UPDATE_REQUEST,
	DEDUCTION_UPDATE_SUCCESS,
} from "../Constants/deductionConstant";

export const deductionCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case DEDUCTION_CREATE_REQUEST:
			return {
				loading: true,
			};
		case DEDUCTION_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				deduction: action.payload,
			};
		case DEDUCTION_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case DEDUCTION_CREATE_RESET:
			return { success: false, error: false };

		default:
			return state;
	}
};

export const deductionListReducer = (state = { deductions: [] }, action) => {
	switch (action.type) {
		case DEDUCTION_LIST_REQUEST:
			return { loading: true };
		case DEDUCTION_LIST_SUCCESS:
			return { loading: false, deductions: action.payload };
		case DEDUCTION_LIST_FAIL:
			return { loading: false, error: action.payload };
		case DEDUCTION_LIST_RESET:
			return { deductions: [] };
		default:
			return state;
	}
};

export const deductionDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DEDUCTION_DELETE_REQUEST:
			return { loading: true };
		case DEDUCTION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case DEDUCTION_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const deductionUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case DEDUCTION_UPDATE_REQUEST:
			return { loading: true };
		case DEDUCTION_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				deduction: action.payload,
			};
		case DEDUCTION_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const deductionDetailReducer = (state = { deduction: {} }, action) => {
	switch (action.type) {
		case DEDUCTION_DETAILS_REQUEST:
			return { ...state, loading: true };
		case DEDUCTION_DETAILS_SUCCESS:
			return { loading: false, deduction: action.payload };
		case DEDUCTION_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
