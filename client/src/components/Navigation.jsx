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
              <LinkContainer to="/regionalhubs/london">
                <NavDropdown.Item>London</NavDropdown.Item>
              </LinkContainer>
              {/* Add more regional hubs as needed */}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;