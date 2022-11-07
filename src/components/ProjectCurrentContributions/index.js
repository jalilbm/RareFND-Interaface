import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useParams } from "react-router";

export default function ProjectCurrentContributions(props) {
	const { id } = useParams();
	const [projectData, setProjectData] = useState(null);
	const [usdRaisedAmount, setUsdRaisedAmount] = useState(0);
	useEffect(() => {
		let interval = setInterval(() => {
			axios
				.get(process.env.REACT_APP_BASE_URL + `/api/project/${id}/`)
				.then((response) => response.data)
				.then((data) => {
					setProjectData(data);
					setUsdRaisedAmount(Number(data.raised_amount) + data.current_reward);
					if (
						Number(data.raised_amount) + data.current_reward >=
						data.fund_amount
					) {
						props.setProjectSuccessfullyEnded(true);
					}
					props.setFundingDataUpdated(true);
				});
		}, 1000 * 5);
		// props.setFundingDataUpdated(true);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="project-current-contributions bg-warning p-5">
			{projectData ? (
				<div>
					<Row className="justify-content-md-center">
						<Col md={12} className="text-center" style={{ color: "black" }}>
							<h1
								className="display-6 fw-bold"
								style={{ fontFamily: "'Kaisei Opti', sans-serif" }}
							>
								{`US$ ${Number(usdRaisedAmount).toFixed(
									2
								)} / ${projectData.fund_amount.toLocaleString()}`}
							</h1>
							<ProgressBar
								animated
								variant="dark"
								now={(usdRaisedAmount / Number(projectData.fund_amount)) * 100}
								label={`${(
									(usdRaisedAmount / Number(projectData.fund_amount)) *
									100
								).toFixed(2)}%`}
								className="mx-auto"
								style={{ width: "50%", height: "20px" }}
							/>
						</Col>
					</Row>

					<Row className="justify-content-md-center mt-5">
						<Col md={6} className="text-center mt-1" style={{ color: "black" }}>
							<div
								className="h3 fw-bold text-light fw-bold"
								style={{
									fontFamily: "'Kaisei Opti', sans-serif",
									whiteSpace: "pre-line",
								}}
							>
								Total Donation Rewards (240% APY)
							</div>
							<div
								className="display-6 fw-bold"
								style={{
									fontFamily: "'Kaisei Opti', sans-serif",
									whiteSpace: "pre-line",
								}}
							>
								{`US$ ${Number(projectData.current_reward).toFixed(2)}`}
							</div>
						</Col>
						<Col md={6} className="text-center mt-1" style={{ color: "black" }}>
							<div
								className="h3 fw-bold text-white fw-bold"
								style={{ fontFamily: "'Kaisei Opti', sans-serif" }}
							>
								Rare FuND Reward
							</div>
							<div
								className="display-6 fw-bold"
								style={{
									fontFamily: "'Kaisei Opti', sans-serif",
									whiteSpace: "pre-line",
								}}
							>
								US$ {Number(projectData.rewarded_amount).toLocaleString()}
							</div>
						</Col>
					</Row>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
