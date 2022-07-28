import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import Image from 'react-bootstrap/Image'
import rarefnd_logo from '../../assets/logos/rarefnd_logo.png';
import './index.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';


function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" className="navbar">
      <Container>
        <Link to="/home">
          <Image src={rarefnd_logo} className="logo" to="/home" />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="programs">Programs</Nav.Link>
            <NavDropdown title="Categories" id="collasible-nav-dropdown">
              <NavDropdown.Item href="art">
                Art
              </NavDropdown.Item>
              <NavDropdown.Item href="design-and-tech">
                Design and Tech
              </NavDropdown.Item>
              <NavDropdown.Item href="film">
                Film
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="all">
                All
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Row className="user-log-options">
              <Col md={4}>
                <Button variant="outline-warning" className="btn-log-in" href="/login">Log In</Button>
              </Col>
              <Col md={4}>
                <Button variant="warning" href="/signup" className="btn-signup">Sign Up</Button>
              </Col>
              <Col md={4}>
                <Button variant="light" className="btn-wallet">Connect Wallet</Button>
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;