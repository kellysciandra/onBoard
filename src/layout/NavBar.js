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
            
              <NavLink href="/employeeSignUp/" className='link'>employee </NavLink>
              <NavLink href="/adminSignUp/" className='link'>admin </NavLink>
              {/* <NavLink href="/javaScript/" className='link'>quiz</NavLink>
              <NavLink href="/glossary/" className='link'>glossary</NavLink> */}
            </NavItem>
            <NavItem>
              {/* <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink> */}
            </NavItem>
            
          </Nav>
        </Collapse>
        {/* <NavLink href="/" className='link_title'>Run VS.</NavLink> */}
      </Navbar>
    </div>
  );
}

export default NavBar;