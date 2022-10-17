import "bootstrap/dist/css/bootstrap.css";
import "./descriptionStyle.css";
import Incentives from "../Incentives";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

export default function ProjectDescription(props) {
	let incentivesData = props.incentivesData;
	if (incentivesData) {
		console.log("incentivesData", incentivesData);
		incentivesData.sort(function (a, b) {
			var x = a.price;
			var y = b.price;
			return x < y ? -1 : x > y ? 1 : 0;
		});
	}
	return (
		<div
			className="project-description bg-white w-100"
			style={{
				padding: "5vw",
			}}
		>
			<Row>
				<Col md={incentivesData.length > 0 ? 8 : 12}>
					<div
						dangerouslySetInnerHTML={{ __html: props.description }}
						style={{
							maxWidth: "100vw",
						}}
					></div>
				</Col>
				{incentivesData.length > 0 && (
					<Col md={4}>
						<h1 className="text-center">Incentives</h1>
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
									projectLive={props.projectLive}
								/>
							))}
					</Col>
				)}
			</Row>
		</div>
	);
}
