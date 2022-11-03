import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import Button from "react-bootstrap/Button";
import UploadButton from "../../../components/UploadButton";
import DropDown from "../../../components/DropDown";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Calendar from "../../../components/Calendar";
import DialogPopup from "../../../components/DialogPopup";
import useAxios from "../../../utils/useAxios/useAxios";
import closeIcon from "../../../assets/closeIcon.png";

export default function Payment(props) {
	const [countries, setCountries] = useState([]);
	const [popUpData, setPopUpData] = useState({
		title: "Please Wait...",
		description: "",
	});
	const projectDataRef = useRef(props.projectData);
	projectDataRef.current = props.projectData;
	let api = useAxios({
		headers: {
			"content-type": "multipart/form-data",
		},
	});

	const removeUBO = (event, item) => {
		event.preventDefault();
		let tmp = { ...projectDataRef.current };
		delete tmp.payment.UBOs[item];
		props.setProjectData(tmp);
	};

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "/api/eligible_country/")
			.then((response) => {
				let eligible_countries = response.data.eligible_countries;
				eligible_countries.sort(
					(a, b) => parseFloat(a.nicename) - parseFloat(b.nicename)
				);
				setCountries(eligible_countries);
			});
	}, []);

	const handleInputChanges = (e, rowId) => {
		const { name, value } = e.target;
		let projectData_ = { ...projectDataRef.current };
		projectData_["payment"]["UBOs"][rowId] = {
			...projectData_["payment"]["UBOs"][rowId],
			[name]: value,
		};

		props.setProjectData(projectData_);
	};

	const handleFinish = () => {
		const tokens = JSON.parse(localStorage.getItem("authTokens"));
		const access = tokens.access;
		api
			.post(
				process.env.REACT_APP_BASE_URL + "/api/project/add/",
				projectDataRef.current
				// {
				// 	headers: {
				// 		Authorization: `Bearer ${access}`,
				// 		"Content-Type": "multipart/form-data",
				// 	},
				// }
			)
			.then((response) => {
				if (response.status === 201) {
					setPopUpData({
						title: "Project submitted",
						description:
							"Your project has been submitted and it will be soon reviewed by one of our team members, stay tunned, we will contact you soon!",
					});
				} else {
					setPopUpData({
						title: "Something Went Wrong!",
						description: `Your Project was not submitted successfully, please verify that you have entered all the necessary data and supplied all the necessary files. The server error was: ${JSON.stringify(
							response.response.data.errors
						)}`,
					});
				}
			})
			.catch((error) => {
				setPopUpData({
					title: "Something Went Wrong!",
					description:
						"Your Project was not submitted successfully, please verify that you have entered all the necessary data and supplied all the necessary files",
				});
			});
	};

	const getUploadedFileName = (file, rowId) => {
		if (file == "idFile") {
			if (
				projectDataRef.current &&
				projectDataRef.current["payment"] &&
				projectDataRef.current["payment"][`UBOs`] &&
				projectDataRef.current["payment"][`UBOs`][`${rowId}`] &&
				projectDataRef.current["payment"][`UBOs`][`${rowId}`]["idFile"]
			)
				return projectDataRef.current["payment"][`UBOs`][`${rowId}`]["idFile"]
					.name;
			else return "No file";
		} else if (file == "proofOfAddressFile") {
			if (
				projectDataRef.current &&
				projectDataRef.current["payment"] &&
				projectDataRef.current["payment"][`UBOs`] &&
				projectDataRef.current["payment"][`UBOs`][`${rowId}`] &&
				projectDataRef.current["payment"][`UBOs`][`${rowId}`][
					"proofOfAddressFile"
				]
			)
				return projectDataRef.current["payment"][`UBOs`][`${rowId}`][
					"proofOfAddressFile"
				].name;
			else return "No file";
		}
	};

	const addUBORow = () => {
		let projectData_ = { ...projectDataRef.current };
		if (!projectData_["payment"]["UBOs"]) projectData_["payment"]["UBOs"] = {};
		const rowId = Object.keys(projectData_["payment"]["UBOs"]).length + 1;

		projectData_["payment"]["UBOs"] = {
			...projectData_["payment"]["UBOs"],
			[`${rowId}`]: {
				fullName: null,
				position: null,
				dateOfBirth: null,
				idFile: null,
				proofOfAddressFile: null,
			},
		};

		props.setProjectData(projectData_);
	};

	return (
		<div className="DashboardCreateProjectPayment" style={{ width: "100%" }}>
			<DashboardCreateProjectItemHead
				title="Verify your details"
				head="Confirm who’s raising funds and receiving them if this project reaches its funding goal. 
        Double-check your information—you agree the details you provide are true and acknowledge they can’t be changed once submitted."
			/>
			<div>
				<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
					<h1 style={{ marginBottom: "30px" }}>Company Details</h1>
					<Row
						style={{
							marginBottom: "20px",
							marginLeft: "0px",
							marginRight: "0px",
						}}
					>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Company Name<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyName"
									maxLength="60"
									name="companyName"
									placeholder="Enter your company name"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].companyName
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
								<p className="invalid-input-p">
									{props.formErrors && props.formErrors.companyName}
								</p>
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Nature of Business<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="natureOfBusiness"
									maxLength="60"
									name="natureOfBusiness"
									placeholder="Enter your nature of business"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].natureOfBusiness
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
								<p className="invalid-input-p">
									{props.formErrors && props.formErrors.natureOfBusiness}
								</p>
							</div>
						</Col>
					</Row>
					<Row
						style={{
							marginBottom: "20px",
							marginLeft: "0px",
							marginRight: "0px",
						}}
					>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Address<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyAddress"
									maxLength="200"
									name="companyAddress"
									placeholder="Enter your company address"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].companyAddress
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
								<p className="invalid-input-p">
									{props.formErrors && props.formErrors.companyAddress}
								</p>
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									City<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyCity"
									maxLength="60"
									name="companyCity"
									placeholder="Enter your company city"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].companyCity
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
								<p className="invalid-input-p">
									{props.formErrors && props.formErrors.companyCity}
								</p>
							</div>
						</Col>
					</Row>
					<Row
						style={{
							marginBottom: "20px",
							marginLeft: "0px",
							marginRight: "0px",
						}}
					>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Zip Code<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyZipCode"
									maxLength="50"
									name="companyZipCode"
									placeholder="Enter your company address zip code"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].companyZipCode
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
								<p className="invalid-input-p">
									{props.formErrors && props.formErrors.companyZipCode}
								</p>
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Country<span className="required-asterisk">*</span>
								</p>
								<div className="input-with-title">
									<DropDown
										title="Choose a country"
										id="companyCountry"
										options={countries.map((country) => country.nicename)}
										function_={(event) =>
											props.updateProjectData(event, "payment")
										}
										value={
											props.projectData &&
											props.projectData["payment"] &&
											props.projectData["payment"].companyCountry
										}
									/>
									<p className="invalid-input-p">
										{props.formErrors && props.formErrors.companyCountry}
									</p>
								</div>
							</div>
						</Col>
					</Row>
					<Row
						style={{
							marginBottom: "20px",
							marginLeft: "0px",
							marginRight: "0px",
						}}
					>
						<Col lg={4}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Incorporation date<span className="required-asterisk">*</span>
								</p>
								<div className="input-with-title">
									<Calendar
										updateProjectData={props.updateProjectData}
										name="projectIncorporationDate"
										value={
											props.projectData &&
											props.projectData["payment"] &&
											props.projectData["payment"].projectIncorporationDate
										}
										source="payment"
									/>
									<p className="invalid-input-p">
										{props.formErrors &&
											props.formErrors.projectIncorporationDate}
									</p>
								</div>
							</div>
						</Col>
						<Col lg={4}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Company Registration Number
									<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyRegistrationNumber"
									maxLength="80"
									name="companyRegistrationNumber"
									placeholder="Company Reg No"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].companyRegistrationNumber
									}
									pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
								<p className="invalid-input-p">
									{props.formErrors &&
										props.formErrors.companyRegistrationNumber}
								</p>
							</div>
						</Col>
						<Col lg={4}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Estimated annual turnover
									<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyEstimatedAnnualTurnover"
									maxLength="80"
									name="companyEstimatedAnnualTurnover"
									placeholder="Estimated annual turnover"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].companyEstimatedAnnualTurnover
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
								<p className="invalid-input-p">
									{props.formErrors &&
										props.formErrors.companyEstimatedAnnualTurnover}
								</p>
							</div>
						</Col>
					</Row>
					<Row
						style={{
							marginBottom: "20px",
							marginLeft: "0px",
							marginRight: "0px",
						}}
					>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Tax Country<span className="required-asterisk">*</span>
								</p>
								<div className="input-with-title">
									<DropDown
										title="Choose a country"
										id="projectTaxCountry"
										options={countries.map((country) => country.nicename)}
										function_={(event) =>
											props.updateProjectData(event, "payment")
										}
										value={
											props.projectData &&
											props.projectData["payment"] &&
											props.projectData["payment"].projectTaxCountry
										}
									/>
									<p className="invalid-input-p">
										{props.formErrors && props.formErrors.projectTaxCountry}
									</p>
								</div>
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Tax identification number
									<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="taxIdNumber"
									maxLength="80"
									name="taxIdNumber"
									placeholder="Company tax identification number"
									pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].taxIdNumber
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
								<p className="invalid-input-p">
									{props.formErrors && props.formErrors.taxIdNumber}
								</p>
							</div>
						</Col>
					</Row>
					{/* <Row
						style={{
							marginBottom: "20px",
							marginLeft: "0px",
							marginRight: "0px",
						}}
					>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									White paper URL<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="whitePaperUrl"
									maxLength="200"
									name="whitePaperUrl"
									placeholder="Company White paper URL"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].whitePaperUrl
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Tokenomics URL<span className="required-asterisk">*</span>
								</p>
								<input
									className="atomic-text-input w-100"
									id="tokenomicsUrl"
									maxLength="80"
									name="tokenomicsUrl"
									placeholder="Company Tokenomics URL"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].tokenomicsUrl
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
							</div>
						</Col>
					</Row> */}
					<Row
						style={{
							marginBottom: "20px",
							marginLeft: "0px",
							marginRight: "0px",
						}}
					>
						<Col md={6}>
							<div className="input-with-title h-100">
								<div
									className="h-100"
									style={{
										display: "flex",
										gap: "20px",
										alignItems: "center",
									}}
								>
									<p style={{ margin: "0px" }}>
										Upload certificate of incumbency/incorporation (.jpg, .jpeg,
										.png, .pdf)<span className="required-asterisk">*</span>
									</p>
									<UploadButton
										title="Select File"
										accepted_formats=".jpg, .jpeg, .png, .pdf"
										updateProjectData={props.updateProjectData}
										name="certificateOfIncumbency"
										value={
											props.projectData &&
											props.projectData["payment"] &&
											props.projectData["payment"].certificateOfIncumbency &&
											props.projectData["payment"].certificateOfIncumbency.name
										}
										source="payment"
									/>
									<p className="invalid-input-p">
										{props.formErrors &&
											props.formErrors.certificateOfIncumbency}
									</p>
								</div>
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title h-100">
								<div
									className="h-100"
									style={{
										display: "flex",
										gap: "20px",
										alignItems: "center",
									}}
								>
									<p style={{ margin: "0px" }}>
										Upload company structure chart (.jpg, .jpeg, .png, .pdf)
									</p>
									<UploadButton
										title="Select File"
										accepted_formats=".jpg, .jpeg, .png, .pdf"
										updateProjectData={props.updateProjectData}
										name="companyStructureChart"
										value={
											props.projectData &&
											props.projectData["payment"] &&
											props.projectData["payment"].companyStructureChart &&
											props.projectData["payment"].companyStructureChart.name
										}
										source="payment"
									/>
								</div>
							</div>
						</Col>
					</Row>
				</Row>
				<hr />
				<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
					<h1 style={{ marginBottom: "30px" }}>UBOs Details</h1>
					{
						///////////
						props.projectData &&
							props.projectData["payment"] &&
							props.projectData["payment"]["UBOs"] &&
							Object.keys(props.projectData["payment"]["UBOs"]).map(
								(item, i) => {
									return (
										<div
											style={{ marginBottom: "20px", position: "relative" }}
											id={`row-${item}`}
										>
											<div
												style={{ position: "absolute", right: "0", top: "0" }}
											>
												<img
													src={closeIcon}
													style={{
														width: "30px",
														cursor: "pointer",
													}}
													onClick={(e) => removeUBO(e, `${item}`)}
												/>
											</div>
											<h3>{`UBO ${item} details`}</h3>
											<Row
												style={{
													marginBottom: "20px",
													marginLeft: "0px",
													marginRight: "0px",
												}}
											>
												<div className="input-with-title">
													<p
														style={{
															marginBottom: "3px",
														}}
													>
														{`UBO ${item} - full name`}
														<span className="required-asterisk">*</span>
													</p>
													<input
														className="atomic-text-input w-100"
														id={`ubo-${item}-full-name`}
														maxLength="100"
														name={`fullName`}
														placeholder={`UBO ${item} - full name`}
														type="text"
														onChange={(e) => handleInputChanges(e, `${item}`)}
														value={
															projectDataRef.current &&
															projectDataRef.current["payment"] &&
															projectDataRef.current["payment"]["UBOs"] &&
															projectDataRef.current["payment"]["UBOs"][
																`${item}`
															] &&
															projectDataRef.current["payment"]["UBOs"][
																`${item}`
															]["fullName"]
														}
													/>
												</div>
											</Row>
											<Row
												style={{
													marginBottom: "20px",
													marginLeft: "0px",
													marginRight: "0px",
												}}
											>
												<Col md={6}>
													<div className="input-with-title">
														<p
															style={{
																marginBottom: "3px",
															}}
														>
															{`UBO ${item} - position`}
															<span className="required-asterisk">*</span>
														</p>
														<input
															className="atomic-text-input w-100"
															id={`ubo-${item}-position`}
															maxLength="100"
															name={`position`}
															placeholder={`UBO ${item} - position`}
															type="text"
															onChange={(e) => handleInputChanges(e, `${item}`)}
															value={
																projectDataRef.current &&
																projectDataRef.current["payment"] &&
																projectDataRef.current["payment"]["UBOs"] &&
																projectDataRef.current["payment"]["UBOs"][
																	`${item}`
																] &&
																projectDataRef.current["payment"]["UBOs"][
																	`${item}`
																]["position"]
															}
														/>
													</div>
												</Col>
												<Col md={6}>
													<div className="input-with-title">
														<p
															style={{
																marginBottom: "3px",
															}}
														>
															{`UBO ${item} - Date of Birth`}
															<span className="required-asterisk">*</span>
														</p>
														<div className="input-with-title">
															<Calendar
																setProjectData={props.setProjectData}
																projectDataRef={projectDataRef}
																rowId={item}
																name="dateOfBirth"
																source="payment"
																value={
																	projectDataRef.current &&
																	projectDataRef.current["payment"] &&
																	projectDataRef.current["payment"][`UBOs`] &&
																	projectDataRef.current["payment"][`UBOs`][
																		`${item}`
																	] &&
																	projectDataRef.current["payment"][`UBOs`][
																		`${item}`
																	]["dateOfBirth"]
																}
															/>
														</div>
													</div>
												</Col>
											</Row>
											<Row
												style={{
													marginBottom: "20px",
													marginLeft: "0px",
													marginRight: "0px",
												}}
											>
												<Col md={6}>
													<div className="input-with-title h-100">
														<div
															className="h-100"
															style={{
																display: "flex",
																gap: "20px",
																alignItems: "center",
															}}
														>
															<p style={{ margin: "0px" }}>
																{`UBO ${item} - Upload passport or ID Card`}{" "}
																(.jpg, .jpeg, .png, .pdf)
																<span className="required-asterisk">*</span>
															</p>
															<UploadButton
																title="Select File"
																accepted_formats=".jpg, .jpeg, .png, .pdf"
																name="idFile"
																function_={handleInputChanges}
																rowId={item}
																valueFunction={getUploadedFileName}
															/>
														</div>
													</div>
												</Col>
												<Col md={6}>
													<div className="input-with-title h-100">
														<div
															className="h-100"
															style={{
																display: "flex",
																gap: "20px",
																alignItems: "center",
															}}
														>
															<p style={{ margin: "0px" }}>
																{`UBO ${item} - Upload proof of address`} (.jpg,
																.jpeg, .png, .pdf)
																<span className="required-asterisk">*</span>
															</p>
															<UploadButton
																title="Select File"
																accepted_formats=".jpg, .jpeg, .png, .pdf"
																name="proofOfAddressFile"
																function_={handleInputChanges}
																rowId={item}
																valueFunction={getUploadedFileName}
															/>
														</div>
													</div>
												</Col>
											</Row>
											<hr />
										</div>
									);
								}
							)
					}
					<Button
						variant="warning"
						size="lg"
						onMouseDown={(e) => e.preventDefault()}
						onClick={addUBORow}
						style={{ borderRadius: "0px" }}
					>
						Add UBO
					</Button>
				</Row>

				<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
					<div style={{ display: "flex", justifyContent: "space-between" }}>
						<div style={{ textAlign: "left" }}>
							<Button
								variant="warning"
								onMouseDown={(e) => e.preventDefault()}
								size="md"
								onClick={props.previousTabFunction}
								style={{
									borderRadius: "0px",
									width: "8vw",
									minWidth: "100px",
								}}
							>
								Previous
							</Button>
						</div>

						<div style={{ textAlign: "right" }}>
							<DialogPopup
								button={
									<Button
										variant="warning"
										onMouseDown={(e) => e.preventDefault()}
										size="md"
										style={{
											borderRadius: "0px",
											width: "8vw",
											minWidth: "100px",
										}}
										onClick={handleFinish}
									>
										Finish
									</Button>
								}
								title={popUpData.title}
								description={popUpData.description}
								closeFunction={() => {
									setPopUpData({ title: "Please Wait...", description: "" });
								}}
							/>
						</div>
					</div>
				</Row>
			</div>
		</div>
	);
}
