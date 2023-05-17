import {
	ALLOWANCE_CREATE_FAIL,
	ALLOWANCE_CREATE_REQUEST,
	ALLOWANCE_CREATE_RESET,
	ALLOWANCE_CREATE_SUCCESS,
	ALLOWANCE_DELETE_FAIL,
	ALLOWANCE_DELETE_REQUEST,
	ALLOWANCE_DELETE_SUCCESS,
	ALLOWANCE_DETAILS_FAIL,
	ALLOWANCE_DETAILS_REQUEST,
	ALLOWANCE_DETAILS_SUCCESS,
	ALLOWANCE_LIST_FAIL,
	ALLOWANCE_LIST_REQUEST,
	ALLOWANCE_LIST_RESET,
	ALLOWANCE_LIST_SUCCESS,
	ALLOWANCE_UPDATE_FAIL,
	ALLOWANCE_UPDATE_REQUEST,
	ALLOWANCE_UPDATE_SUCCESS,
} from "../Constants/allowanceConstant";

export const allowanceCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ALLOWANCE_CREATE_REQUEST:
			return {
				loading: true,
			};
		case ALLOWANCE_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				allowance: action.payload,
			};
		case ALLOWANCE_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case ALLOWANCE_CREATE_RESET:
			return { success: false, error: false };
		default:
			return state;
	}
};

export const allowanceListReducer = (state = { allowances: [] }, action) => {
	switch (action.type) {
		case ALLOWANCE_LIST_REQUEST:
			return { loading: true };
		case ALLOWANCE_LIST_SUCCESS:
			return { loading: false, allowances: action.payload };
		case ALLOWANCE_LIST_FAIL:
			return { loading: false, error: action.payload };
		case ALLOWANCE_LIST_RESET:
			return { allowances: [] };
		default:
			return state;
	}
};

export const allowanceDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case ALLOWANCE_DELETE_REQUEST:
			return { loading: true };
		case ALLOWANCE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case ALLOWANCE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const allowanceUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case ALLOWANCE_UPDATE_REQUEST:
			return { loading: true };
		case ALLOWANCE_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				allowance: action.payload,
			};
		case ALLOWANCE_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const allowanceDetailReducer = (state = { allowance: {} }, action) => {
	switch (action.type) {
		case ALLOWANCE_DETAILS_REQUEST:
			return { ...state, loading: true };
		case ALLOWANCE_DETAILS_SUCCESS:
			return { loading: false, allowance: action.payload };
		case ALLOWANCE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
