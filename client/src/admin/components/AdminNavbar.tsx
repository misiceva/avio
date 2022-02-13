import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Nav, Navbar } from 'rsuite';
interface Props {
  onLogout: () => void,
}
export default function AdminNavbar(props: Props) {
  return (
    <Navbar>
      <Navbar.Brand  >
        Cristina Airlines
      </Navbar.Brand>
      <Nav>
        <Nav.Item>
          <NavLink to='/airplanes'>
            Airplanes
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink to='/flights'>
            Flights
          </NavLink>
        </Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item>
          <Button appearance='primary' onClick={props.onLogout}>Logout</Button>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}
