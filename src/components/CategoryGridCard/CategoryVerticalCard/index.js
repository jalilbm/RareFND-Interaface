import { Link } from "react-router-dom";
import "./index.css";

export default function CategoryVerticalCard(props) {
	const s = { ...props.imageStyle };
	return (
		<div className="w-100">
			<div>
				<img
					id="vertical_card_image"
					className="d-block "
					style={
						props.imageStyle
							? { ...props.imageStyle, padding: " 1vw 6vw 2vw 0vw" }
							: { width: "100%", padding: "1vw 6vw 2vw 0vw" }
					}
					src={props.src}
				/>
			</div>
			<div style={{ width: "90%" }}>
				<h3>
					<Link to={`/project/${props.project_id}`} className="subnav_link">
						{props.title}
					</Link>
				</h3>
				<p style={{ width: "100%" }}>{props.description}</p>
				{/* <p style={{ width: "100%" }}>By: {props.project_owner}</p> */}
			</div>
		</div>
	);
}
