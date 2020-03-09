import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>  
   
      <Navbar className='nav_bar' light>
      
      <NavbarToggler onClick={toggleNavbar} className='toggler'/>
        
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/employeeSignUp/" className='link'>snack bar menu</NavLink>
              <NavLink href="/employeeSignUp/" className='link'>upstairs menu</NavLink>
              <NavLink href="/adminSignUp/" className='link'>admin</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    
    </div>
  );
}

export default NavBar;