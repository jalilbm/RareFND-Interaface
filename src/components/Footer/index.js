import React from "react";
import { CDBFooter, CDBBox, CDBBtn, CDBIcon } from "cdbreact";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import RareFnd from "../../assets/logos/rarefnd_logo.png";
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";

export default function Footer() {
	const { user, logOut } = useContext(AuthContext);
	return (
		<CDBFooter className="shadow bg-white">
			<CDBBox
				display="flex"
				flex="column"
				className="mx-auto py-3 p-0"
				style={{ width: "90%" }}
			>
				<CDBBox display="flex" justifyContent="between" className="flex-wrap">
					<CDBBox>
						<a href="/" className="align-items-center text-dark">
							<img alt="logo" src={RareFnd} width="90px" />
						</a>
						<p className="my-3 text-secondary" style={{ width: "250px" }}>
							<span className="fw-bold">ADDRESS:</span> DMCC Crypto Centre, 48th
							Floor, Almas Tower, JLT, UAE PO BOX 48800.
						</p>
					</CDBBox>
					<CDBBox>
						<p className="h5" style={{ fontWeight: "600" }}>
							RareFnd
						</p>
						<CDBBox
							flex="column"
							display="flex"
							style={{ cursor: "pointer", padding: "0" }}
						>
							<Link className="text-decoration-none text-secondary" to="/">
								Home
							</Link>
							<Link className="text-decoration-none text-secondary" to="/about">
								About Us
							</Link>
							<Link className="text-decoration-none text-secondary" to="/">
								Contacts
							</Link>
						</CDBBox>
					</CDBBox>
					<CDBBox>
						<p className="h5" style={{ fontWeight: "600" }}>
							Help & Support
						</p>
						<CDBBox
							display="flex"
							flex="column"
							style={{ cursor: "pointer", padding: "0" }}
						>
							<Link className="text-decoration-none text-secondary" to="/">
								Support
							</Link>
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
									Log In
								</Link>
							)}
						</CDBBox>
					</CDBBox>
					<CDBBox>
						<p className="h5" style={{ fontWeight: "600" }}>
							Our services
						</p>
						<CDBBox
							display="flex"
							flex="column"
							style={{ cursor: "pointer", padding: "0" }}
						>
							<Link className="text-decoration-none text-secondary" to="/">
								Startaps Fundraising
							</Link>
							<Link className="text-decoration-none text-secondary" to="/">
								Charities Fundraising
							</Link>
						</CDBBox>
					</CDBBox>
				</CDBBox>
				<CDBBox
					display="flex"
					justifyContent="center"
					style={{ width: "100%" }}
					className="mx-auto"
				>
					<a
						href="https://www.facebook.com/therat.finance/"
						target="_blank"
						className="text-decoration-none"
						rel="noreferrer"
					>
						<CDBBtn flat color="warning" className=" border-0 p-2 ">
							<CDBIcon fab icon="facebook-f" />
						</CDBBtn>
					</a>
					<a
						href="https://twitter.com/rare_fnd"
						target="_blank"
						className="text-decoration-none"
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
						className="text-decoration-none"
						rel="noreferrer"
					>
						<CDBBtn flat color="warning" className=" mx-3 border-0 p-2">
							<CDBIcon fab icon="telegram" />
						</CDBBtn>
					</a>
					<a
						href="https://www.linkedin.com/company/the-rare-antiquities-token/"
						target="_blank"
						className="text-decoration-none"
						rel="noreferrer"
					>
						<CDBBtn flat color="warning" className="border-0 p-2">
							<CDBIcon fab icon="linkedin-in" />
						</CDBBtn>
					</a>
				</CDBBox>
				<small className="text-center mt-2">
					&copy; RareFnd, 2022. All rights reserved.
				</small>
			</CDBBox>
		</CDBFooter>
	);
}
