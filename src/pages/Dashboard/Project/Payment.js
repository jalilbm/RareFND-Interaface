import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import Button from "react-bootstrap/Button";
import UploadButton from "../../../components/UploadButton";
import DropDown from "../../../components/DropDown";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Calendar from "../../../components/Calendar";
import DialogPopup from "../../../components/DialogPopup";

export default function Story(props) {
	const [countries, setCountries] = useState([
		{ name: "India" },
		{ name: "Kingdom of Bahrain" },
		{ name: "Kingdom of Saudi Arabia" },
		{ name: "State of Kuwait" },
		{ name: "Sultanate of Oman" },
		{ name: "State of Qatar" },
		{ name: "United Arab Emirates" },
		{ name: "United Kingdom" },
		{ name: "United States of America" },
	]);
	const [UBOsArray, setUBOsArray] = useState([]);
	const projectDataRef = useRef(props.projectData);
	projectDataRef.current = props.projectData;

	// useEffect(() => {
	// 	axios
	// 		.get(process.env.REACT_APP_BASE_URL + "/api/country/")
	// 		.then((response) => {
	// 			setCountries(response.data.categories);
	// 		});
	// }, []);

	const handleInputChanges = (e, rowId) => {
		const { name, value } = e.target;
		let projectData_ = { ...projectDataRef.current };
		projectData_["payment"]["UBOs"][rowId] = {
			...projectData_["payment"]["UBOs"][rowId],
			[name]: value,
		};

		console.log(projectData_);
		props.setProjectData(projectData_);
	};

	const handleFinish = () => {
		const tokens = JSON.parse(localStorage.getItem("authTokens"));
		const access = tokens.access;
		axios.post(
			process.env.REACT_APP_BASE_URL + "/api/project/add/",
			projectDataRef.current,
			{
				headers: {
					Authorization: `Bearer ${access}`,
				},
			}
		);
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
		} else if (file == "proofOfAddress") {
			if (
				projectDataRef.current &&
				projectDataRef.current["payment"] &&
				projectDataRef.current["payment"][`UBOs`] &&
				projectDataRef.current["payment"][`UBOs`][`${rowId}`] &&
				projectDataRef.current["payment"][`UBOs`][`${rowId}`]["proofOfAddress"]
			)
				return projectDataRef.current["payment"][`UBOs`][`${rowId}`][
					"proofOfAddress"
				].name;
			else return "No file";
		}
	};

	const addUBORow = () => {
		const rowId = UBOsArray.length + 1;
		let newRow = (
			<div style={{ marginBottom: "20px" }} id={`row-${rowId}`}>
				<h3>{`UBO ${rowId} details`}</h3>
				<Row style={{ marginBottom: "20px", width: "100%" }}>
					<div className="input-with-title">
						<p
							style={{
								marginBottom: "3px",
							}}
						>
							{`UBO ${rowId} - full name`}
						</p>
						<input
							className="atomic-text-input w-100"
							id={`ubo-${rowId}-full-name`}
							maxlength="100"
							name={`fullName`}
							placeholder={`UBO ${rowId} - full name`}
							type="text"
							onChange={(e) => handleInputChanges(e, `${rowId}`)}
							value={
								projectDataRef.current &&
								projectDataRef.current["payment"] &&
								projectDataRef.current["payment"]["UBOs"] &&
								projectDataRef.current["payment"]["UBOs"][`${rowId}`] &&
								projectDataRef.current["payment"]["UBOs"][`${rowId}`][
									"fullName"
								]
							}
						/>
					</div>
				</Row>
				<Row style={{ marginBottom: "20px", width: "100%" }}>
					<Col md={6}>
						<div className="input-with-title">
							<p
								style={{
									marginBottom: "3px",
								}}
							>
								{`UBO ${rowId} - position`}
							</p>
							<input
								className="atomic-text-input w-100"
								id={`ubo-${rowId}-position`}
								maxlength="100"
								name={`position`}
								placeholder={`UBO ${rowId} - position`}
								type="text"
								onChange={(e) => handleInputChanges(e, `${rowId}`)}
								value={
									projectDataRef.current &&
									projectDataRef.current["payment"] &&
									projectDataRef.current["payment"]["UBOs"] &&
									projectDataRef.current["payment"]["UBOs"][`${rowId}`] &&
									projectDataRef.current["payment"]["UBOs"][`${rowId}`][
										"position"
									]
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
								{`UBO ${rowId} - Date of Birth`}
							</p>
							<div className="input-with-title">
								<Calendar
									setProjectData={props.setProjectData}
									projectDataRef={projectDataRef}
									rowId={rowId}
									name="dateOfBirth"
									source="payment"
									value={
										projectDataRef.current &&
										projectDataRef.current["payment"] &&
										projectDataRef.current["payment"][`UBOs`] &&
										projectDataRef.current["payment"][`UBOs`][`${rowId}`] &&
										projectDataRef.current["payment"][`UBOs`][`${rowId}`][
											"dateOfBirth"
										]
									}
								/>
							</div>
						</div>
					</Col>
				</Row>
				<Row style={{ marginBottom: "20px", width: "100%" }}>
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
									{`UBO ${rowId} - Upload passport or ID Card`} (.jpg, .jpeg,
									.png, .pdf):
								</p>
								<UploadButton
									title="Select File"
									accepted_formats=".jpg, .jpeg, .png, .pdf"
									name="idFile"
									function_={handleInputChanges}
									rowId={rowId}
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
									{`UBO ${rowId} - Upload proof of address`} (.jpg, .jpeg, .png,
									.pdf):
								</p>
								<UploadButton
									title="Select File"
									accepted_formats=".jpg, .jpeg, .png, .pdf"
									name="proofOfAddress"
									function_={handleInputChanges}
									rowId={rowId}
									valueFunction={getUploadedFileName}
								/>
							</div>
						</div>
					</Col>
				</Row>
				<hr />
			</div>
		);
		setUBOsArray([...UBOsArray, newRow]);

		let projectData_ = { ...projectDataRef.current };
		if (
			projectData_ &&
			projectData_["payment"] &&
			projectData_["payment"][`UBOs`] &&
			projectData_["payment"][`UBOs`][`${rowId}`]
		)
			return null;
		projectData_["payment"]["UBOs"] = {
			...projectData_["payment"]["UBOs"],
			[`${rowId}`]: {
				fullName: null,
				position: null,
				dateOfBirth: null,
				idFile: null,
				proofOfAddress: null,
			},
		};

		props.setProjectData(projectData_);

		console.log(projectData_);
	};

	if (
		projectDataRef.current &&
		projectDataRef.current["payment"] &&
		projectDataRef.current["payment"][`UBOs`] &&
		Object.keys(projectDataRef.current["payment"][`UBOs`]).length >
			UBOsArray.length
	) {
		addUBORow();
	}

	return (
		<div className="DashboardCreateProjectFunding">
			<DashboardCreateProjectItemHead
				title="Verify your details"
				head="Confirm who’s raising funds and receiving them if this project reaches its funding goal. 
        Double-check your information—you agree the details you provide are true and acknowledge they can’t be changed once submitted."
			/>
			<div>
				<Row style={{ padding: "3vw", width: "100%" }}>
					<h1 style={{ marginBottom: "30px" }}>Company Details</h1>
					<Row style={{ marginBottom: "20px", width: "100%" }}>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Company Name
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyName"
									maxlength="60"
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
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Nature of Business
								</p>
								<input
									className="atomic-text-input w-100"
									id="natureOfBusiness"
									maxlength="60"
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
							</div>
						</Col>
					</Row>
					<Row style={{ marginBottom: "20px", width: "100%" }}>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Address
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyAddress"
									maxlength="200"
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
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									City
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyCity"
									maxlength="60"
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
							</div>
						</Col>
					</Row>
					<Row style={{ marginBottom: "20px", width: "100%" }}>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Zip Code
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyZipCode"
									maxlength="50"
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
							</div>
						</Col>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Country
								</p>
								<div className="input-with-title">
									<DropDown
										title="Choose a country"
										id="countries-dropdown"
										options={countries.map((subcategory) => {
											if (subcategory.name != "All") return subcategory.name;
										})}
										function_={(event) =>
											props.updateProjectData(event, "payment")
										}
										value={
											props.projectData &&
											props.projectData["payment"] &&
											props.projectData["payment"].projectCountry
										}
									/>
								</div>
							</div>
						</Col>
					</Row>
					<Row style={{ marginBottom: "20px", width: "100%" }}>
						<Col lg={4}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Incorporation date:
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
									Company Registration Number:
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyRegistrationNumber"
									maxlength="80"
									name="companyRegistrationNumber"
									placeholder="Company Reg No"
									type="text"
									value={
										props.projectData &&
										props.projectData["payment"] &&
										props.projectData["payment"].companyRegistrationNumber
									}
									onChange={(event) =>
										props.updateProjectData(event, "payment")
									}
								/>
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
								</p>
								<input
									className="atomic-text-input w-100"
									id="companyEstimatedAnnualTurnover"
									maxlength="80"
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
							</div>
						</Col>
					</Row>
					<Row style={{ marginBottom: "20px", width: "100%" }}>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Tax Country
								</p>
								<div className="input-with-title">
									<DropDown
										title="Choose a country"
										id="projectTaxCountry"
										options={countries.map((subcategory) => {
											if (subcategory.name != "All") return subcategory.name;
										})}
										function_={(event) =>
											props.updateProjectData(event, "payment")
										}
										value={
											props.projectData &&
											props.projectData["payment"] &&
											props.projectData["payment"].projectTaxCountry
										}
									/>
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
								</p>
								<input
									className="atomic-text-input w-100"
									id="taxIdNumber"
									maxlength="80"
									name="taxIdNumber"
									placeholder="Company tax identification number"
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
							</div>
						</Col>
					</Row>
					<Row style={{ marginBottom: "20px", width: "100%" }}>
						<Col md={6}>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									White paper URL
								</p>
								<input
									className="atomic-text-input w-100"
									id="whitePaperUrl"
									maxlength="200"
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
									Tokenomics URL
								</p>
								<input
									className="atomic-text-input w-100"
									id="tokenomicsUrl"
									maxlength="80"
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
					</Row>
					<Row style={{ marginBottom: "20px", width: "100%" }}>
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
										.png, .pdf):
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
										Upload company structure chart (.jpg, .jpeg, .png, .pdf):
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
				<Row style={{ padding: "3vw", width: "100%" }}>
					<h1 style={{ marginBottom: "30px" }}>UBOs Details</h1>
					{UBOsArray.map((item) => item)}
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
				<Row style={{ padding: "3vw", width: "100%" }}>
					<div style={{ textAlign: "right" }}>
						<DialogPopup
							button={
								<Button
									variant="warning"
									onMouseDown={(e) => e.preventDefault()}
									size="md"
									style={{ borderRadius: "0px", width: "150px" }}
									onClick={handleFinish}
									function_={handleFinish}
								>
									Finish
								</Button>
							}
							title="Project submitted"
							description="Your project has been submitted and it will be soon reviewed by one of our team members, 
							stay tunned, we will contact you soon!"
						/>
					</div>
				</Row>
			</div>
		</div>
	);
}
