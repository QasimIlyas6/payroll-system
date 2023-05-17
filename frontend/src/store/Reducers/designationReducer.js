import {
	DESIGNATION_CREATE_FAIL,
	DESIGNATION_CREATE_REQUEST,
	DESIGNATION_CREATE_RESET,
	DESIGNATION_CREATE_SUCCESS,
	DESIGNATION_DELETE_FAIL,
	DESIGNATION_DELETE_REQUEST,
	DESIGNATION_DELETE_SUCCESS,
	DESIGNATION_DETAILS_FAIL,
	DESIGNATION_DETAILS_REQUEST,
	DESIGNATION_DETAILS_SUCCESS,
	DESIGNATION_LIST_FAIL,
	DESIGNATION_LIST_REQUEST,
	DESIGNATION_LIST_RESET,
	DESIGNATION_LIST_SUCCESS,
	DESIGNATION_UPDATE_FAIL,
	DESIGNATION_UPDATE_REQUEST,
	DESIGNATION_UPDATE_SUCCESS,
} from "../Constants/designationConstant";

export const designationCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case DESIGNATION_CREATE_REQUEST:
			return {
				loading: true,
			};
		case DESIGNATION_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				designation: action.payload,
			};
		case DESIGNATION_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case DESIGNATION_CREATE_RESET:
			return { success: false, error: false };

		default:
			return state;
	}
};

export const designationListReducer = (
	state = { designations: [] },
	action
) => {
	switch (action.type) {
		case DESIGNATION_LIST_REQUEST:
			return { loading: true };
		case DESIGNATION_LIST_SUCCESS:
			return { loading: false, designations: action.payload };
		case DESIGNATION_LIST_FAIL:
			return { loading: false, error: action.payload };
		case DESIGNATION_LIST_RESET:
			return { scales: [] };
		default:
			return state;
	}
};

export const designationDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DESIGNATION_DELETE_REQUEST:
			return { loading: true };
		case DESIGNATION_DELETE_SUCCESS:
			return { loading: false, success: true };
		case DESIGNATION_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const designationUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case DESIGNATION_UPDATE_REQUEST:
			return { loading: true };
		case DESIGNATION_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				designation: action.payload,
			};
		case DESIGNATION_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const designationDetailReducer = (
	state = { designation: {} },
	action
) => {
	switch (action.type) {
		case DESIGNATION_DETAILS_REQUEST:
			return { ...state, loading: true };
		case DESIGNATION_DETAILS_SUCCESS:
			return { loading: false, designation: action.payload };
		case DESIGNATION_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
