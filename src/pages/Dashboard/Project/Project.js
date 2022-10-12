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
	const [projectData, setProjectData] = useState(
		JSON.parse(localStorage.getItem("createProjectData")) || {
			basics: {},
			funding: {},
			story: {},
			payment: {},
			rewards: {},
		}
	);
	const [formErrors, setFormErrors] = useState({});

	const updateProjectData = (event, source) => {
		let { name, value } = event.target;
		if (name === "projectTitle") {
			if (value === "") {
				setFormErrors({
					...formErrors,
					projectTitle: "Project Title is required!",
				});
			} else {
				let tmp = { ...formErrors };
				delete tmp["projectTitle"];
				setFormErrors(tmp);
			}
		} else if (name === "projectHead") {
			if (value === "") {
				setFormErrors({
					...formErrors,
					projectHead: "Project Head is required!",
				});
			} else {
				let tmp = { ...formErrors };
				delete tmp["projectHead"];
				setFormErrors(tmp);
			}
		} else if (name === "projectAddress") {
			if (value === "") {
				setFormErrors({
					...formErrors,
					projectAddress: "Project Address is required!",
				});
			} else {
				let tmp = { ...formErrors };
				delete tmp["projectAddress"];
				setFormErrors(tmp);
			}
		} else if (name === "projectFundsAmount") {
			if (value === "") {
				setFormErrors({
					...formErrors,
					projectFundsAmount: "Project Funds Amount is required!",
				});
			} else {
				let tmp = { ...formErrors };
				delete tmp["projectFundsAmount"];
				setFormErrors(tmp);
			}
		}
		setProjectData({
			...projectData,
			[source]: { ...projectData[source], [name]: value },
		});

		console.log(projectData);
	};

	useEffect(() => {
		localStorage.setItem("createProjectData", JSON.stringify(projectData));
	}, [projectData]);

	const changeTab = (value) => {
		setSelectedTab(value, formErrors);

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
						formErrors={formErrors}
						setFormErrors={setFormErrors}
					/>
				);
				break;
			case "create-project-tab-2":
				setRenderTab(
					<Funding
						nextTabFunction={() => changeTab("create-project-tab-3")}
						previousTabFunction={() => changeTab("create-project-tab-1")}
						projectData={projectData}
						updateProjectData={updateProjectData}
						formErrors={formErrors}
						setFormErrors={setFormErrors}
					/>
				);
				break;
			case "create-project-tab-3":
				setRenderTab(
					<Rewards
						nextTabFunction={() => changeTab("create-project-tab-4")}
						previousTabFunction={() => changeTab("create-project-tab-2")}
						projectData={projectData}
						updateProjectData={updateProjectData}
						setProjectData={setProjectData}
						formErrors={formErrors}
						setFormErrors={setFormErrors}
					/>
				);
				break;
			case "create-project-tab-4":
				setRenderTab(
					<Story
						nextTabFunction={() => changeTab("create-project-tab-5")}
						previousTabFunction={() => changeTab("create-project-tab-3")}
						projectData={projectData}
						updateProjectData={updateProjectData}
						formErrors={formErrors}
						setFormErrors={setFormErrors}
					/>
				);
				break;
			case "create-project-tab-5":
				setRenderTab(
					<Profile
						nextTabFunction={() => changeTab("create-project-tab-6")}
						previousTabFunction={() => changeTab("create-project-tab-4")}
						formErrors={formErrors}
						setFormErrors={setFormErrors}
					/>
				);
				break;
			case "create-project-tab-6":
				setRenderTab(
					<Payment
						projectData={projectData}
						updateProjectData={updateProjectData}
						setProjectData={setProjectData}
						previousTabFunction={() => changeTab("create-project-tab-5")}
						formErrors={formErrors}
						setFormErrors={setFormErrors}
					/>
				);
				break;
			default:
				setRenderTab(
					<Basics
						projectData={projectData}
						updateProjectData={updateProjectData}
						nextTabFunction={() => changeTab("create-project-tab-2")}
						formErrors={formErrors}
						setFormErrors={setFormErrors}
					/>
				);
				break;
		}
	}, [selectedTab, projectData]);
	return (
		<div className="dashboard-projects w-100">
			<SideBar />
			<div className="dashboard-projects-container">
				<CreateProjectNavBar changeTab={changeTab} selectedTab={selectedTab} />
				{renderTab}
			</div>
		</div>
	);
}
