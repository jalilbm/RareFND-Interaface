import CategoryVerticalCard from "./CategoryVerticalCard";
import CategoryHorizontalCard from "./CategoryHorizontalCard";
import Slider from "react-slick";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";

export default function CategoryGridCard(props) {
	const settings = {
		dots: false,
		speed: 100,
		slidesToShow:
			props.categoryProjects.length < 5 ? props.categoryProjects.length : 5,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow:
						props.categoryProjects.length < 3
							? props.categoryProjects.length
							: 3,
					slidesToScroll: 1,
					infinite: false,
					dots: false,
				},
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow:
						props.categoryProjects.length < 2
							? props.categoryProjects.length
							: 2,
					slidesToScroll: 1,
					initialSlide: 1,
					dots: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
				},
			},
		],
	};
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
						padding: "2vw 0vw 0vw 6vw",
						width: "100%",
						height: "100%",
					}}
				>
					<Col md={6}>
						<h3 className="categorygrid">Feature Project</h3>
						{props.categoryProjects.length ? (
							<CategoryVerticalCard
								owner_username={props.categoryProjects[0].owner_username}
								title={props.categoryProjects[0].title}
								description={props.categoryProjects[0].head}
								src={props.categoryProjects[0].thumbnail}
								project_owner="djalil"
								project_id={props.categoryProjects[0].id}
								project_live={props.categoryProjects[0].live}
								project_raised_amount={
									props.categoryProjects[0].raised_amount +
									props.categoryProjects[0].current_reward
								}
								project_goal_amount={props.categoryProjects[0].fund_amount}
							/>
						) : (
							<div style={{ height: "700px" }}></div>
						)}
					</Col>
					<Col md={4} style={{ position: "relative" }}>
						<hr id="hor_separator" />
						<h3 className="categorygrid">Recommended for you</h3>
						<div className="vl"></div>
						{props.categoryProjects.length > 0 &&
							Array.from(props.categoryProjects).map((_, idx) => (
								<div>
									<CategoryHorizontalCard
										owner_username={_.owner_username}
										title={_.title}
										project_owner="djalil"
										src={_.thumbnail}
										project_id={_.id}
										project_live={_.live}
										project_raised_amount={_.raised_amount + _.current_reward}
										project_goal_amount={_.fund_amount}
									/>
								</div>
							))}
					</Col>
				</Row>
			</div>
			<br />
			<br />
			<hr />
			<div style={{ margin: "0px", padding: "0px" }}>
				<div>
					<Row
						style={{
							padding: "2vw 0vw 0vw 6vw",
							width: "99%",
							height: "100%",
						}}
					>
						<h3 className="categorygrid">Taking Off</h3>
						<Slider {...settings}>
							{props.categoryProjects.length > 0 ? (
								Array.from(props.categoryProjects).map((_, idx) => (
									<div>
										<CategoryVerticalCard
											owner_username={_.owner_username}
											src={_.thumbnail}
											title={_.title}
											description={_.head}
											project_owner="ikram"
											project_id={_.id}
											imageStyle={{ width: "320px" }}
											project_live={_.live}
											project_raised_amount={_.raised_amount + _.current_reward}
											project_goal_amount={_.fund_amount}
										/>
									</div>
								))
							) : (
								<div></div>
							)}
						</Slider>
					</Row>
				</div>
				<hr />
				<div>
					<Row
						style={{
							padding: "2vw 0vw 0vw 6vw",
							width: "99%",
							height: "100%",
						}}
					>
						<h3 className="categorygrid">Home Stretch</h3>
						<Slider {...settings}>
							{props.categoryProjects.length > 0 ? (
								Array.from(props.categoryProjects).map((_, idx) => (
									<div>
										<CategoryVerticalCard
											owner_username={_.owner_username}
											src={_.thumbnail}
											title={_.title}
											description={_.head}
											project_owner="ikram"
											project_id={_.id}
											imageStyle={{ width: "320px" }}
											project_live={_.live}
											project_raised_amount={_.raised_amount + _.current_reward}
											project_goal_amount={_.fund_amount}
										/>
									</div>
								))
							) : (
								<div></div>
							)}
						</Slider>
					</Row>
				</div>
				<hr />
				<div>
					<Row
						style={{
							padding: "2vw 0vw 0vw 6vw",
							width: "99%",
							height: "100%",
						}}
					>
						<h3 className="categorygrid">All</h3>
						<Slider {...settings}>
							{props.categoryProjects.length > 0 ? (
								Array.from(props.categoryProjects).map((_, idx) => (
									<div>
										<CategoryVerticalCard
											owner_username={_.owner_username}
											src={_.thumbnail}
											title={_.title}
											description={_.head}
											project_owner="ikram"
											project_id={_.id}
											imageStyle={{ width: "320px" }}
											project_live={_.live}
											project_raised_amount={_.raised_amount + _.current_reward}
											project_goal_amount={_.fund_amount}
										/>
									</div>
								))
							) : (
								<div></div>
							)}
						</Slider>
					</Row>
				</div>
				<br />
				<br />
				<br />
			</div>
		</div>
	);
}
