import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import {Col, Button} from 'react-bootstrap'
import { registerAdmin } from '../actions/authActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'


class SignUpAdmin extends Component {
    constructor() {
        super()

        this.state = {
            name: "",
            email: "",
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
        // if (this.props.auth.isAuthenticated) {
        //     this.props.history.push('/employee')
        // }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        // const newRunner = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     password: this.state.password, 
        //     password2: this.state.password2
        // };

        // this.props.registerRunner(newRunner, this.props.history)
        this.props.history.push("/admin")
    }

    
    render() {

        const {name, email, password, password2} = this.state;

        return (
            <div>
                <div className='block3_signup'></div>
                <h1 className='welcome'>Who do you like better Steve or Kelly?</h1>
                 <Form className='form_container' onSubmit={this.handleSubmit}>

                    <Form.Row>
                         <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" name="name" placeholder="Enter name" onChange={this.handleChange} value={name} />
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

SignUpAdmin.propTypes = {
    registerAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { registerAdmin })(withRouter(SignUpAdmin))