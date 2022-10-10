import "bootstrap/dist/css/bootstrap.css";
import ProjectCurrentContributions from "../../components/ProjectCurrentContributions";
import ProjectDescription from "../../components/ProjectDescription";
import axios from "axios";
import { useState, useEffect } from "react";
import ProjectCard from "../../components/ProjectCard";

export default function Project(props) {
	const [projectData, setProjectData] = useState({});
	const [incentivesData, setIncentivesData] = useState(null);

	const projectId = window.location.href.split("/").at(-1);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/incentives/${projectId}/`)
			.then((response) => {
				if (response.status === 200)
					setIncentivesData(response.data.incentives);
			});
	}, []);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/project/${projectId}/`)
			.then((response) => {
				setProjectData(response.data);
			});
	}, []);
	return (
		<div className="post">
			<ProjectCard
				image={projectData.thumbnail}
				title={projectData.title}
				text={projectData.head}
				projectLive={projectData.live}
				staking_address={projectData.staking_address}
			/>
			<ProjectCurrentContributions />
			<ProjectDescription
				description={projectData.description}
				projectId={projectData.id}
				incentivesData={incentivesData}
				projectLive={projectData.live}
			/>
		</div>
	);
}
