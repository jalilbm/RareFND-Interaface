import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useParams } from "react-router";

export default function ProjectCurrentContributions() {
	const { id } = useParams();
	const [projectData, setprojectData] = useState({});
	const [usdRaisedAmount, setUsdRaisedAmount] = useState(0);
	useEffect(() => {
		let interval = setInterval(() => {
			axios
				.get(`https://rarefndapi.herokuapp.com/api/project/${id}/`)
				.then((response) => response.data)
				.then((data) => {
					setprojectData(data);
					setUsdRaisedAmount(Number(data.raised_amount) + data.rewarded_amount);
				});
		}, 1000 * 5);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="project-current-contributions bg-warning p-5">
			<Row className="justify-content-md-center">
				<Col md={12} className="text-center" style={{ color: "black" }}>
					<h1
						className="display-6 fw-bold"
						style={{ fontFamily: "'Kaisei Opti', sans-serif" }}
					>
						US$ {usdRaisedAmount.toLocaleString()} /{" "}
						{Number(projectData.fund_amount).toLocaleString()}
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
						className="display-6 fw-bold text-light fw-bold"
						style={{
							fontFamily: "'Kaisei Opti', sans-serif",
							whiteSpace: "pre-line",
						}}
					>
						240% APY
					</div>
					<div
						className="display-6 fw-bold"
						style={{
							fontFamily: "'Kaisei Opti', sans-serif",
							whiteSpace: "pre-line",
						}}
					>
						US$ {(usdRaisedAmount * 2.4).toLocaleString()}
					</div>
				</Col>

				<Col md={6} className="text-center mt-1" style={{ color: "black" }}>
					<div
						className="display-6 fw-bold text-white fw-bold"
						style={{ fontFamily: "'Kaisei Opti', sans-serif" }}
					>
						Reward
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
	);
}
