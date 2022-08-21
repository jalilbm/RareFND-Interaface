import "bootstrap/dist/css/bootstrap.css";
import "./descriptionStyle.css";
import Incentives from "../Incentives";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function ProjectDescription(props) {
	let incentivesData = props.incentivesData;
	if (incentivesData) {
		incentivesData.sort(function (a, b) {
			var x = a.price;
			var y = b.price;
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}
	return (
		<div className="project-description bg-white p-5 w-100">
			<Row>
				<Col md={8}>
					<div
						dangerouslySetInnerHTML={{ __html: props.description }}
						style={{
							maxWidth: "100vw",
						}}
					></div>
				</Col>
				<Col md={4}>
					{incentivesData &&
						Array.from(incentivesData).map((_, idx) => (
							<Incentives
								title={_.title}
								description={_.description}
								included_incentives={_.included_incentives}
								estimated_delivery={_.estimated_delivery}
								available_items={_.available_items}
								price={_.price}
								reserved={_.reserved}
								project={_.project}
							/>
						))}
				</Col>
			</Row>
		</div>
	);
}
