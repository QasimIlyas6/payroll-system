import {
	SCALE_CREATE_FAIL,
	SCALE_CREATE_REQUEST,
	SCALE_CREATE_RESET,
	SCALE_CREATE_SUCCESS,
	SCALE_DELETE_FAIL,
	SCALE_DELETE_REQUEST,
	SCALE_DELETE_SUCCESS,
	SCALE_LIST_FAIL,
	SCALE_LIST_REQUEST,
	SCALE_LIST_RESET,
	SCALE_LIST_SUCCESS,
	SCALE_UPDATE_FAIL,
	SCALE_UPDATE_REQUEST,
	SCALE_UPDATE_SUCCESS,
	SCALE_DETAILS_REQUEST,
	SCALE_DETAILS_SUCCESS,
	SCALE_DETAILS_FAIL,
} from "../Constants/scaleConstant";

export const scaleCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case SCALE_CREATE_REQUEST:
			return {
				loading: true,
			};
		case SCALE_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				scale: action.payload,
			};
		case SCALE_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case SCALE_CREATE_RESET:
			return { success: false, error: false };
		default:
			return state;
	}
};

export const scaleListReducer = (state = { scales: [] }, action) => {
	switch (action.type) {
		case SCALE_LIST_REQUEST:
			return { loading: true };
		case SCALE_LIST_SUCCESS:
			return { loading: false, scales: action.payload };
		case SCALE_LIST_FAIL:
			return { loading: false, error: action.payload };
		case SCALE_LIST_RESET:
			return { scales: [] };
		default:
			return state;
	}
};

export const scaleDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case SCALE_DELETE_REQUEST:
			return { loading: true };
		case SCALE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case SCALE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const scaleUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case SCALE_UPDATE_REQUEST:
			return { loading: true };
		case SCALE_UPDATE_SUCCESS:
			return {
				loading: false,
				success: true,
				scale: action.payload,
			};
		case SCALE_UPDATE_FAIL:
			return {
				loading: false,
				success: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const scaleDetailReducer = (state = { scale: {} }, action) => {
	switch (action.type) {
		case SCALE_DETAILS_REQUEST:
			return { ...state, loading: true };
		case SCALE_DETAILS_SUCCESS:
			return { loading: false, scale: action.payload };
		case SCALE_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
