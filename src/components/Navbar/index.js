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
import Web3ConnectButton from '../Web3ConnectButton';


function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" className="navbar" sticky="top">
        <Link to="/home">
          <Image src={rarefnd_logo} className="logo" to="/home" style={{marginLeft: "40px"}}/>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" style={{paddingRight: "40px"}}>
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
          <Button variant="outline-warning" className="btn-log-in" href="/login" style={{marginRight: "10px"}}>Log In</Button>
          <Button variant="warning" href="/signup" className="btn-signup" style={{marginRight: "10px"}}>Sign Up</Button>
          <Web3ConnectButton />
        </Navbar.Collapse>
        
    </Navbar>
  );
}

export default NavBar;