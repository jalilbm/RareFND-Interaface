import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import { useState, useEffect } from "react";
import UploadButton from "../../../components/UploadButton";
import Button from "react-bootstrap/Button";

export default function Funding(props) {
	const [fundingData, setFundingData] = useState([{}]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFundingData({ ...fundingData, [name]: value });
	};

	return (
		<div className="DashboardCreateProjectFunding">
			<DashboardCreateProjectItemHead
				title="Let’s talk about money"
				head="Plan and manage your project’s finances."
			/>
			<Row style={{ padding: "3vw", width: "100%" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Funding goal
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Set an achievable goal that covers what you need to complete
									your project.
								</span>
							</p>
							<p className="">
								<span>
									Funding is all-or-nothing. If you don’t meet your goal, you
									won’t receive any money.
								</span>
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
							Goal amount (in US dollars)
						</p>
						<input
							className="atomic-text-input w-100"
							id="funds-amount"
							maxlength="60"
							name="title"
							placeholder="$ 0.0"
							type="text"
							onChange={handleChange}
							pattern="(^[0-9]{0,2}$)|(^[0-9]{0,2}\.[0-9]{0,5}$)"
						/>
					</div>
				</Col>
			</Row>
			<hr />
			<Row style={{ padding: "3vw", width: "100%" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project budget (optional)
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Determine the various costs to bring your project to life.
								</span>
							</p>
							<p className="">
								<span>
									On a spreadsheet or a CSV file, share your project details,
									plans and expenses{" "}
								</span>
							</p>
							<p className="">
								<span>
									Funding is all-or-nothing. If you don’t meet your goal, you
									won’t receive any money.
								</span>
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
							<p style={{ margin: "0px" }}>Upload File (.xlsx, csv):</p>
							<UploadButton title="Select File" accepted_formats=".xlsx, csv" />
						</div>
					</div>
				</Col>
			</Row>
			<Row style={{ padding: "3vw", width: "100%" }}>
				<div style={{ textAlign: "right" }}>
					<Button
						variant="warning"
						onMouseDown={(e) => e.preventDefault()}
						size="md"
						onClick={props.nextTabFunction}
						style={{ borderRadius: "0px", width: "150px" }}
					>
						Next
					</Button>
				</div>
			</Row>
		</div>
	);
}