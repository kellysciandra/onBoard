import React, { Component } from 'react';


import { editEmployee } from '../actions/authActions'
import { logoutEmployee } from '../actions/authActions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import EmployeeDocs from '../package/EmployeeDocs.js'

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

    componentWillReceiveProps(nextProps) {
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

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutEmployee();
      };




    render() {
        

        return (
            <div>
                <button className="logout_employee" onClick={this.onLogoutClick}>Logout</button>      
                <h1 className='profile'>{this.props.employee}</h1><br></br>   
                <h1 className='header'>please read the following forms</h1><br></br>
                <h1 className='header'>sign each page</h1><br></br>
                <h1 className='header'>once you hit submit the documents load</h1>
                <EmployeeDocs />
          
                
            </div>
        );
    }
}

Employee.propTypes = {
    logoutEmployee: PropTypes.func.isRequired, 
    editEmployee: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ 
    employee: state.auth.employee.name,
    auth: state.auth,
    errors: console.log(state)
})



export default connect(mapStateToProps, { editEmployee, logoutEmployee })(withRouter(Employee))