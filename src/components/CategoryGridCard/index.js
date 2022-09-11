import CategoryProjectCard from "../../components/CategoryProjectCard";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";

export default function CategoryGridCard(props) {
	return (
		<div>
			<div>
				<Row style={{ padding: "3vw", width: "100%", marginTop: "2rem" }}>
					<h1 className="text-center" style={{ fontWeight: "bolder" }}>
						{props.title}
					</h1>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<p className="descript text-center">
							Discover the artists and organizations using RareFnd to realize
							ambitious projects in visual art and performance.
						</p>
					</div>
				</Row>
			</div>
			<div>
				<Row
					style={{
						padding: "3vw 8vw 3vw 8vw",
						width: "100%",

						height: "700px",
					}}
				>
					<Col md={6}>
						<h3 className="categorygrid">Feature Project</h3>
					</Col>
					<Col md={6} style={{ position: "relative" }}>
						<h3 className="categorygrid">Recommended for you</h3>
						<div className="vl"></div>
					</Col>
				</Row>
			</div>
			<hr />
			<div>
				<Row
					style={{
						padding: "3vw 8vw 3vw 8vw",
						width: "100%",
						position: "relative",
					}}
				>
					<Col md={6}>
						<h3 className="categorygrid">Taking Off</h3>
						<p className="descript">
							View the art campaigns about to start here.
						</p>
					</Col>
				</Row>
			</div>
			<hr />
			<div>
				<Row
					style={{
						padding: "3vw 8vw 3vw 8vw",
						width: "100%",
						position: "relative",
						height: "400px",
					}}
				>
					<Col md={6}>
						<h3 className="categorygrid">Home Stretch</h3>
						<p className="descript">
							Crowdfunding campaigns nearing their crowdfunding target.
						</p>
					</Col>
				</Row>
			</div>
			<hr />
			<div>
				<Row
					style={{
						padding: "3vw 8vw 0vw 8vw",
						width: "100%",
						position: "relative",
					}}
				>
					<Col md={6}>
						<h3 className="categorygrid">All</h3>
						<p className="descript">Explore all art related campaigns.</p>
					</Col>
				</Row>
			</div>
			<div
				className="CategoryGridCard mb-5"
				style={{ minHeight: window.innerHeight }}
			>
				<Row
					xs={1}
					s={2}
					md={2}
					lg={4}
					className="g-4"
					style={{
						marginRight: "40px",
						padding: "1vw 8vw 0vw 8vw",
						width: "100%",
					}}
				>
					{Array.from(props.categoryProjects).map((_, idx) => (
						<Col>
							<CategoryProjectCard
								head={_.head}
								title={_.title}
								image={"https://rarefndapi.herokuapp.com/" + _.thumbnail}
								project_id={_.id}
							/>
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
}
