import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
import avatar from "../../assets/logos/user.png";

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
			.get("https://rarefndapi.herokuapp.com/api/category/")
			.then((response) => setCategoriesData(response.data.categories));
	}, []);

	return (
		<Navbar
		
			id="nav-bar"
			collapseOnSelect
			expand="lg"
			bg="transparent"
			variant="dark"
			className="navbar"
			sticky="top"
			style={{ fontFamily: "'Poppins', sans-serif" }}
		>
			<Link to="/home" style={{ marginLeft: "40px" }}>
				<Image src={rarefnd_logo} className="logo" />
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				onClick={() => {
					setShowNavItems(!showNavItems);
				}}
				style={{ marginRight: "10px" }}
				onMouseDown={(e) => e.preventDefault()}
			>
				<span className="navbar-toggler-icon" />
			</button>
			<div
				className={`collapse navbar-collapse  ${
					showNavItems ? "show" : ""
				} w-100`}
				id="navbarCollapse"
				style={{ marginLeft: "40px" }}
			>
				<Nav className="mx-auto">
					{Array.from(categoriesData).map((data, idx) => {
						if (data.name.toLowerCase() !== "all") {
							return (
								<Nav.Link
									as={Link}
									to={
										"/category/" + data.name.replace(new RegExp(" ", "g"), "-")
									}
									style={{ textTransform: "capitalize" }}
									onClick={() => setShowNavItems(!showNavItems)}
									className="nav-bar-item mx-3"
									// syle={{
									// 	width: "",
									// }}
								>
									{data.name}
								</Nav.Link>
							);
						}
					})}
					<Nav.Link
						as={Link}
						to="/category/all"
						style={{ textTransform: "capitalize" }}
						onClick={() => setShowNavItems(!showNavItems)}
						className="nav-bar-item"
					>
						All Categories
					</Nav.Link>
				</Nav>
				<div style={{ marginRight: "20px", display: "flex" }}>
					{user ? (
						<Button
							variant="outline-warning"
							className="btn-log-in"
							as={Link}
							to="/logout"
							style={{ marginRight: "10px", flex: "4" }}
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
								style={{ marginRight: "10px", flex: "4" }}
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
								style={{ marginRight: "10px", flex: "4" }}
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => setShowNavItems(!showNavItems)}
							>
								Sign Up
							</Button>
						</>
					)}
					<Web3ConnectButton />

					{user && (
						<div className="user-avatar" style={{ flex: "4" }}>
							<img
								className="user-avatar-image"
								src={avatar}
								alt="Avatar"
								style={{
									height: "40px",
									marginLeft: "10px",
									cursor: "pointer",
								}}
							></img>
						</div>
					)}
				</div>
			</div>
		</Navbar>
	);
}

export default NavBar;
