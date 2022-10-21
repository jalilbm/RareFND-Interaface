import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./index.css";

export default function ReactSlick(props) {
	const categories = props.categoriesData;

	var settings = {
		speed: 500,
		slidesToShow: 9,
		slidesToScroll: 1,
		initialSlide: 0,
		dots: false,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 6,
				},
			},
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
				},
			},
			{
				breakpoint: 820,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				},
			},
			{
				breakpoint: 690,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				},
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 1,
				},
			},
		],
	};

	return (
		<div className="navSlider" style={{ marginBottom: "15px" }}>
			<Slider {...settings}>
				{Object.keys(categories).map((item, index) => {
					if (
						categories[item].name !== "All" &&
						categories[item].name !== "Test"
					)
						return (
							<Link
								to={
									"/category/" +
									categories[item].name.replace(new RegExp(" ", "g"), "-")
								}
								className="category-link"
							>
								<div
									key={index}
									className="hover-underline-animation"
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<h3
										className="mx-auto"
										style={{
											color: "dark",
											fontSize: "1rem",
											width: "max-content",
										}}
									>
										{categories[item].name}
									</h3>
								</div>
							</Link>
						);
				})}
			</Slider>
		</div>
	);
}
