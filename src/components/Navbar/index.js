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
import ReactSlick from "../../components/ReactSlick";

function NavBar() {
	const [categoriesData, setCategoriesData] = useState({});
	const { user, logOut } = useContext(AuthContext);
	useEffect(() => {
		axios
			.get("http://rarefndapi.herokuapp.com/api/category/")
			.then((response) => setCategoriesData(response.data.categories));
	}, []);

	return (
		<div>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div className="main-nav-bar">
					<div className="home-nav--bar">
						<div
							style={{
								display: "flex",
								width: "100%",
							}}
						>
							<div
								style={{
									display: "flex",
									gap: "1rem",
									padding: "0 1rem 0 1rem",
								}}
							>
								<div className="nav-bar-btn-wrapper nav-bar-btn">
									<Web3ConnectButton />
								</div>
								<div className="nav-bar-btn-wrapper">
									<Button
										className="nav-bar-btn"
										variant="warning"
										onMouseDown={(e) => e.preventDefault()}
										style={{
											whiteSpace: "nowrap",
											textAlign: "center",
											width: "155px",
										}}
										// onClick={props.nextTabFunction}
									>
										Start Project
									</Button>
								</div>
							</div>

							<div className="w-100 text-center">
								<Link to="/home">
									<Image src={rarefnd_logo} className="logo" />
								</Link>
							</div>

							<div
								style={{
									display: "flex",
									gap: "1rem",
									padding: "0 1rem 0 1rem",
								}}
							>
								{user ? (
									<>
										<div className="nav-bar-btn-wrapper">
											<Button
												className="nav-bar-btn"
												variant="outline-warning"
												as={Link}
												to="/logout"
												style={{
													whiteSpace: "nowrap",
													textAlign: "center",
													width: "155px",
												}}
												onMouseDown={logOut}
											>
												Log Out
											</Button>
										</div>
										<div className="nav-bar-btn-wrapper">
											<Button
												className="nav-bar-btn"
												variant="outline-warning"
												as={Link}
												to="/dashboard"
												style={{
													whiteSpace: "nowrap",
													textAlign: "center",
													width: "155px",
												}}
												onMouseDown={logOut}
											>
												Dashboard
											</Button>
										</div>
									</>
								) : (
									<>
										<div className="nav-bar-btn-wrapper">
											<Button
												className="nav-bar-btn"
												variant="outline-warning"
												as={Link}
												to="/login"
												style={{
													whiteSpace: "nowrap",
													textAlign: "center",
													width: "155px",
												}}
												onMouseDown={(e) => e.preventDefault()}
											>
												Log In
											</Button>
										</div>
										<div className="nav-bar-btn-wrapper">
											<Button
												className="nav-bar-btn"
												variant="warning"
												as={Link}
												to="/signup"
												style={{
													whiteSpace: "nowrap",
													textAlign: "center",
													width: "155px",
												}}
												onMouseDown={(e) => e.preventDefault()}
											>
												Sign Up
											</Button>
										</div>
									</>
								)}
							</div>
						</div>
						<div>
							<img
								src="https://assets-global.website-files.com/612f5131b9c94ecd0fe9c722/612f5131b9c94e2c0ee9ca3d_drops.svg"
								className="decor"
							/>
						</div>
					</div>
					<div className="control-btns-menu">
						<hr className="separator-line mx-auto" />
						<div className="control-btns-menu-content">
							<div className="control-menu-sub-btns">
								{user ? (
									<>
										<div className="nav-bar-btn-wrapper">
											<Button
												className="nav-bar-btn-mob"
												variant="outline-warning"
												as={Link}
												to="/logout"
												style={{
													whiteSpace: "nowrap",
													textAlign: "center",
													// width: "155px",
												}}
												onMouseDown={logOut}
											>
												Log Out
											</Button>
										</div>
										<div className="nav-bar-btn-wrapper">
											<Button
												className="nav-bar-btn-mob"
												variant="outline-warning"
												as={Link}
												to="/dashboard"
												style={{
													whiteSpace: "nowrap",
													textAlign: "center",
													width: "155px",
												}}
												onMouseDown={logOut}
											>
												Dashboard
											</Button>
										</div>
									</>
								) : (
									<>
										<div className="nav-bar-btn-wrapper">
											<Button
												className="nav-bar-btn-mob"
												variant="outline-warning"
												as={Link}
												to="/login"
												style={{
													whiteSpace: "nowrap",
													textAlign: "center",
													// width: "155px",
												}}
												onMouseDown={(e) => e.preventDefault()}
											>
												Log In
											</Button>
										</div>
										<div className="nav-bar-btn-wrapper">
											<Button
												className="nav-bar-btn-mob"
												variant="warning"
												as={Link}
												to="/signup"
												style={{
													whiteSpace: "nowrap",
													textAlign: "center",
													// width: "155px",
												}}
												onMouseDown={(e) => e.preventDefault()}
											>
												Sign Up
											</Button>
										</div>
									</>
								)}
							</div>
							<div className="control-menu-sub-btns">
								<Button
									className="nav-bar-btn-mob"
									variant="warning"
									onMouseDown={(e) => e.preventDefault()}
									style={{
										whiteSpace: "nowrap",
										textAlign: "center",
										// width: "155px",
									}}
									// onClick={props.nextTabFunction}
								>
									Start Project
								</Button>
								<div className="nav-bar-btn-wrapper nav-bar-btn-mob">
									<Web3ConnectButton />
								</div>
							</div>
						</div>
						<hr className="separator-line mx-auto" />
					</div>
				</div>
			</div>
			<div className="ResponsiveNav">
				<ReactSlick categoriesData={categoriesData} />
			</div>
		</div>
	);
}

export default NavBar;
