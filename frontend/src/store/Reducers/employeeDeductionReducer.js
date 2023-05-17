import {
	EMPLOYEE_DEDUCTION_CREATE_FAIL,
	EMPLOYEE_DEDUCTION_CREATE_REQUEST,
	EMPLOYEE_DEDUCTION_CREATE_SUCCESS,
	EMPLOYEE_DEDUCTION_DELETE_FAIL,
	EMPLOYEE_DEDUCTION_DELETE_REQUEST,
	EMPLOYEE_DEDUCTION_DELETE_SUCCESS,
	EMPLOYEE_DEDUCTION_DETAILS_FAIL,
	EMPLOYEE_DEDUCTION_DETAILS_REQUEST,
	EMPLOYEE_DEDUCTION_DETAILS_SUCCESS,
	EMPLOYEE_DEDUCTION_LIST_FAIL,
	EMPLOYEE_DEDUCTION_LIST_REQUEST,
	EMPLOYEE_DEDUCTION_LIST_RESET,
	EMPLOYEE_DEDUCTION_LIST_SUCCESS,
	EMPLOYEE_DEDUCTION_UPDATE_FAIL,
	EMPLOYEE_DEDUCTION_UPDATE_REQUEST,
	EMPLOYEE_DEDUCTION_UPDATE_SUCCESS,
} from "../Constants/employeeDeductionConstant";

export const employeeDeductionCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case EMPLOYEE_DEDUCTION_CREATE_REQUEST:
			return {
				loading: true,
			};
		case EMPLOYEE_DEDUCTION_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				employeeDeduction: action.payload,
			};
		case EMPLOYEE_DEDUCTION_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const employeeDeductionDetailsReducer = (
	state = { employeeDeductions: {} },
	action
) => {
	switch (action.type) {
		case EMPLOYEE_DEDUCTION_DETAILS_REQUEST:
			return { ...state, loading: true };
		case EMPLOYEE_DEDUCTION_DETAILS_SUCCESS:
			return { loading: false, employeeDeductions: action.payload };
		case EMPLOYEE_DEDUCTION_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const employeeDeductionListReducer = (
	state = { employeesDeductions: [] },
	action
) => {
	switch (action.type) {
		case EMPLOYEE_DEDUCTION_LIST_REQUEST:
			return { loading: true };
		case EMPLOYEE_DEDUCTION_LIST_SUCCESS:
			return { loading: false, employeesDeductions: action.payload };
		case EMPLOYEE_DEDUCTION_LIST_FAIL:
			return { loading: false, error: action.payload };
		case EMPLOYEE_DEDUCTION_LIST_RESET:
			return { employeesDeductions: [] };
		default:
			return state;
	}
};

export const employeeDeductionDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case EMPLOYEE_DEDUCTION_DELETE_REQUEST:
			return { loading: true };
		case EMPLOYEE_DEDUCTION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case EMPLOYEE_DEDUCTION_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const employeeDeductionUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case EMPLOYEE_DEDUCTION_UPDATE_REQUEST:
			return { loading: true };
		case EMPLOYEE_DEDUCTION_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				employeeDeduction: action.payload,
			};
		case EMPLOYEE_DEDUCTION_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const employeeDeductionDetailReducer = (
	state = { employeeDeductionDetail: {} },
	action
) => {
	switch (action.type) {
		case EMPLOYEE_DEDUCTION_DETAILS_REQUEST:
			return { ...state, loading: true };
		case EMPLOYEE_DEDUCTION_DETAILS_SUCCESS:
			return { loading: false, employeeDeductionDetail: action.payload };
		case EMPLOYEE_DEDUCTION_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
