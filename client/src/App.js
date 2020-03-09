import React from 'react';
import {Route, Router, Switch } from 'react-router-dom'
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentEmployee, logoutEmployee, setCurrentAdmin, logoutAdmin} from './actions/authActions'

import Home from './layout/Home'
import NavBar from './layout/NavBar'
import SignUpEmployee from './auth/SignUpEmployee.js'
import LoginEmployee from './auth/LoginEmployee.js'
import SignUpAdmin from './auth/SignUpAdmin.js'
import LoginAdmin from './auth/LoginAdmin.js'
import Employee from './package/Employee.js'
import Admin from './admin/Admin.js'
import PrivateRoute from "./private-route/PrivateRoute"
import PrivateRouteAdmin from './private-route/PrivateRouteAdmin'
import history from './history'


//styling
// import './App.css';
import './index.css';
//redux
import store from './store'



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentEmployee(decoded));
  store.dispatch(setCurrentAdmin(decoded))
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutEmployee());
    // Redirect to login
    window.location.href = "./employeeLogin";
  }
}


function App() {
  return (
    <Provider store={store}>
    <Router history={history}>
      <div>
        <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/employeeSignUp/" component={SignUpEmployee} />
          <Route exact path="/employeeLogin/" component={LoginEmployee} />
          <Route exact path="/adminSignUp" component={SignUpAdmin}/>
          <Route exact path="/adminLogin" component={LoginAdmin}/>
     

      <Switch>
        <PrivateRoute exact path='/employee' component={Employee} />
        <PrivateRouteAdmin exact path='/admin' component={Admin} />
      </Switch>
      </div>
    </Router>
  </Provider>
  );
}

export default App;
