import React from 'react';
import {Route, BrowserRouter, Switch } from 'react-router-dom'
import { Provider } from "react-redux";

import Home from './layout/Home'
import NavBar from './layout/NavBar'
import SignUpEmployee from './auth/SignUpEmployee.js'
import SignUpAdmin from './auth/SignUpAdmin.js'
import Employee from './package/Employee.js'
import Admin from './admin/Admin.js'

//styling
// import './App.css';
import './index.css';
//redux
import store from './store'


function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <div>
        <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/employeeSignUp/" component={SignUpEmployee} />
          <Route exact path="/adminSignUp" component={SignUpAdmin}/>
          <Route exact path="/employee" component={Employee}/>
          <Route exact path="/admin" component={Admin}/>
      <Switch>
        {/* <PrivateRoute exact path='/dashboard' component={Dashboard} /> */}
      </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  );
}

export default App;
