import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./index.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { ProviderContext } from "../../web3/ProviderContext";

export default function () {
	const initialValues = { email: "", password: "" };
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [walletAddress, setWalletAddress] = useState();
	const { provider, setProvider } = useContext(ProviderContext);

	const getWallletAdress = async () => {
		const accounts = await provider.listAccounts();
		if (accounts) setWalletAddress(accounts[0]);
	};

	useEffect(() => {
		if (provider) getWallletAdress();
	}, [provider]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formErrors);
		setFormErrors({ ...formErrors, ...validate(formValues) });
		setIsSubmit(true);
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
		}
	}, [formErrors]);

	useEffect(() => {
		if (formValues.username) {
			axios
				.get(
					`94.202.120.29:8000/api/unique/username/${
						document.getElementById("username").value
					}/`
				)
				.then(function (response) {
					if (!response.data.valid) {
						setFormErrors({
							...formErrors,
							username: "Username already exists",
						});
					} else {
						delete formErrors.username;
					}
				});
		}
	}, [formValues.username]);

	useEffect(() => {
		if (formValues.email) {
			console.log(
				`94.202.120.29:8000/api/unique/username/${
					document.getElementById("username").value
				}/`
			);
			axios
				.get(
					`94.202.120.29:8000/api/unique/email/${
						document.getElementById("email").value
					}/`
				)
				.then(function (response) {
					if (!response.data.valid) {
						setFormErrors({ ...formErrors, email: "Email already exists" });
					} else {
						delete formErrors.email;
					}
				});
		}
	}, [formValues.email]);

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.username) {
			errors.username = "Username is required!";
		} else if (values.username.length < 5) {
			errors.username = "Username must be more than 5 characters";
		} else if (values.username.length > 20) {
			errors.username = "Username cannot exceed more than 20 characters";
		}

		if (!values.email) {
			errors.email = "Email is required!";
		} else if (!regex.test(values.email)) {
			errors.email = "This is not a valid email format!";
		}

		if (!values.password) {
			errors.password = "Password is required";
		} else if (values.password.length < 8) {
			errors.password = "Password must be more than 8 characters";
		} else if (values.password.length > 30) {
			errors.password = "Password cannot exceed more than 30 characters";
		}

		console.log(formErrors);
		return errors;
	};

	return (
		<div className="Sign-Up-Auth-form-container p-5">
			<form className="Auth-form" onSubmit={handleSubmit}>
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">Sign Up</h3>
					<div className="form-group mt-3">
						<label>Username</label>
						<input
							id="username"
							name="username"
							className="form-control mt-1"
							placeholder="Enter Username"
							value={formValues.username}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.username}</p>
					</div>
					<div className="form-group mt-3">
						<label>Email address</label>
						<input
							id="email"
							type="email"
							name="email"
							className="form-control mt-1"
							placeholder="Enter Email"
							value={formValues.email}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.email}</p>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							type="password"
							name="password"
							className="form-control mt-1"
							placeholder="Password"
							value={formValues.password}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.password}</p>
					</div>
					<div className="form-group mt-3">
						<label>Password Confirmation</label>
						<input
							type="password"
							name="password2"
							className="form-control mt-1"
							placeholder="Enter Password"
							value={formValues.password2}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.password2}</p>
					</div>

					<div className="form-group mt-3">
						<label>First Name</label>
						<input
							type="text"
							name="firstname"
							className="form-control mt-1"
							placeholder="Enter Your First Name (Optional)"
							value={formValues.firstname}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.firstname}</p>
					</div>

					<div className="form-group mt-3">
						<label>Last Name</label>
						<input
							type="text"
							name="lastname"
							className="form-control mt-1"
							placeholder="Enter Your Last Name (Optional)"
							value={formValues.lastname}
							onChange={handleChange}
						/>
						<p className="text-danger">{formErrors.lastname}</p>
					</div>

					<div className="form-group mt-3">
						<label>Phone Number</label>
						<PhoneInput
							name="phone"
							className="mt-1"
							inputStyle={{ width: "100%" }}
							// containerClass="form-control mt-1"
							placeholder="Enter Phone Number (Optional)"
							value={formValues.phone}
							onChange={(value) =>
								setFormValues({ ...formValues, phone: value })
							}
							inputProps={{
								name: "phone",
								required: true,
								autoFocus: true,
							}}
						/>
						<p className="text-danger">{formErrors.phone}</p>
					</div>

					<div className="form-group mt-3">
						<label>Wallet Address</label>
						{walletAddress ? (
							<p className="text-success mt-2">
								{walletAddress.slice(0, 10) +
									"....." +
									walletAddress.slice(-10)}
							</p>
						) : (
							<p className="text-danger mt-2">
								Please connect to the website using your wallet
							</p>
						)}
						<p className="text-danger">{formErrors.walletAddress}</p>
					</div>

					<div className="d-grid gap-2 mt-3">
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</div>
					<p className="forgot-password text-right mt-2">
						Forgot <a href="#">password?</a>
					</p>
				</div>
			</form>
		</div>
	);
}
