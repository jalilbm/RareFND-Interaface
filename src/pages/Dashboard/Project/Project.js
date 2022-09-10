import SideBar from "../../../components/DashboardSideBare";
import "./project.scss";
import Basics from "./Basics";
import Profile from "./Profile";
import Funding from "./Funding";
import Rewards from "./Rewards";
import Story from "./Story";
import Payment from "./Payment";
import CreateProjectNavBar from "../../../components/CreateProjectNavBar";
import { useState, useEffect } from "react";

export default function DashboardProjects() {
	const [selectedTab, setSelectedTab] = useState("create-project-tab-1");
	const [selectedNavItem, setSelectedNavItem] = useState(
		"create-project-tab-1"
	);
	const [renderTab, setRenderTab] = useState(<Basics />);
	const [projectData, setProjectData] = useState({});

	const updateProjectData = (event, source) => {
		let { name, value } = event.target;
		setProjectData({
			...projectData,
			[source]: { ...projectData[source], [name]: value },
		});
		console.log(projectData);
	};

	const changeTab = (value) => {
		setSelectedTab(value);

		if (selectedNavItem !== value) {
			if (selectedNavItem) {
				document.getElementById(selectedNavItem).className = document
					.getElementById(selectedNavItem)
					.className.replace(/ selected/g, "");
			}
			setSelectedNavItem(value);
		}

		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (selectedNavItem)
			document.getElementById(selectedNavItem).className =
				document.getElementById(selectedNavItem).className + " selected";
	}, [selectedNavItem]);

	useEffect(() => {
		switch (selectedTab) {
			case "create-project-tab-1":
				setRenderTab(
					<Basics
						nextTabFunction={() => changeTab("create-project-tab-2")}
						projectData={projectData}
						updateProjectData={updateProjectData}
					/>
				);
				break;
			case "create-project-tab-2":
				setRenderTab(
					<Funding nextTabFunction={() => changeTab("create-project-tab-3")} />
				);
				break;
			case "create-project-tab-3":
				setRenderTab(
					<Rewards nextTabFunction={() => changeTab("create-project-tab-4")} />
				);
				break;
			case "create-project-tab-4":
				setRenderTab(
					<Story nextTabFunction={() => changeTab("create-project-tab-5")} />
				);
				break;
			case "create-project-tab-5":
				setRenderTab(
					<Profile nextTabFunction={() => changeTab("create-project-tab-6")} />
				);
				break;
			case "create-project-tab-6":
				setRenderTab(<Payment />);
				break;
			default:
				setRenderTab(<Basics />);
				break;
		}
	}, [selectedTab, projectData]);
	return (
		<div className="dashboard-projects">
			<SideBar />
			<div className="dashboard-projects-container">
				<CreateProjectNavBar changeTab={changeTab} selectedTab={selectedTab} />
				{renderTab}
			</div>
		</div>
	);
}
