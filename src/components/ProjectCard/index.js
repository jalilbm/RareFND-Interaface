import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Web3ContributeButton from "../Web3ContributeButton";
import "./index.css";

export default function ProjectCard(props) {
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
						src={"http://c503-94-202-120-29.ngrok.io" + props.image}
						style={{
							width: "100%",
							height: props.image_height,
						}}
					/>
				</Col>
				<Col md={6}>
					<Card.Body className="text-white text-center d-flex flex-column h-100">
						<Card.Title className="display-5">{props.title}</Card.Title>
						<Card.Text style={{ fontSize: "30px" }}>{props.text}</Card.Text>
						<Web3ContributeButton wallet_address={props.wallet_address} />
					</Card.Body>
				</Col>
			</Row>
		</Card>
	);
}
