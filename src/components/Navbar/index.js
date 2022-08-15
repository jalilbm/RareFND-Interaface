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
	const { user, logOut } = useContext(AuthContext);
	useEffect(() => {
		axios
			.get("http://c503-94-202-120-29.ngrok.io/api/category/")
			.then((response) => setCategoriesData(response.data.categories));
	}, []);

	return (
		<Navbar
			collapseOnSelect
			expand="lg"
			bg="black"
			variant="dark"
			className="navbar"
			sticky="top"
		>
			<Link to="/home">
				<Image
					src={rarefnd_logo}
					className="logo"
					to="/home"
					style={{ marginLeft: "40px" }}
				/>
			</Link>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse
				id="responsive-navbar-nav"
				style={{ paddingRight: "40px" }}
			>
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/about">
						About Us
					</Nav.Link>
					<Nav.Link as={Link} to="/programs">
						Programs
					</Nav.Link>
					<NavDropdown
						title="Categories"
						id="collasible-nav-dropdown"
						show={sowCategories}
						onMouseEnter={() => setShowCategories(true)}
						onMouseLeave={() => setShowCategories(false)}
					>
						{Array.from(categoriesData).map((data, idx) => {
							if (data.name.toLowerCase() !== "all") {
								return (
									<NavDropdown.Item
										// as={Link}
										// to={"/category/" + data.name.replace(new RegExp(' ', 'g'), "-")}
										href={
											"/category/" +
											data.name.replace(new RegExp(" ", "g"), "-")
										}
										style={{ textTransform: "capitalize" }}
									>
										{data.name}
									</NavDropdown.Item>
								);
							}
						})}
						<NavDropdown.Divider />
						<NavDropdown.Item
							// as={Link}
							href="/category/all"
							style={{ textTransform: "capitalize" }}
						>
							all
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				{user ? (
					<Button
						variant="outline-warning"
						className="btn-log-in"
						as={Link}
						to="/login"
						style={{ marginRight: "10px" }}
						onMouseDown={logOut}
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
						>
							Sign Up
						</Button>
					</>
				)}
				<Web3ConnectButton />
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
