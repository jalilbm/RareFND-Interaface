import CategoryGridCard from "../../components/CategoryGridCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CategoryCarousel from "../../components/CategoryCarousel";

export default function Category() {
	const [categoryData, setCategoryData] = useState({});
	const [categoryProjects, setCategoryProjects] = useState({});
	const location = useLocation();
	const [categoryName, setCategoryName] = useState(
		window.location.pathname
			.split("/")
			.at(-1)
			.replace(new RegExp("-", "g"), " ")
	);
	useEffect(() => {
		setCategoryName(
			window.location.pathname
				.split("/")
				.at(-1)
				.replace(new RegExp("-", "g"), " ")
		);
	}, [location.pathname]);
	useEffect(() => {
		axios
			.get("http://c217-139-28-218-172.ngrok.io/api/category/")
			.then((response) => {
				const data = response.data.categories;
				for (let i = 0; i < data.length; i++) {
					if (data[i].name.toLowerCase() === categoryName.toLowerCase()) {
						setCategoryData({
							title: data[i].name,
							image: "http://c217-139-28-218-172.ngrok.io" + data[i].image,
						});
						break;
					}
				}
			})
			.then(() => {
				axios
					.get(
						`http://c217-139-28-218-172.ngrok.io/api/project/category/${categoryName}/`
					)
					.then((response) => {
						setCategoryProjects(response.data.projects);
					});
			});
	}, [categoryName]);
	return (
		<div>
			<CategoryCarousel image={categoryData.image} title={categoryData.title} />
			<CategoryGridCard categoryProjects={categoryProjects} />
		</div>
	);
}
