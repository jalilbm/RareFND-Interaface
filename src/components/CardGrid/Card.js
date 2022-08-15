import "bootstrap/dist/css/bootstrap.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import "./index.css";
import { Link } from "react-router-dom";

function MainCard(props) {
	return (
		<Container>
			<Card
				className={
					"border-0 " +
					(props.backgroudColor ? "bg-" + props.backgroudColor : "bg-dark")
				}
				style={{ backgroudColor: props.backgroudColor }}
			>
				<Row>
					{props.image ? (
						<Col
							md={props.horizontal ? 6 : 12}
							className={props.imageLeft ? "order-1" : "order-0"}
						>
							<div
								style={
									props.multi_cards ? { width: "100px", margin: "auto" } : {}
								}
							>
								<a href={props.buttonHref}>
									<Card.Img
										variant="left"
										src={props.image}
										style={
											props.multi_cards
												? {
														objectFit: "cover",
														width: "100px",
														margin: "auto",
												  }
												: {
														objectFit: "cover",
														width: "100%",
														height: props.image_height,
												  }
										}
									/>
								</a>
							</div>
						</Col>
					) : null}
					<Col md={props.image && !props.multi_cards ? 6 : 12}>
						<Card.Body className="text-light">
							<Card.Title
								className={
									(props.project_title ? "display-5 " : "display-6 ") +
									"fw-bold text-center mb-5"
								}
							>
								{props.title}
							</Card.Title>
							<Card.Text
								className={
									(props.multi_cards
										? "p "
										: props.project_header
										? "h4 "
										: "h5 ") +
									(!props.image || props.center_card_text
										? "mx-auto mb-4 text-center"
										: "")
								}
								style={props.textStyle}
							>
								{props.text}
							</Card.Text>
							{props.buttonText ? (
								<Row>
									<Col className={"mt-2 " + (props.image ? "" : "text-center")}>
										<Link to={props.buttonHref}>
											<Button variant="warning" size="lg">
												{props.buttonText}
											</Button>
										</Link>
									</Col>
								</Row>
							) : null}
						</Card.Body>
					</Col>
				</Row>
			</Card>
		</Container>
	);
}

export default MainCard;
