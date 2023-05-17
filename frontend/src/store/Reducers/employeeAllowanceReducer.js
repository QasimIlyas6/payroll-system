import {
	EMPLOYEE_ALLOWANCE_CREATE_FAIL,
	EMPLOYEE_ALLOWANCE_CREATE_REQUEST,
	EMPLOYEE_ALLOWANCE_CREATE_SUCCESS,
	EMPLOYEE_ALLOWANCE_DELETE_FAIL,
	EMPLOYEE_ALLOWANCE_DELETE_REQUEST,
	EMPLOYEE_ALLOWANCE_DELETE_SUCCESS,
	EMPLOYEE_ALLOWANCE_DETAILS_FAIL,
	EMPLOYEE_ALLOWANCE_DETAILS_REQUEST,
	EMPLOYEE_ALLOWANCE_DETAILS_SUCCESS,
	EMPLOYEE_ALLOWANCE_LIST_FAIL,
	EMPLOYEE_ALLOWANCE_LIST_REQUEST,
	EMPLOYEE_ALLOWANCE_LIST_RESET,
	EMPLOYEE_ALLOWANCE_LIST_SUCCESS,
	EMPLOYEE_ALLOWANCE_UPDATE_FAIL,
	EMPLOYEE_ALLOWANCE_UPDATE_REQUEST,
	EMPLOYEE_ALLOWANCE_UPDATE_SUCCESS,
} from "../Constants/employeeAllowanceConstant";

export const employeeAllowanceCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case EMPLOYEE_ALLOWANCE_CREATE_REQUEST:
			return {
				loading: true,
			};
		case EMPLOYEE_ALLOWANCE_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				employeeAllowance: action.payload,
			};
		case EMPLOYEE_ALLOWANCE_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const employeeAllowanceListReducer = (
	state = { employeesAllowances: [] },
	action
) => {
	switch (action.type) {
		case EMPLOYEE_ALLOWANCE_LIST_REQUEST:
			return { loading: true };
		case EMPLOYEE_ALLOWANCE_LIST_SUCCESS:
			return { loading: false, employeesAllowances: action.payload };
		case EMPLOYEE_ALLOWANCE_LIST_FAIL:
			return { loading: false, error: action.payload };
		case EMPLOYEE_ALLOWANCE_LIST_RESET:
			return { employeesAllowances: [] };
		default:
			return state;
	}
};

export const employeeAllowanceDetailsReducer = (
	state = { employeeAllowances: {} },
	action
) => {
	switch (action.type) {
		case EMPLOYEE_ALLOWANCE_DETAILS_REQUEST:
			return { ...state, loading: true };
		case EMPLOYEE_ALLOWANCE_DETAILS_SUCCESS:
			return { loading: false, employeeAllowances: action.payload };
		case EMPLOYEE_ALLOWANCE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const employeeAllowanceDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case EMPLOYEE_ALLOWANCE_DELETE_REQUEST:
			return { loading: true };
		case EMPLOYEE_ALLOWANCE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case EMPLOYEE_ALLOWANCE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const employeeAllowanceUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case EMPLOYEE_ALLOWANCE_UPDATE_REQUEST:
			return { loading: true };
		case EMPLOYEE_ALLOWANCE_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				employeeAllowance: action.payload,
			};
		case EMPLOYEE_ALLOWANCE_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const employeeAllowanceDetailReducer = (
	state = { employeeAllowanceDetail: {} },
	action
) => {
	switch (action.type) {
		case EMPLOYEE_ALLOWANCE_DETAILS_REQUEST:
			return { ...state, loading: true };
		case EMPLOYEE_ALLOWANCE_DETAILS_SUCCESS:
			return { loading: false, employeeAllowanceDetail: action.payload };
		case EMPLOYEE_ALLOWANCE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
