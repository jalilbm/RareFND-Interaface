import CategoryGridCard from "../../components/CategoryGridCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
			.get("http://127.0.0.1:8000/api/category/")
			.then((response) => {
				const data = response.data.categories;
				for (let i = 0; i < data.length; i++) {
					if (data[i].name.toLowerCase() === categoryName.toLowerCase()) {
						setCategoryData({
							title: data[i].name,
							image: "http://127.0.0.1:8000" + data[i].image,
						});
						break;
					}
				}
			})
			.then(() => {
				axios
					.get(`http://127.0.0.1:8000/api/project/category/${categoryName}/`)
					.then((response) => {
						setCategoryProjects(response.data.projects);
					});
			});
	}, [categoryName]);
	return (
		<div>
			<CategoryGridCard
				image={categoryData.image}
				title={categoryData.title}
				categoryProjects={categoryProjects}
			/>
		</div>
	);
}
