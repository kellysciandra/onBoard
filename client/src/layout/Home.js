import React, { Component } from 'react'

export default class Home extends Component {


  employee = () => {
    this.props.history.push("/employeeSignUp");
  }

    render() {
        return (
          <div> 
              <div className='logo'></div>
             <h1 className='title'>Nancy's 2020</h1>
             <div className='top_links'> 
             <button onClick={this.employee} className='new'>new employee</button>
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
