import CategoryProjectCard from "../../components/CategoryProjectCard";
import CategoryCarousel from "../CategoryCarousel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function CategoryGridCard(props) {
	return (
		<div
			className="CategoryGridCard mb-5"
			style={{ minHeight: window.innerHeight }}
		>
			<CategoryCarousel image={props.image} title={props.title} />
			<Row
				xs={1}
				s={2}
				md={2}
				lg={4}
				className="g-4"
				style={{ marginTop: "50px", marginLeft: "40px", marginRight: "40px" }}
			>
				{Array.from(props.categoryProjects).map((_, idx) => (
					<Col>
						<CategoryProjectCard
							head={_.head}
							title={_.title}
							image={"http://rarefndapi.herokuapp.com" + _.thumbnail}
							project_id={_.id}
						/>
					</Col>
				))}
			</Row>
		</div>
	);
}
