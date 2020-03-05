  
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_RUNNER, RUNNER_LOADING } from "./types";

export const registerRunner = (runnerData, history) => dispatch => {
  axios
    .post("/api/runners/register", runnerData)
    .then(res =>  console.log(res), history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginRunner = runnerData => dispatch => {
  axios
    .post("/api/runners/login", runnerData)
    .then(res => { console.log(res)

      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentRunner(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


export const setCurrentRunner = decoded => {
  return {
    type: SET_CURRENT_RUNNER,
    payload: decoded
  };
};


export const setRunnerLoading = () => {
  return {
    type: RUNNER_LOADING
  };
};


export const logoutRunner = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  console.log('logged out')
  dispatch(setCurrentRunner({}));
  this.history.push("/")
};