import React from "react";
import { CDBFooter, CDBBox, CDBBtn, CDBIcon } from "cdbreact";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RareFnd from "../../assets/logos/rarefnd_logo.png";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import "./index.css";

export default function Footer() {
	const { user, logOut } = useContext(AuthContext);
	return (
		<div className="FooterComponent w-100">
			<div className="FooterDesktop w-100">
				<CDBFooter className="shadow bg-white FooterDesk w-100">
					<CDBBox
						display="flex"
						flex="column"
						className="mx-auto py-3 p-0"
						style={{ width: "90%" }}
					>
						<CDBBox
							display="flex"
							justifyContent="between"
							className="flex-wrap"
						>
							<Row style={{ width: "100%" }}>
								<Col lg={3} md={12}>
									<CDBBox>
										<Link to="/" className="align-items-center text-dark">
											<img alt="logo" src={RareFnd} width="90px" />
										</Link>
										<p
											className="my-3 text-secondary"
											// style={{ width: "20vw" }}
										>
											<span className="fw-bold">ADDRESS: </span>
											<a
												target="_blank"
												rel="noreferrer"
												href="https://maps.app.goo.gl/zaKNmoRAopMUHWDi9"
												className="my-3 text-secondary"
												style={{ width: "250px" }}
											>
												DMCC Crypto Centre, 48th Floor, Almas Tower, JLT, UAE PO
												BOX 48800.
											</a>
										</p>
									</CDBBox>
								</Col>
								<Col lg={3} md={12}>
									<CDBBox className="mt-1">
										<p className="h5" style={{ fontWeight: "600" }}>
											About
										</p>
										<CDBBox
											flex="column"
											display="flex"
											style={{ cursor: "pointer", padding: "0" }}
										>
											<Link
												className="text-decoration-none text-secondary"
												to="/about-us"
											>
												About Us
											</Link>
											<Link
												className="text-decoration-none text-secondary"
												to="#"
											>
												Updates
											</Link>
											<Link
												className="text-decoration-none text-secondary"
												to="#"
											>
												Events
											</Link>
											<a
												className="text-decoration-none text-secondary"
												target="_blank"
												rel="noreferrer"
												href="https://rarefnd.zendesk.com/hc/en-gb"
											>
												Contacts
											</a>
										</CDBBox>
									</CDBBox>
								</Col>
								<Col lg={3} md={12}>
									<CDBBox className="mt-1">
										<p className="h5" style={{ fontWeight: "600" }}>
											Help Centre
										</p>
										<CDBBox
											display="flex"
											flex="column"
											style={{ cursor: "pointer", padding: "0" }}
										>
											<a
												className="text-decoration-none text-secondary"
												target="_blank"
												rel="noreferrer"
												href="https://rarefnd.zendesk.com/hc/en-gb"
											>
												Support
											</a>
											<Link
												className="text-decoration-none text-secondary"
												to="/signup"
											>
												Sign Up
											</Link>
											{user ? (
												<Link
													className="text-decoration-none text-secondary"
													to="/logout"
													onMouseDown={logOut}
												>
													Log Out
												</Link>
											) : (
												<Link
													className="text-decoration-none text-secondary"
													to="/login"
												>
													Login
												</Link>
											)}
										</CDBBox>
									</CDBBox>
								</Col>
								<Col lg={3} md={12}>
									<CDBBox className="mt-1">
										<p className="h5" style={{ fontWeight: "600" }}>
											Partnerships
										</p>
										<CDBBox
											display="flex"
											flex="column"
											style={{ cursor: "pointer", padding: "0" }}
										>
											<Link
												className="text-decoration-none text-secondary"
												to="/partners#crypto-partners"
											>
												Crypto Industry Partners
											</Link>
											<Link
												className="text-decoration-none text-secondary"
												to="/"
											>
												Media Partners
											</Link>
											<Link
												className="text-decoration-none text-secondary"
												to="/"
											>
												Non Profit Industry Partners
											</Link>
											<Link
												className="text-decoration-none text-secondary"
												to="/"
											>
												Incubator Partners
											</Link>
											<a
												className="text-decoration-none text-secondary"
												target="_blank"
												rel="noreferrer"
												href="https://rarefnd.zendesk.com/hc/en-gb"
											>
												Partner with Us
											</a>
										</CDBBox>
									</CDBBox>
								</Col>
							</Row>
						</CDBBox>
						<CDBBox
							display="flex"
							justifyContent="center"
							style={{ width: "100%" }}
							className="mx-auto mt-3"
						>
							<a
								href="https://www.facebook.com/therat.finance/"
								target="_blank"
								rel="noreferrer"
								className="text-decoration-none "
							>
								<CDBBtn flat color="warning" className=" border-0 p-2 ">
									<CDBIcon fab icon="facebook-f" />
								</CDBBtn>
							</a>
							<a
								href="https://twitter.com/rare_fnd"
								target="_blank"
								className="text-decoration-none "
								rel="noreferrer"
							>
								<CDBBtn flat color="warning" className=" border-0 mx-3 p-2">
									<CDBIcon fab icon="twitter" />
								</CDBBtn>
							</a>
							<a
								href="https://www.instagram.com/rarefnd/"
								target="_blank"
								className="text-decoration-none"
								rel="noreferrer"
							>
								<CDBBtn flat color="warning" className=" border-0 p-2">
									<CDBIcon fab icon="instagram" />
								</CDBBtn>
							</a>
							<a
								href="https://t.me/RareFnd"
								target="_blank"
								className="text-decoration-none "
								rel="noreferrer"
							>
								<CDBBtn flat color="warning" className=" mx-3 border-0 p-2">
									<CDBIcon fab icon="telegram" />
								</CDBBtn>
							</a>
							<a
								href="https://www.linkedin.com/company/the-rare-antiquities-token/"
								target="_blank"
								className="text-decoration-none "
								rel="noreferrer"
							>
								<CDBBtn flat color="warning" className="border-0 p-2">
									<CDBIcon fab icon="linkedin-in" />
								</CDBBtn>
							</a>
						</CDBBox>
						<small className="text-center mt-2">
							&copy; RareFnd, 2022. All rights reserved.{" "}
						</small>
						<hr />
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<p>
								<Link
									className="text-decoration-none text-secondary"
									to="/legal"
								>
									Legal Disclaimer
								</Link>{" "}
								|{" "}
								<Link
									className="text-decoration-none text-secondary"
									to="/privacy-policy"
								>
									Privacy Policy
								</Link>{" "}
								|{" "}
								<Link
									className="text-decoration-none text-secondary"
									to="/terms-of-service"
								>
									Terms of Service
								</Link>
							</p>
						</div>
					</CDBBox>
				</CDBFooter>
			</div>
		</div>
	);
}
