import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import {Col, Button} from 'react-bootstrap'
import { registerEmployee } from '../actions/authActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'


class SignUpEmployee extends Component {
    constructor() {
        super()

        this.state = {
            name: "",
            email: "",
            position: "",
            password: "",
            password2: "",
            errors: {}
        }
    }

    componentWillRecieveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/employee')
        }
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit = (event) => {
        event.preventDefault()

        const newEmployee = {
            name: this.state.name,
            email: this.state.email,
            position: this.state.position,
            password: this.state.password, 
            password2: this.state.password2
        };

        this.props.registerEmployee(newEmployee, this.props.history)
        // this.props.history.push("/employee")
    }

    
    render() {

        const {name, position, email, password, password2} = this.state;

        return (
            <div>
                <div className='block2_signup'></div>
                <h1 className='welcome'>Welcome to Nancy's blah blah blah</h1>
                 <Form className='form_container' onSubmit={this.handleSubmit}>

                    <Form.Row>
                         <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" name="name" placeholder="Enter name" onChange={this.handleChange} value={name} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPosition">
                        <Form.Label>Position</Form.Label>
                        <Form.Control type="position" name="position" placeholder="Enter position" onChange={this.handleChange} value={position} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleChange} value={email} />
                    </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Confirmation</Form.Label>
                        <Form.Control type="password" name="password2" placeholder="Password" onChange={this.handleChange} value={password2} />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                    </Form>
            </div>
        )
    }
}

SignUpEmployee.propTypes = {
    registerEmployee: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { registerEmployee })(withRouter(SignUpEmployee))