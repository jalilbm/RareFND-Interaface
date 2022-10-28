import "bootstrap/dist/css/bootstrap.css";
import ProjectCurrentContributions from "../../components/ProjectCurrentContributions";
import ProjectDescription from "../../components/ProjectDescription";
import LoadingSpinner from "../../components/LoadingSpinner";
import axios from "axios";
import { useState, useEffect } from "react";
import ProjectCard from "../../components/ProjectCard";

export default function Project(props) {
	const [projectData, setProjectData] = useState({});
	const [incentivesData, setIncentivesData] = useState(null);
	const [projectSuccessfullyEnded, setProjectSuccessfullyEnded] =
		useState(null);

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
			{!projectData.title ? (
				<LoadingSpinner />
			) : (
				<div>
					<ProjectCard
						image={projectData.thumbnail}
						title={projectData.title}
						projectId={projectData.id}
						text={projectData.head}
						projectLive={projectData.live}
						number_of_donators={projectData.number_of_donators}
						numberOfSubscribers={projectData.number_of_subscribed_users}
						staking_address={projectData.staking_address}
						projectSuccessfullyEnded={projectSuccessfullyEnded}
					/>
					{(projectData.live || projectData.raised_amount > 0) && (
						<ProjectCurrentContributions
							setProjectSuccessfullyEnded={setProjectSuccessfullyEnded}
						/>
					)}
					<ProjectDescription
						description={projectData.description}
						ownerId={projectData.owner}
						ownerUsername={projectData.owner_username}
						projectId={projectData.id}
						incentivesData={incentivesData}
						projectLive={projectData.live}
					/>
				</div>
			)}
		</div>
	);
}
