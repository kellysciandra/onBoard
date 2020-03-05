import React, { Component } from 'react'

export default class Home extends Component {


  employee = () => {
    this.props.history.push("/employeeSignUp");
  }

  admin = () => {
    this.props.history.push("/adminSignUp")
  }

    render() {
        return (
            <div> 
 
            <div className='block'></div>
            <div className='block1'><button onClick={this.employee}className='employee'>employee</button></div>
          <div className='block3'><button onClick={this.admin} className='admin'>admin</button></div>

      
            </div>
        )
    }
}
