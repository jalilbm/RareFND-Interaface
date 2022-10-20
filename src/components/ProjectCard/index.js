import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Web3ContributeButton from "../Web3ContributeButton";
import "./index.css";
import Button from "react-bootstrap/Button";
import useAxios from "../../utils/useAxios/useAxios";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import comingSoon from "../../assets/coming-soon-2.png";

export default function ProjectCard(props) {
	let api = useAxios();
	let { user } = useContext(AuthContext);
	const [subscribed, setSubscribed] = useState(false);
	const [subscribeButtonText, setSubscribeButtonText] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (subscribed) {
			setSubscribeButtonText("Subscribed");
		} else {
			setSubscribeButtonText("Remind me when live");
		}
	}, [subscribed]);

	useEffect(() => {
		if (props.projectId && user && props.numberOfSubscribers) {
			console.log(props.numberOfSubscribers);
			api
				.get(`/api/project/checked_subscribed/${props.projectId}/`)
				.then((response) => {
					if (response.status === 200) {
						setSubscribed(response.data.subscribed);
					} else {
						console.log(response);
						window.alert("Something went wrong please refresh");
					}
				});
		}
	}, [props.projectId]);

	const subscribeToProject = () => {
		if (user) {
			api
				.put(`/api/project/subscribe/`, { projectId: props.projectId })
				.then((response) => {
					if (response.status === 200) {
						window.alert("Subscribed successfully");
						setSubscribed(true);
						document.getElementById("subscribe-btn").textContent = "Subscribed";
					} else {
						window.alert("Couldn't subscribe, please try again in few seconds");
					}
				});
		} else {
			navigate("/login");
		}
	};

	return (
		<div>
			<Card className="border-0" style={{ backgroundColor: "transparent" }}>
				<Row className="w-100 vertical-divider">
					<Col md={6}>
						<Card.Img
							variant="left"
							src={props.image}
							style={{
								width: "100%",
								objectFit: "cover",
								height:
									window.innerHeight < window.innerWidth ? "50vh" : "50vw",
							}}
						/>
					</Col>
					<Col md={6}>
						<Card.Body className="text-black text-center d-flex flex-column h-100">
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									backgroundColor: "white",
									height: "100%",
									margin: "0 200 0 200",
									padding: "5%",
									position: "relative",
								}}
							>
								{!props.projectLive && (
									<div
										style={{ position: "absolute", top: "-5px", right: "-5px" }}
									>
										<img src={comingSoon} style={{ width: "7rem" }} />
									</div>
								)}
								<h1>
									<Card.Title
										style={{
											fontSize: "xx-large",
										}}
									>
										{props.title}
									</Card.Title>
								</h1>
								<p>
									<Card.Text style={{ fontSize: "larger" }}>
										{props.text}
									</Card.Text>
								</p>
								<div style={{ marginTop: "auto" }}>
									{props.projectLive ? (
										<Web3ContributeButton
											staking_address={props.staking_address}
											staking_abi={props.staking_abi}
											projectLive={props.projectLive}
										/>
									) : (
										<div>
											<Button
												id="subscribe-btn"
												variant="warning"
												size="lg"
												style={{
													width: "100%",
													fontSize: "2vh",
													maxHeight: "100%",
												}}
												onClick={subscribeToProject}
												disabled={subscribed}
											>
												{subscribeButtonText}
											</Button>
											<p style={{ marginTop: "10px" }}>
												{props.numberOfSubscribers &&
													`${props.numberOfSubscribers} Subscribers`}
											</p>
										</div>
									)}
								</div>
							</div>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
