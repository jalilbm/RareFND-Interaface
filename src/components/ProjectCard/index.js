import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Web3ContributeButton from "../Web3ContributeButton";
import "./index.css";

export default function ProjectCard(props) {
	console.log(props.image);
	return (
		<Card
			className={
				"border-0 " +
				(props.backgroudColor ? "bg-" + props.backgroudColor : "bg-dark")
			}
		>
			<Row className="w-100 vertical-divider">
				<Col md={6}>
					<Card.Img
						variant="left"
						src={"https://rarefndapi.herokuapp.com" + props.image}
						style={{
							width: "100%",
							height: props.image_height,
							objectFit: "cover",
						}}
					/>
				</Col>
				<Col md={6}>
					<Card.Body className="text-white text-center d-flex flex-column h-100">
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
							<Card.Text style={{ fontSize: "larger", fontFamily: "Calibri" }}>
								{props.text}
							</Card.Text>
						</p>
						<Web3ContributeButton
							staking_address={props.staking_address}
							staking_abi={props.staking_abi}
							projectLive={props.projectLive}
						/>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	);
}
