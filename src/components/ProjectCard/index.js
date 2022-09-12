import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Web3ContributeButton from "../Web3ContributeButton";
import "./index.css";

export default function ProjectCard(props) {
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
								}}
							>
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
									<Web3ContributeButton
										staking_address={props.staking_address}
										staking_abi={props.staking_abi}
										projectLive={props.projectLive}
									/>
								</div>
							</div>
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
