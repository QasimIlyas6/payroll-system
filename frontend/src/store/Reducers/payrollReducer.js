import {
	PAYROLL_CREATE_FAIL,
	PAYROLL_CREATE_REQUEST,
	PAYROLL_CREATE_RESET,
	PAYROLL_CREATE_SUCCESS,
	PAYROLL_DELETE_FAIL,
	PAYROLL_DELETE_REQUEST,
	PAYROLL_DELETE_SUCCESS,
	PAYROLL_DETAILS_FAIL,
	PAYROLL_DETAILS_REQUEST,
	PAYROLL_DETAILS_SUCCESS,
	PAYROLL_LIST_FAIL,
	PAYROLL_LIST_REQUEST,
	PAYROLL_LIST_RESET,
	PAYROLL_LIST_SUCCESS,
	PAYROLL_UPDATE_FAIL,
	PAYROLL_UPDATE_REQUEST,
	PAYROLL_UPDATE_SUCCESS,
} from "../Constants/payrollConstant";

export const payrollCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PAYROLL_CREATE_REQUEST:
			return {
				loading: true,
			};
		case PAYROLL_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				payrollData: action.payload,
			};
		case PAYROLL_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case PAYROLL_CREATE_RESET:
			return { success: false, error: false };

		default:
			return state;
	}
};

export const payrollListReducer = (state = { payrolls: [] }, action) => {
	switch (action.type) {
		case PAYROLL_LIST_REQUEST:
			return { loading: true };
		case PAYROLL_LIST_SUCCESS:
			return { loading: false, payrolls: action.payload };
		case PAYROLL_LIST_FAIL:
			return { loading: false, error: action.payload };
		case PAYROLL_LIST_RESET:
			return { payrolls: [] };
		default:
			return state;
	}
};

export const payrollDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PAYROLL_DELETE_REQUEST:
			return { loading: true };
		case PAYROLL_DELETE_SUCCESS:
			return { loading: false, success: true };
		case PAYROLL_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const payrollDetailsReducer = (state = { payroll: {} }, action) => {
	switch (action.type) {
		case PAYROLL_DETAILS_REQUEST:
			return { ...state, loading: true };
		case PAYROLL_DETAILS_SUCCESS:
			return { loading: false, payroll: action.payload };
		case PAYROLL_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const payrollUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case PAYROLL_UPDATE_REQUEST:
			return { loading: true };
		case PAYROLL_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				payroll: action.payload,
			};
		case PAYROLL_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
