import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import {Col, Button} from 'react-bootstrap'

class Employee extends Component {


    render() {
        return (
            <div> 
                <h1 className='profile'>hi name please complete your profile</h1><br></br>
                <h1 className='header'>display email</h1><br></br>
                <h1 className='header'>display position</h1><br></br>

                <Form className='form_container' onSubmit={this.handleSubmit}>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="name" name="name" placeholder="Enter name" onChange={this.handleChange}/>
                    </Form.Group>
        
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Address On Island</Form.Label>
                    <Form.Control type="name" name="name" placeholder="Address On Island" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Address Off Island</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Address Off Island" onChange={this.handleChange}  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Emergency Contact/ Phone Number</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Name/Number" onChange={this.handleChange}  />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Start Date" onChange={this.handleChange}  />
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

export default Employee;