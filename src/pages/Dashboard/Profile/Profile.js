import SideBar from "../../../components/DashboardSideBare";
import DialogPopup from "../../../components/DialogPopup";
import "./profile.scss";
import PhoneInput from "react-phone-input-2";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "../../../utils/useAxios/useAxios";
import validator from "validator";
import { ErrorSharp } from "@mui/icons-material";
import { Button, Image, Avatar } from "antd";

export default function DashboardProfile(props) {
	const location = useLocation();
	const [userData, setUserData] = useState({});
	const [errors, setErrors] = useState({});
	const [formErrors, setFormErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);
	let api = useAxios();

	useEffect(() => {
		api.get("/api/user/profile_info/").then((response) => {
			setUserData(response.data);
		});
	}, []);

	const handleChanges = (event) => {
		const { name, value } = event.target;
		let tmp = { ...formErrors };
		delete tmp[name];
		setFormErrors({ ...tmp });
		if (userData) {
			setUserData({
				...userData,
				[name]: value,
			});
		}
	};

	const saveProfile = () => {
		if (Object.keys(formErrors).length > 0) {
			setSubmitted(!submitted);
		}
		let tmp = userData;
		if (userData.phone !== "" && !`${userData.phone}`.includes("+")) {
			tmp = { ...tmp, phone: `+${userData.phone}` };
		}
		setUserData({ ...tmp });
		if (!tmp.username) {
			setFormErrors({
				...useAxios,
				email: "Email required",
			});
			return;
		}

		if (!tmp.email) {
			setFormErrors({
				...useAxios,
				email: "Email required",
			});
			return;
		}

		api
			.get(
				process.env.REACT_APP_BASE_URL + `/api/unique/username/${tmp.username}/`
			)
			.then((response) => {
				if (!response.data || !response.data.valid) {
					setFormErrors({
						...useAxios,
						username: "Username already exists",
					});
				}
			})
			.then(() => {
				api
					.get(
						process.env.REACT_APP_BASE_URL + `/api/unique/email/${tmp.email}/`
					)

					.then((response) => {
						if (!response.data || !response.data.valid) {
							setFormErrors({
								...useAxios,
								email: "Email already exists",
							});
						}
					})
					.then(() => {
						setSubmitted(!submitted);
					});
			});
	};

	useEffect(() => {
		if (Object.keys(userData).length > 0 && submitted) {
			if (Object.keys(formErrors).length === 0) {
				api.put("/api/user/update/", userData).then((response) => {
					if (response.status === 200) {
						window.alert("Account Updated");
					} else {
						window.alert(JSON.stringify(response.response.data.errors));
					}
				});
			} else {
				window.alert("Error");
			}
		}
	}, [submitted]);

	return (
		<div className="dashboard-profile">
			{location.pathname !== "/dashboard/projects" && <SideBar />}
			<div className="dashboard-profile-container">
				<div className="row" style={{ width: "100%" }}>
					<div className="col-md-5 border-right">
						<div className="d-flex flex-column align-items-center text-center p-3 py-5">
							<Avatar
								style={{ width: 64, height: 64 }}
								src={
									<Image
										src={userData && userData.owner_profile_picture}
										style={{ width: 64, height: 64 }}
									/>
								}
							/>
							<span className="font-weight-bold">
								@{userData && userData.username}
							</span>
							<span className="text-black-50">
								{userData && userData.email}
							</span>
						</div>
					</div>
					<div className="col-md-7 border-right">
						<div className="p-3 py-5">
							<div className="d-flex justify-content-between align-items-center mb-3">
								<h4 className="text-right">Profile Settings</h4>
							</div>
							<div className="row mt-2">
								<div className="col-md-6">
									<label className="labels">
										First name<span className="required-asterisk">*</span>
									</label>
									<input
										name="first_name"
										type="text"
										className="form-control"
										value={userData && userData.first_name}
										onChange={handleChanges}
									/>
								</div>
								<div className="col-md-6">
									<label className="labels">
										Last name<span className="required-asterisk">*</span>
									</label>
									<input
										name="last_name"
										type="text"
										className="form-control"
										value={userData && userData.last_name}
										onChange={handleChanges}
									/>
								</div>
							</div>

							<div className="row mt-2">
								<div className="col-md-6">
									<label className="labels">
										Email<span className="required-asterisk">*</span>
									</label>
									<input
										name="email"
										type="text"
										className="form-control"
										value={userData && userData.email}
										onChange={handleChanges}
									/>
									<p id="email-validity" className="invalid-input-p">
										{formErrors.email}
									</p>
								</div>
								<div className="col-md-6">
									<label className="labels">
										Username<span className="required-asterisk">*</span>
									</label>
									<input
										name="username"
										type="text"
										className="form-control"
										value={userData && userData.username}
										onChange={handleChanges}
									/>
									<p id="username-validity" className="invalid-input-p">
										{formErrors.username}
									</p>
								</div>
							</div>
							<div className="row mt-2">
								<div className="col-md-12">
									<label className="labels">
										Bio<span className="required-asterisk">*</span>
									</label>
									<textarea
										className="form-control"
										name="bio"
										type="text"
										value={userData && userData.bio}
										onChange={handleChanges}
									></textarea>
								</div>
							</div>

							<div className="row mt-3">
								<div className="col-md-12">
									<label className="labels">Mobile Number</label>
									<PhoneInput
										id="phonenumber"
										name="phone"
										classNameName="mt-1"
										inputStyle={{ width: "100%" }}
										value={userData && userData.phone}
										onChange={(value) => {
											const isValidPhoneNumber = validator.isMobilePhone(value);
											const phone = "phone";
											if (!isValidPhoneNumber) {
												setFormErrors({
													...errors,
													phone: "Invalid phone number",
												});
											} else if (formErrors["phone"]) {
												let tmp = { ...formErrors };
												delete tmp[phone];
												setFormErrors({ ...tmp });
											}
											setUserData({
												...userData,
												phone: `${value}`,
											});
										}}
										inputProps={{
											name: "phone",
											// required: true,
											autoFocus: true,
										}}
									/>
									<p id="phone-number-validity" className="invalid-input-p">
										{formErrors.phone}
									</p>
								</div>
							</div>
							<div className="mt-5 text-center">
								<button
									className="btn btn-primary profile-button"
									type="button"
									onClick={saveProfile}
								>
									Save Profile
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
