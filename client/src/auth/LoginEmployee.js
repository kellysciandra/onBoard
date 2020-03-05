import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import {Col, Button} from 'react-bootstrap'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginEmployee } from "../actions/authActions";

import { withRouter } from 'react-router-dom'

class LoginEmployee extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/employee");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/employee");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

handleChange = event => {
  this.setState({
      [event.target.name]: event.target.value
  })
}

  handleSubmit = e => {
    e.preventDefault();

    const employeeData = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(employeeData)
    this.props.loginEmployee(employeeData);
  };

  render() {
    const { errors, email, password } = this.state;

    return (
      <div>
      <div className='block2_signup'></div>
      <h1 className='welcome'>Login</h1>
       <Form className='form_container' onSubmit={this.handleSubmit}>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control errors={errors.email} type="email" name="email" placeholder="Enter email" onChange={this.handleChange} value={email} />
          </Form.Group>
          </Form.Row>

          <Form.Row>
              <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control errors={errors.password} type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
              </Form.Group>
          </Form.Row>

          <Button variant="dark" type="submit">
              Submit
          </Button>
          </Form>
  </div>
    );
  }
}

LoginEmployee.propTypes = {
  loginEmployee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{ loginEmployee })(withRouter(LoginEmployee));