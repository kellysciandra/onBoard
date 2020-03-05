import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_ADMIN, SET_CURRENT_EMPLOYEE, ADMIN_LOADING, EMPLOYEE_LOADING, EDIT_EMPLOYEE } from "./types";

export const registerAdmin = (adminData, history) => dispatch => {
  axios
    .post("/api/admins/register", adminData)
    .then(res =>  console.log(res), history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginAdmin = adminData => dispatch => {
  axios
    .post("/api/admins/login", adminData)
    .then(res => { console.log(res)

      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentAdmin(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const setCurrentAdmin = decoded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: decoded
  };
};


export const setAdminLoading = () => {
  return {
    type: ADMIN_LOADING
  };
};


export const logoutAdmin = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  console.log('logged out')
  dispatch(setCurrentAdmin({}));
  this.history.push("/")
};





export const registerEmployee = (employeeData, history) => dispatch => {
  axios
    .post("/api/employees/register", employeeData)
    .then(res =>  console.log(res), history.push("/employeeLogin"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginEmployee = employeeData => dispatch => {
  axios
    .post("/api/employees/login", employeeData)
    .then(res => { console.log(res)

      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentEmployee(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editEmployee = (employeeData, history) => dispatch => {
  axios
    .post("/api/employees/update", employeeData)
    .then(res => { console.log(res)
 
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const setCurrentEmployee = decoded => {
  return {
    type: SET_CURRENT_EMPLOYEE,
    payload: decoded
  };
};


export const setEmployeeLoading = () => {
  return {
    type: EMPLOYEE_LOADING
  };
};


export const logoutEmployee = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  console.log('logged out')
  dispatch(setCurrentEmployee({}));
  this.history.push("/")
};