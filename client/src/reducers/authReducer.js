import { SET_CURRENT_EMPLOYEE, SET_CURRENT_ADMIN, EMPLOYEE_LOADING, ADMIN_LOADING, EDIT_EMPLOYEE, GET_EMPLOYEES } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = { isAuthenticated: false, admin: {}, employee: {}, loading: false };

export default function(state = initialState, action) {
  switch (action.type) { 
    case SET_CURRENT_EMPLOYEE:
      return { 
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        employee: action.payload
      };

    case GET_EMPLOYEES: 
      return {
        ...state, 
        employees: action.payload
      }
    case SET_CURRENT_ADMIN: 
      return {
          ...state, 
          isAuthenticated: !isEmpty(action.payload),
          admin: action.payload
      };
    case EDIT_EMPLOYEE: 
      return {
        ...state, 
        employee: action.payload
      }
    case ADMIN_LOADING:
      return {
        ...state,
        loading: true
      };
      case EMPLOYEE_LOADING:
        return {
          ...state,
          loading: true
        };
    default:
      return state;
  }
}