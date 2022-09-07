import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Calendar from "../../../components/Calendar";
import ExtensibleInputs from "../../../components/ExtensibleInputs";

export default function Funding(props) {
	const [fundingData, setFundingData] = useState([{}]);
	const [rewardsArray, setRewardsArray] = useState({});
	const rewardsArrayRef = useRef(rewardsArray);
	rewardsArrayRef.current = rewardsArray;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFundingData({ ...fundingData, [name]: value });
	};

	const addRewardRow = () => {
		const rowId = Object.keys(rewardsArray).length + 1;
		let newRow = {
			inputs: (
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
									id="incentive-title"
									maxlength="60"
									name="title"
									placeholder="Title"
									type="text"
									onChange={handleChange}
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
									id="project-description"
									maxlength="135"
									name="description"
									placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
									onChange={handleChange}
								></textarea>
							</div>
							<p
								style={{
									marginBottom: "3px",
								}}
							>
								Estimated delivery:
							</p>
							<div className="input-with-title">
								<Calendar />
							</div>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Available items:
								</p>
								<input
									className="atomic-text-input w-100"
									id="available-incentives"
									maxlength="60"
									name="title"
									placeholder="0"
									type="text"
									onChange={handleChange}
									pattern="\d*"
								/>
							</div>
							<div className="input-with-title">
								<p
									style={{
										marginBottom: "3px",
									}}
								>
									Required contribution amount:
								</p>
								<input
									className="atomic-text-input w-100"
									id="incentive-price"
									maxlength="60"
									name="title"
									placeholder="$ 0.0"
									type="text"
									onChange={handleChange}
									pattern="(^[0-9]{0,2}$)|(^[0-9]{0,2}\.[0-9]{0,5}$)"
								/>
							</div>
						</Col>
						<Col>
							<ExtensibleInputs
								title="Incentive includes:"
								className="incentive-input"
								maxLength={40}
								name="incentive-input"
								placeholder="Free ticket to a cinema movie"
								function_={handleChange}
								style={{ width: "100%" }}
							/>
						</Col>
					</Row>
					<hr />
				</div>
			),
			incentives: [],
		};
		setRewardsArray({ ...rewardsArray, [rowId]: newRow });
	};
	return (
		<div className="DashboardCreateProjectRewards">
			<DashboardCreateProjectItemHead
				title="Add your rewards"
				head="Offer simple, meaningful ways to bring backers closer to your project and celebrate it coming to life."
			/>
			<Row style={{ padding: "3vw", width: "100%" }}>
				{Object.keys(rewardsArray).map((item, i) => rewardsArray[item].inputs)}
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
