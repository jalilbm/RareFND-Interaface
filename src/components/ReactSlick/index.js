import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "./index.css";

export default function ReactSlick(props) {
	const Mobilenavdata = [
		"Comics & Illustration",
		"Film",
		"Food & Craft",
		"Games",
		"Music",
		"Publishing",
	];

	const categories = props.categoriesData;

	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 8,
		slidesToScroll: 3,
		initialSlide: 0,
		dots: false,
		responsive: [
			{
				breakpoint: 1280,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 3,
					infinite: false,
					dots: false,
				},
			},
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 3,
					infinite: false,
					dots: false,
				},
			},
			{
				breakpoint: 820,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
					infinite: false,
					dots: false,
				},
			},
			{
				breakpoint: 690,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					initialSlide: 2,
					dots: false,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					dots: false,
				},
			},
			{
				breakpoint: 400,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					dots: false,
				},
			},
		],
	};

	return (
		<div className="navSlider" style={{ marginBottom: "15px" }}>
			<Slider {...settings}>
				{Object.keys(categories).map((item, index) => {
					if (categories[item].name !== "All")
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
				{Mobilenavdata.map((item, index) => {
					return (
						<Link to={"/coming-soon"} className="category-link">
							<div
								key={index}
								className="hover-underline-animation"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: "200px",
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
									{" "}
									{item}
								</h3>
							</div>
						</Link>
					);
				})}
			</Slider>
		</div>
	);
}

// import React from "react";
// import Slider from "react-slick";
// import "./index.css";

// export default function ReactSlick(props) {
// 	const categories = props.categoriesData;

// 	var settings = {
// 		dots: true,
// 		infinite: false,
// 		speed: 500,
// 		slidesToShow: 8,
// 		slidesToScroll: 3,
// 		initialSlide: 0,
// 		responsive: [
// 			{
// 				breakpoint: 1024,
// 				settings: {
// 					slidesToShow: 6,
// 					slidesToScroll: 3,
// 					infinite: true,
// 					dots: false,
// 				},
// 			},
// 			{
// 				breakpoint: 600,
// 				settings: {
// 					slidesToShow: 3,
// 					slidesToScroll: 3,
// 					initialSlide: 2,
// 				},
// 			},
// 			{
// 				breakpoint: 480,
// 				settings: {
// 					slidesToShow: 3,
// 					slidesToScroll: 2,
// 				},
// 			},
// 		],
// 	};

// 	return (
// 		<div className="navSlider">
// 			<Slider {...settings}>
// 				{Object.keys(categories).map((item, index) => {
// 					return (
// 						<div key={index} className="categories-menu-item">
// 							<h3
// 								style={{
// 									color: "white",
// 									fontSize: "0.7rem",
// 									width: "max-content",
// 								}}
// 							>
// 								{" "}
// 								{categories[item].name}
// 							</h3>
// 						</div>
// 					);
// 				})}
// 			</Slider>
// 		</div>
// 	);
// }
