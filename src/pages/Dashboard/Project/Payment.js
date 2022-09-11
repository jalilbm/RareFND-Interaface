import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import Button from "react-bootstrap/Button";
import UploadButton from "../../../components/UploadButton";
import DropDown from "../../../components/DropDown";
import { useState, useEffect } from "react";
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

	// useEffect(() => {
	// 	axios
	// 		.get("https://rarefndapi.herokuapp.com/api/country/")
	// 		.then((response) => {
	// 			setCountries(response.data.categories);
	// 		});
	// }, []);

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
							name={`ubo-${rowId}-full-name`}
							placeholder={`UBO ${rowId} - full name`}
							type="text"
							// onChange={handleChange}
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
								name={`ubo-${rowId}-position`}
								placeholder={`UBO ${rowId} - full name`}
								type="text"
								// onChange={handleChange}
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
								{`UBO ${rowId} - full name`}
							</p>
							<div className="input-with-title">
								<Calendar />
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
								/>
							</div>
						</div>
					</Col>
				</Row>
				<hr />
			</div>
		);
		setUBOsArray([...UBOsArray, newRow]);
	};
	return (
		<div className="DashboardCreateProjectFunding">
			<DashboardCreateProjectItemHead
				title="Verify your details and link a bank account"
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
									id="company-name"
									maxlength="60"
									name="company-name"
									placeholder="Enter your company name"
									type="text"
									// onChange={handleChange}
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
									id="nature-of-business"
									maxlength="60"
									name="nature-of-business"
									placeholder="Enter your nature of business"
									type="text"
									// onChange={handleChange}
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
									id="company-address"
									maxlength="200"
									name="company-address"
									placeholder="Enter your company address"
									type="text"
									// onChange={handleChange}
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
									id="company-city"
									maxlength="60"
									name="company-city"
									placeholder="Enter your company city"
									type="text"
									// onChange={handleChange}
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
									id="company-zip-code"
									maxlength="50"
									name="company-zip-code"
									placeholder="Enter your company address zip code"
									type="text"
									// onChange={handleChange}
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
									<Calendar />
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
									id="company-reg-num"
									maxlength="80"
									name="company-reg-num"
									placeholder="Company Reg No"
									type="text"
									// onChange={handleChange}
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
									id="company-est-annual-turnover"
									maxlength="80"
									name="company-est-annual-turnover"
									placeholder="Estimated annual turnover"
									type="text"
									// onChange={handleChange}
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
										id="countries-dropdown"
										options={countries.map((subcategory) => {
											if (subcategory.name != "All") return subcategory.name;
										})}
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
									id="tax-id-number"
									maxlength="80"
									name="tax-id-number"
									placeholder="Company tax identification number"
									type="text"
									// onChange={handleChange}
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
									id="white-paper-url"
									maxlength="200"
									name="white-paper-url"
									placeholder="Company White paper URL"
									type="text"
									// onChange={handleChange}
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
									id="tokenomics-url"
									maxlength="80"
									name="tokenomics-url"
									placeholder="Company Tokenomics URL"
									type="text"
									// onChange={handleChange}
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
