import React, { Component } from 'react'

export default class Home extends Component {


  employee = () => {
    this.props.history.push("/employeeSignUp");
  }

  admin = () => {
    this.props.history.push("/employeeLogin")
  }

    render() {
        return (
          <div className='containerHome'> 
             <h1 className='title'>Nancy's 2020</h1>
             <div className='top_links'> 
             <button onClick={this.employee}className='new'>sign up</button>/
             <button onClick={this.admin} className='login'>login</button>/
             <button onClick={this.steve} className='steve'>pictures of steve</button>
             </div>
             
          </div>
        )
    }
}
