import { SET_CURRENT_EMPLOYEE, SET_CURRENT_ADMIN, RUNNER_LOADING } from "../actions/types";
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
    case SET_CURRENT_ADMIN: 
      return {
          ...state, 
          isAuthenticated: !isEmpty(action.payload),
          admin: action.payload
      }
    case RUNNER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}