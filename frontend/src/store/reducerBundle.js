import {
	allowanceCreateReducer,
	allowanceDeleteReducer,
	allowanceDetailReducer,
	allowanceListReducer,
	allowanceUpdateReducer,
} from "./Reducers/allowanceReducer";
import {
	designationCreateReducer,
	designationDeleteReducer,
	designationDetailReducer,
	designationListReducer,
	designationUpdateReducer,
} from "./Reducers/designationReducer";
import {
	deductionCreateReducer,
	deductionDeleteReducer,
	deductionDetailReducer,
	deductionListReducer,
	deductionUpdateReducer,
} from "./Reducers/deductionReducer";
import {
	scaleCreateReducer,
	scaleDeleteReducer,
	scaleDetailReducer,
	scaleListReducer,
	scaleUpdateReducer,
} from "./Reducers/scaleReducer";
import {
	departmentCreateReducer,
	departmentDeleteReducer,
	departmentDetailReducer,
	departmentListReducer,
	departmentUpdateReducer,
} from "./Reducers/departmentReducer";
import {
	employeeCreateReducer,
	employeeDeleteReducer,
	employeeDetailsReducer,
	employeeListReducer,
	employeeUpdateReducer,
} from "./Reducers/employeeReducer";

import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
} from "./Reducers/userReducer";
import {
	employeeAllowanceCreateReducer,
	employeeAllowanceDeleteReducer,
	employeeAllowanceDetailsReducer,
	employeeAllowanceListReducer,
	employeeAllowanceUpdateReducer,
} from "./Reducers/employeeAllowanceReducer";
import {
	employeeDeductionCreateReducer,
	employeeDeductionDeleteReducer,
	employeeDeductionDetailsReducer,
	employeeDeductionListReducer,
	employeeDeductionUpdateReducer,
} from "./Reducers/employeeDeductionReducer";
import {
	bankDetailsCreateReducer,
	bankDetailsReducer,
	bankUpdateReducer,
} from "./Reducers/bankReducer";
import {
	payrollCreateReducer,
	payrollDeleteReducer,
	payrollDetailsReducer,
	payrollListReducer,
	payrollUpdateReducer,
} from "./Reducers/payrollReducer";

// combine reducers from state
const reducerBundle = {
	// user reducers
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,

	// allowance reducers
	allowanceCreate: allowanceCreateReducer,
	allowanceList: allowanceListReducer,
	allowanceDelete: allowanceDeleteReducer,
	allowanceDetails: allowanceDetailReducer,
	allowanceUpdate: allowanceUpdateReducer,

	// designation reducers
	designationCreate: designationCreateReducer,
	designationList: designationListReducer,
	designationDetails: designationDetailReducer,
	designationDelete: designationDeleteReducer,
	designationUpdate: designationUpdateReducer,

	// deduction reducers
	deductionCreate: deductionCreateReducer,
	deductionList: deductionListReducer,
	deductionDetails: deductionDetailReducer,
	deducitonDelete: deductionDeleteReducer,
	deductionUpdate: deductionUpdateReducer,

	// scale reducers
	scaleCreate: scaleCreateReducer,
	scaleList: scaleListReducer,
	scaleDetails: scaleDetailReducer,
	scaleDelete: scaleDeleteReducer,
	scaleUpdate: scaleUpdateReducer,

	// department reducers
	departmentCreate: departmentCreateReducer,
	departmentList: departmentListReducer,
	departmentDetails: departmentDetailReducer,
	departmentDelete: departmentDeleteReducer,
	departmentUpdate: departmentUpdateReducer,

	// employee reducers
	employeeCreate: employeeCreateReducer,
	employeeList: employeeListReducer,
	employeeDetails: employeeDetailsReducer,
	employeeDelete: employeeDeleteReducer,
	employeeUpdate: employeeUpdateReducer,

	// employee bank reducers
	bankDetailsCreate: bankDetailsCreateReducer,
	bankDetails: bankDetailsReducer,
	bankUpdate: bankUpdateReducer,

	// employee allowances reducers
	employeeAllowanceCreate: employeeAllowanceCreateReducer,
	employeeAllowanceDetails: employeeAllowanceDetailsReducer,
	employeeAllowanceList: employeeAllowanceListReducer,
	employeeAllowanceDelete: employeeAllowanceDeleteReducer,
	employeeAllowanceUpdate: employeeAllowanceUpdateReducer,

	// employee deductions reducers
	employeeDeductionCreate: employeeDeductionCreateReducer,
	employeeDeductionDetails: employeeDeductionDetailsReducer,
	employeeDeductionList: employeeDeductionListReducer,
	employeeDeductionDelete: employeeDeductionDeleteReducer,
	employeeDeductionUpdate: employeeDeductionUpdateReducer,

	// payroll reducers
	payrollCreate: payrollCreateReducer,
	payrollDetails: payrollDetailsReducer,
	payrollList: payrollListReducer,
	payrollDelete: payrollDeleteReducer,
	payrollUpdate: payrollUpdateReducer,
};

export default reducerBundle;
