import React from 'react';
import { Nav, Navbar, NavDropdown, Container, Button } from 'react-bootstrap';
import logoTienda from '../../../assets/imgs/logoTienda.png';
import '../../../App.css';
import { formatCLP } from '../../utils/formatCLP';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,             // candado cerrado
  faLockOpen,         // candado abierto
  faUser,             // profile
  faRightFromBracket, // logout
  faRightToBracket,   // login
  faUserPlus,         // register
  faCartShopping      // carrito
} from '@fortawesome/free-solid-svg-icons';


const NavBarComponent = ({ cambiarVista }) => {
  const total = 25000;
  const token = false;

  return (
    <Navbar expand="lg" className="navbar" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="brand" href="index.html">
          <img
            src={logoTienda}
            width="50px"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>

            <div className="d-flex order-lg-1 ms-auto me-2">
              <Button variant="outline-light" className="btn-lg-text">
                <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: 8 }} />
                Total: ${formatCLP(total)}
              </Button>
            </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center" style={{ gap: '0.5rem' }}>
            {token ? (

              // Usuario logueado

              <>
                <Nav.Link href="#profile" className="navlink-lg-white">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
                  Profile
                </Nav.Link>
                <Nav.Link href="#logout" className="navlink-lg-white">
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: 8 }} />
                  Logout
                </Nav.Link>
                <Nav.Link disabled className="navlink-lg-white">
                  <FontAwesomeIcon icon={faLockOpen} style={{ marginRight: 8 }} />
                  Sesión activa
                </Nav.Link>
              </>

            ) : (

              // Usuario NO logueado

              <>
                <Nav.Link onClick={() => cambiarVista("login")} className="navlink-lg-white">
                  <FontAwesomeIcon icon={faRightToBracket} style={{ marginRight: 8 }} />
                  Login
                </Nav.Link>
                <Nav.Link onClick={() => cambiarVista("register")} className="navlink-lg-white">
                  <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 8 }} />
                  Register
                </Nav.Link>
                <Nav.Link disabled className="navlink-lg-white">
                  <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                  Sin sesión
                </Nav.Link>
              </>
            )
            }

            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              className="navlink-lg-white"
            >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
