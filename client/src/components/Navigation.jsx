// Navigation.jsx

import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assets/Logo.png'; 
import './styles/navbar.css'; 

const Navigation = () => {
  return (
    <Navbar variant="dark" expand="lg" className="mb-3">
      <Container className='navbar-container'>
        <Navbar.Brand href="/">
          <img
            src={logo}
            className="d-inline-block align-top"
            alt="Rainforest Retail Logo"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/vans">
              <Nav.Link>Vans</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/orders">
              <Nav.Link>Orders</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Regional Hubs" id="basic-nav-dropdown">
              <LinkContainer to="/regionalhubs/1">
                <NavDropdown.Item className='region-dropdown'>London</NavDropdown.Item>
              </LinkContainer>
              {/* Add Midlands hub */}
              <LinkContainer to="/regionalhubs/2">
                <NavDropdown.Item className='region-dropdown'>Midlands</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;