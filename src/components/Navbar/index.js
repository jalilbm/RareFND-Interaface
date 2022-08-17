import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import Image from "react-bootstrap/Image";
import rarefnd_logo from "../../assets/logos/rarefnd_logo.png";
import "./index.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Web3ConnectButton from "../Web3ConnectButton/index";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";

function NavBar() {
	const [sowCategories, setShowCategories] = useState(false);
	const [categoriesData, setCategoriesData] = useState({});
	const [expanded, setExpanded] = useState(false);
	const [showNavItems, setShowNavItems] = useState(false);
	const handleNavClick = () => {
		setShowNavItems(false);
	};
	const { user, logOut } = useContext(AuthContext);
	useEffect(() => {
		axios
			.get("http://c503-94-202-120-29.ngrok.io/api/category/")
			.then((response) => setCategoriesData(response.data.categories));
	}, []);
	const navToggle = () => {
		setExpanded(expanded ? false : true);
	};
	const closeNav = () => {
		setExpanded(false);
	};

	return (
		<Navbar
			id="nav-bar"
			collapseOnSelect
			expand="lg"
			bg="black"
			variant="dark"
			className="navbar"
			sticky="top"
		>
			<Link to="/home" style={{ marginLeft: "40px" }}>
				<Image src={rarefnd_logo} className="logo" />
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				onClick={() => setShowNavItems(!showNavItems)}
				style={{ marginRight: "10px" }}
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div
				className={`collapse navbar-collapse  ${showNavItems ? "show" : ""}`}
				id="navbarCollapse"
				style={{ marginLeft: "40px" }}
			>
				<Nav className="me-auto">
					<Nav.Link
						as={Link}
						to="/about"
						onClick={() => setShowNavItems(!showNavItems)}
						style={{ fontFamily: "Calibri" }}
					>
						About Us
					</Nav.Link>
					<Nav.Link as={Link} to="/programs" onClick={handleNavClick}>
						Programs
					</Nav.Link>
					<NavDropdown
						title="Categories"
						id="collasible-nav-dropdown"
						show={sowCategories}
						onClick={() => setShowCategories(!sowCategories)}
						style={{ maxWidth: "70%" }}
					>
						{Array.from(categoriesData).map((data, idx) => {
							if (data.name.toLowerCase() !== "all") {
								return (
									<NavDropdown.Item
										as={Link}
										to={
											"/category/" +
											data.name.replace(new RegExp(" ", "g"), "-")
										}
										style={{ textTransform: "capitalize" }}
										onClick={() => setShowNavItems(!showNavItems)}
									>
										{data.name}
									</NavDropdown.Item>
								);
							}
						})}
						<NavDropdown.Divider />
						<NavDropdown.Item
							as={Link}
							to="/category/all"
							style={{ textTransform: "capitalize" }}
							onClick={() => setShowNavItems(!showNavItems)}
						>
							all
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<div style={{ marginRight: "20px" }}>
					{user ? (
						<Button
							variant="outline-warning"
							className="btn-log-in"
							as={Link}
							to="/logout"
							style={{ marginRight: "10px" }}
							onMouseDown={logOut}
							onClick={() => setShowNavItems(!showNavItems)}
						>
							Log Out
						</Button>
					) : (
						<>
							<Button
								variant="outline-warning"
								className="btn-log-in"
								as={Link}
								to="/login"
								style={{ marginRight: "10px" }}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => setShowNavItems(!showNavItems)}
							>
								Log In
							</Button>
							<Button
								variant="warning"
								as={Link}
								to="/signup"
								className="btn-signup"
								style={{ marginRight: "10px" }}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => setShowNavItems(!showNavItems)}
							>
								Sign Up
							</Button>
						</>
					)}
					<Web3ConnectButton />
				</div>
			</div>
		</Navbar>
	);
}

export default NavBar;
