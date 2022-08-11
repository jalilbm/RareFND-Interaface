import "bootstrap/dist/css/bootstrap.css";
import ProjectCurrentContributions from "../../components/ProjectCurrentContributions";
import ProjectDescription from "../../components/ProjectDescription";
import axios from "axios";
import { useState, useEffect } from "react";
import ProjectCard from "../../components/ProjectCard";
import { useParams } from "react-router";

export default function Project(props) {
	const { id } = useParams();
	const [height, setHeight] = useState({});
	const [projectData, setProjectData] = useState({});
	useEffect(() => {
		setHeight(window.innerHeight);
		window.addEventListener("resize", () => setHeight(window.innerHeight));
		return () =>
			window.removeEventListener("resize", () => setHeight(window.innerHeight));
	}, []);
	useEffect(() => {
		axios
			.get(`http://c503-94-202-120-29.ngrok.io/api/project/${id}/`)
			.then((response) => {
				setProjectData(response.data);
				console.log(response.data);
			})
			.then((data) => {
				// setprojectData(data)
				console.log(projectData);
			});
	}, []);
	return (
		<div className="post">
			<ProjectCard
				image={projectData.thumbnail}
				title={projectData.title}
				text={projectData.head}
				backgroudColor="black"
				image_height={height / 1.8}
				wallet_address={projectData.wallet_address}
			/>
			<ProjectCurrentContributions />
			<ProjectDescription description={projectData.description} />
		</div>
	);
}
