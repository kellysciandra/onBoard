import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import {Col, Button} from 'react-bootstrap'
import { editEmployee } from '../actions/authActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'

class Employee extends Component {
    constructor() {
        super()

        this.state = {
            phone_number: "",
            address1: "",
            address2: "",
            emergency_contact: "",
            start_date: ""
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
        if (!this.props.auth.isAuthenticated) {
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
            phone_number: this.state.phone_number,
            address1: this.state.address1,
            address2: this.state.address2,
            emergency_contact: this.state.emergency_contact, 
            start_date: this.state.start_date
        };

        this.props.editEmployee(editEmployee, this.props.history)
        // this.props.history.push("/employee")
    }





    render() {
        
        const { phone_number, address1, address2, emergency_contact, start_date} = this.state
        return (
            <div> 
                <h1 className='profile'>hi name please complete your profile</h1><br></br>
                <h1 className='header'>display email</h1><br></br>
                <h1 className='header'>display position</h1><br></br>

                <Form className='form_container' onSubmit={this.handleSubmit}>

                    <Form.Group as={Col} controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone number" name="phone_number" placeholder="Enter number" onChange={this.handleChange} value={phone_number}/>
                    </Form.Group>
        
                    <Form.Group as={Col} controlId="formGridAddress">
                    <Form.Label>Address On Island</Form.Label>
                    <Form.Control type="address" name="address1" placeholder="Address On Island" onChange={this.handleChange} value={address1}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAddress2">
                    <Form.Label>Address Off Island</Form.Label>
                    <Form.Control type="address" name="address2" placeholder="Address Off Island" onChange={this.handleChange} value={address2}  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridContact">
                    <Form.Label>Emergency Contact/ Phone Number</Form.Label>
                    <Form.Control type="contact" name="emergency_contact" placeholder="Name/Number" onChange={this.handleChange} value={emergency_contact}  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" name="start_date" placeholder="Start Date" onChange={this.handleChange} value={start_date}  />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        Submit
                    </Button>
                </Form>

              <h1 className='header'>once you hit submit the documents load</h1>
                
            </div>
        );
    }
}

Employee.propTypes = {
    editEmployee: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { editEmployee })(withRouter(Employee))