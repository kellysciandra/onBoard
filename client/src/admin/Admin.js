import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutAdmin, getEmployees } from '../actions/authActions'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class Admin extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutAdmin();
    }

    componentDidMount = () => {
        this.props.getEmployees()
    }

    render() {
            const { admin } = this.props.auth 
            const employees =  this.props.employees ? this.props.employees.map((employee, id) => 
        <Card className='employee_card'>
        <Card.Header>{employee.position}</Card.Header>
        <Card.Body>
        <Card.Title>{employee.name}</Card.Title>
        <Card.Title>{employee.email}</Card.Title>
        <Card.Text>
        phone number: {employee.phone_number}<br></br>
        address on island: {employee.address1}<br></br>
        address off island: {employee.address2}<br></br>
        emergency contact: {employee.emergency_contace}<br></br>
        start date: {employee.start_date}<br></br>
        </Card.Text>
    
        <Button className='button1'>docs</Button>
        <Button className='button2' href={`mailto:${employee.email}`}> email</Button>
        <Button className='button3' href={`mailto:bonniebarrow@hotmail.com`}>you're fired</Button>
 
        </Card.Body>
        </Card>
        ) : <div>loadingggg</div>

        return (
            <div>
                  
                <button className="logout" onClick={this.onLogoutClick}>Logout</button>
                <h1 className='profile'>{this.props.admin}</h1><br></br>
                <h1 className='header'>display email</h1><br></br>
                {employees}
            </div>
        );
    }
}

Admin.propTypes = {
    getEmployees: PropTypes.func.isRequired,
    logoutAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    employees: state.auth.employees,
    auth: state.auth,
    admin: state.auth.admin.name
})


export default connect(mapStateToProps, { logoutAdmin, getEmployees })(Admin);