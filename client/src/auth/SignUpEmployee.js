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
            phone_number: "",
            address1: "",
            address2: "",
            emergency_contact: "",
            start_date: "",
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
            password2: this.state.password2,
            phone_number: this.state.phone_number,
            address1: this.state.address1,
            address2: this.state.address2, 
            emergency_contact: this.state.emergency_contact,
            start_date: this.state.start_date
        };

        this.props.registerEmployee(newEmployee, this.props.history)
        // this.props.history.push("/employee")
    }

    
    render() {

        const {name, position, email, password, password2, phone_number, address1, address2, emergency_contact, start_date} = this.state;

        return (
            <div>
                <div className='logo'></div>
                <div className='employee_home'>
                    <h1 className='welcome_text'>Welcome to Nancy's</h1><br></br>
                    <h4 className='welcome_text'>Please create your profile</h4>
                </div>
                
                <div className='form_container_wrapper'>
                 <Form className='form_container_employee' onSubmit={this.handleSubmit}>

                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" name="name" placeholder="Enter name" onChange={this.handleChange} value={name} />
                    </Form.Group>
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
                    </Form.Row> <br></br>

                    
                    <Form.Group as={Col} controlId="formGridPosition">
                    <Form.Label>Position</Form.Label>
                    <Form.Control type="position" name="position" placeholder="Enter position" onChange={this.handleChange} value={position} />
                    </Form.Group>
               
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

                    <Button variant="dark" type="submit">Submit</Button>
                </Form>
                </div>

                <div className='contact'> </div>
                    <div className='sub_title'>
                        email: 
                        <a href='mailto:kellysciandra@gmail.com'>  dave / </a> 
                        <a href='mailto:kellysciandra@gmail.com'>steve / </a>
                        <a href='mailto:kellysciandra@gmail.com'>katie / </a>
                        <a href='mailto:kellysciandra@gmail.com'>kelly  </a>
                    </div>
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