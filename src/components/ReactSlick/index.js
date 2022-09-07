import React from "react";
import Slider from "react-slick";

import LeftArrow from "../../assets/left-arrow.svg";
import RightArrow from "../../assets/right-arrow.svg";
import "./index.css";

export default function ReactSlick({}) {
	const Mobilenavdata = [
		"Arts",
		"Design & Tech",
		"Comics & Illustration",
		"Film",
		"Food & Craft",
		"Games",
		"Music",
		"Publishing",
	];

	const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
		<img src={LeftArrow} alt="prevArrow" {...props} />
	);

	const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
		<img src={RightArrow} alt="nextArrow" {...props} />
	);
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 8,
		slidesToScroll: 3,
		initialSlide: 0,
		// prevArrow: <SlickArrowLeft />,
		// nextArrow: <SlickArrowRight />,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 3,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				},
			},
		],
	};

	return (
		<div className="navSlider">
			<Slider {...settings}>
				{Mobilenavdata.map((item, index) => {
					return (
						<div key={index}>
							<h3
								style={{
									color: "white",
									fontSize: "0.7rem",
									width: "max-content",
								}}
							>
								{" "}
								{item}
							</h3>
						</div>
					);
				})}
			</Slider>
		</div>
	);
}
