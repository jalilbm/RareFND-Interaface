import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Calendar from "../../../components/Calendar";
import ExtensibleInputs from "../../../components/ExtensibleInputs";

export default function Funding(props) {
	const [rewardsArray, setRewardsArray] = useState({});
	const rewardsArrayRef = useRef(rewardsArray);
	rewardsArrayRef.current = rewardsArray;
	const projectDataRef = useRef(props.projectData);
	projectDataRef.current = props.projectData;

	const handleInputChanges = (e, rowId) => {
		const { name, value } = e.target;
		let projectData_ = { ...projectDataRef.current };
		projectData_["rewards"][rowId] = {
			...projectData_["rewards"][rowId],
			[name]: value,
		};

		console.log(projectData_);
		props.setProjectData(projectData_);
	};

	const addRewardRow = () => {
		const rowId = Object.keys(rewardsArray).length + 1;
		let newRow = (
			<div style={{ marginBottom: "20px" }} id={`row-${rowId}`}>
				<Row>
					<Col>
						<h3>{`Incentive ${rowId}`}</h3>
						<div className="input-with-title">
							<p
								style={{
									marginBottom: "3px",
								}}
							>
								Incentive Title
							</p>
							<input
								className="atomic-text-input w-100"
								id="incentiveTitle"
								maxlength="60"
								name="incentiveTitle"
								placeholder="Title"
								type="text"
								onChange={(e) => handleInputChanges(e, `${rowId}`)}
								value={
									props.projectData &&
									props.projectData["rewards"] &&
									props.projectData["rewards"][`${rowId}`] &&
									props.projectData["rewards"][`${rowId}`]["incentiveTitle"]
								}
							/>
						</div>
						<div className="input-with-title">
							<p
								style={{
									marginBottom: "3px",
								}}
							>
								Incentive description
							</p>
							<textarea
								className="atomic-text-input w-100 h-50"
								id="incentiveDescription"
								maxlength="135"
								name="incentiveDescription"
								placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
								onChange={(e) => handleInputChanges(e, `${rowId}`)}
								value={
									props.projectData &&
									props.projectData["rewards"] &&
									props.projectData["rewards"][`${rowId}`] &&
									props.projectData["rewards"][`${rowId}`][
										"incentiveDescription"
									]
								}
							></textarea>
						</div>
						<p
							style={{
								marginBottom: "3px",
							}}
						>
							Estimated delivery
						</p>
						<div className="input-with-title">
							<Calendar
								setProjectData={props.setProjectData}
								projectDataRef={projectDataRef}
								rowId={rowId}
								name="incentiveEstimatedDelivery"
								value={
									props.projectData &&
									props.projectData["rewards"] &&
									props.projectData["rewards"][`${rowId}`] &&
									props.projectData["rewards"][`${rowId}`][
										"incentiveEstimatedDelivery"
									]
								}
								source="rewards"
							/>
						</div>
						<div className="input-with-title">
							<p
								style={{
									marginBottom: "3px",
								}}
							>
								Available items
							</p>
							<input
								className="atomic-text-input w-100"
								id="availableIncentives"
								maxlength="60"
								name="availableIncentives"
								placeholder="0"
								type="text"
								onChange={(e) => handleInputChanges(e, `${rowId}`)}
								value={
									props.projectData &&
									props.projectData["rewards"] &&
									props.projectData["rewards"][`${rowId}`] &&
									props.projectData["rewards"][`${rowId}`][
										"availableIncentives"
									]
								}
							/>
						</div>
						<div className="input-with-title">
							<p
								style={{
									marginBottom: "3px",
								}}
							>
								Required contribution amount
							</p>
							<input
								className="atomic-text-input w-100"
								id="incentivePrice"
								maxlength="60"
								name="incentivePrice"
								placeholder="$ 0.0"
								type="text"
								onChange={(e) => handleInputChanges(e, `${rowId}`)}
								value={
									props.projectData &&
									props.projectData["rewards"] &&
									props.projectData["rewards"][`${rowId}`] &&
									props.projectData["rewards"][`${rowId}`]["incentivePrice"]
								}
							/>
						</div>
					</Col>
					<Col>
						<ExtensibleInputs
							title="Incentive includes:"
							className="incentive-input"
							maxLength={40}
							placeholder="Free ticket to a cinema movie"
							projectDataRef={projectDataRef}
							setProjectData={props.setProjectData}
							rowId={`${rowId}`}
							style={{ width: "100%" }}
						/>
					</Col>
				</Row>
				<hr />
			</div>
		);
		setRewardsArray({ ...rewardsArray, [rowId]: newRow });

		let projectData_ = { ...projectDataRef.current };
		if (projectData_["rewards"] && projectData_["rewards"][`${rowId}`])
			return null;
		projectData_["rewards"] = {
			...projectData_["rewards"],
			[`${rowId}`]: {
				incentiveTitle: null,
				incentiveDescription: null,
				estimatedDelivery: null,
				availableItems: null,
				requiredContributionAmount: null,
				includedIncentives: [],
			},
		};

		props.setProjectData(projectData_);

		console.log(projectData_);
	};

	if (
		projectDataRef.current &&
		projectDataRef.current["rewards"] &&
		Object.keys(projectDataRef.current["rewards"]).length >
			Object.keys(rewardsArray).length
	) {
		return addRewardRow();
	}

	return (
		<div className="DashboardCreateProjectRewards">
			<DashboardCreateProjectItemHead
				title="Add your rewards"
				head="Offer simple, meaningful ways to bring backers closer to your project and celebrate it coming to life."
			/>
			<Row style={{ padding: "3vw", width: "100%" }}>
				{Object.keys(rewardsArray).map((item, i) => rewardsArray[item])}
				<Button
					variant="warning"
					size="lg"
					onMouseDown={(e) => e.preventDefault()}
					onClick={addRewardRow}
					style={{ borderRadius: "0px" }}
				>
					Add Incentive
				</Button>
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
