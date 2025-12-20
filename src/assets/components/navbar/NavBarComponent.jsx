import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoTienda from "../../../assets/imgs/logoTienda.png";
import "../../../App.css";
import { formatCLP } from "../../utils/formatCLP";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faUser,
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../../../contexts/UserContext";

const NavBarComponent = ({ total = 0 }) => {
  const { token, logout } = useUser();

  return (
    <Navbar
      expand="lg"
      className="navbar"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand" style={{ cursor: "pointer" }}>
          <img src={logoTienda} width="50px" alt="logo" />
        </Navbar.Brand>

        {/* ✅ SIEMPRE visible (como antes) para no romper el layout */}
        <div className="d-flex order-lg-1 ms-auto me-2">
          <Button
            as={Link}
            to="/cart"
            variant="outline-light"
            className="btn-lg-text"
            title="Ver carrito"
          >
            <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: 8 }} />
            Total: {formatCLP(total)}
          </Button>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center" style={{ gap: "0.5rem" }}>
            {token ? (
              <>
                <Nav.Link as={Link} to="/profile" className="navlink-lg-white">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} />
                  Profile
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/"
                  className="navlink-lg-white"
                  onClick={logout}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: 8 }} />
                  Logout
                </Nav.Link>

                <Nav.Link
                  disabled
                  className="navlink-lg-white"
                  style={{ marginRight: "20px" }}
                >
                  <FontAwesomeIcon icon={faLockOpen} style={{ marginRight: 8 }} />
                  Sesión activa
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="navlink-lg-white">
                  <FontAwesomeIcon icon={faRightToBracket} style={{ marginRight: 8 }} />
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/register" className="navlink-lg-white">
                  <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 8 }} />
                  Register
                </Nav.Link>

                <Nav.Link
                  disabled
                  className="navlink-lg-white"
                  style={{ marginRight: "20px" }}
                >
                  <FontAwesomeIcon icon={faLock} style={{ marginRight: 8 }} />
                  Sin sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
