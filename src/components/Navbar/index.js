import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Image from "react-bootstrap/Image";
import rarefnd_logo from "../../assets/logos/rarefnd_logo.png";
import "./index.css";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Web3ConnectButton from "../Web3ConnectButton/index";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Context/AuthContext";
import ReactSlick from "../ReactSlick/index";

const navdata = [
	"Comics & Illustration",
	"Film",
	"Food & Craft",
	"Games",
	"Music",
	"Publishing",
];

function NavBar() {
	const [categoriesData, setCategoriesData] = useState({});
	const [showNavItems, setShowNavItems] = useState(false);
	const navigate = useNavigate();

	const { user, logOut } = useContext(AuthContext);
	useEffect(() => {
		axios
			.get("https://rarefndapi.herokuapp.com/api/category/")
			.then((response) => setCategoriesData(response.data.categories));
	}, []);

	return (
		<div>
			<Navbar 
				id="nav-bar"
				collapseOnSelect
				expand="lg"
				variant="dark"
				className="navbar"
				sticky="top"
			>
				<div className="row topNavRow mx-auto" >
					<div className="col-12 col-md-4 TopLargeleftSec">
						<div className="ConnectBtnLarge">
							<Web3ConnectButton />
							<Button
								variant="warning"
								as={Link}
								to="/start-project"
								className="btn-signup"
								style={{ marginRight: "10px",fontFamily: "'Poppins', sans-serif" }}
								onMouseDown={(e) => e.preventDefault()}
							>
								Start a Project
							</Button>
						</div>
					</div>
					<div className="col-12 col-md-4 TopLargeMiddleSec ">
						<Link to="/home" style={{ marginLeft: "40px" }}>
							<Image src={rarefnd_logo} className="logo" />
						</Link>
					</div>
					<div className="col-12 col-md-4 TopLargeRightSec">
						<div
							className="CollapsButtonsDivLarge"
							style={{ marginRight: "20px" }}
						>
							{user ? (
								<Button
									variant="outline-warning"
									className="btn-log-in"
									as={Link}
									to="/logout"
									style={{ marginRight: "10px" ,fontFamily: "'Poppins', sans-serif"}}
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
										style={{ marginRight: "10px",fontFamily: "'Poppins', sans-serif" }}
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
										style={{ marginRight: "10px",fontFamily: "'Poppins', sans-serif" }}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => setShowNavItems(!showNavItems)}
									>
										Sign Up
									</Button>
								</>
							)}
						</div>
						<div className="row mobileShowButtons">
							<div
								className="col-md-12"
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div style={{ display: "flex" }}>
									<Web3ConnectButton />
									<button
										style={{
											fontSize: "0.7rem",
											textDecoration: "Underline",
											textUnderlineOffset: "3px",
										}}
										as={Link}
										to="/start-project"
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => navigate("/start-project")}
									>
										Start a Project
									</button>
								</div>
								<div>
									<button
										style={{ fontSize: "0.7rem" }}
										as={Link}
										onClick={() => navigate("/login")}
										to="/login"
									>
										Log In
									</button>
									<button
										style={{ fontSize: "0.7rem" }}
										as={Link}
										onClick={() => navigate("/signup")}
										to="/signup"
									>
										Sign Up
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row webNavLinks">
				<div><img src="https://assets-global.website-files.com/612f5131b9c94ecd0fe9c722/612f5131b9c94e2c0ee9ca3d_drops.svg" className="decor"/></div>	
					<Nav
					  
						className="mx-auto mainNavbar"
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						{Array.from(categoriesData).map((data, idx) => {
							if (data.name.toLowerCase() !== "all") {
								return (
									<Nav.Link
									
										as={Link}
										to={
											"/category/" +
											data.name.replace(new RegExp(" ", "g"), "-")
										}
										style={{ textTransform: "capitalize" }}
										onClick={() => setShowNavItems(!showNavItems)}
										className="nav-bar-item "
									>
										{data.name}
									</Nav.Link>
								);
							}
						})}
						<div className="ExtraNavItems">
							{navdata.map((item) => {
								return (
									<Nav.Link
										as={Link}
										to="/commingSoon"
										style={{ textTransform: "capitalize" }}
										onClick={() => setShowNavItems(!showNavItems)}
										className="nav-bar-item"
									>
										{item}
									</Nav.Link>
								);
							})}
						</div>
					</Nav>
				</div>
				<div className="ResponsiveNav">
					<ReactSlick />
				</div>
			</Navbar>
		</div>
	);
}

export default NavBar;
