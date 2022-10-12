import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";

export default function CategoryHorizontalCard(props) {
	return (
		<div>
			<Row
				style={{
					width: "100%",
					height: "100%",
					padding: "1vw 0vw 0vw 0vw",
				}}
			>
				<Col xs={6} style={{ height: "100%" }}>
					<div>
						<img
							className="horizontal_card_image"
							src={props.src}
							style={{ objectFit: "cover" }}
						/>
					</div>
				</Col>
				<Col xs={6}>
					<div>
						<h5>
							<Link to={`/project/${props.project_id}`} className="subnav_link">
								{props.title}
							</Link>
						</h5>
						{/* <p>By: {props.project_owner}</p> */}
					</div>
				</Col>
			</Row>
			<hr className="hor_underline" />
		</div>
	);
}
