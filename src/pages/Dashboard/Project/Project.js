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
	const [projectData, setProjectData] = useState(
		localStorage.getItem("createProjectData")
			? JSON.parse(localStorage.getItem("createProjectData"))
			: {
					basics: {
						projectTitle: "",
						projectHead: "",
						projectCategory: "",
						projectSubcategory: "",
						projectType: "",
						projectAddress: "",
						projectCountry: "",
						projectImageFile: null,
						projectLaunchDate: null,
						projectDeadlineDate: null,
					},
					funding: { projectFundsAmount: "", projectBudgetFile: null },
					rewards: {},
					story: { projectStory: "" },
					payment: {
						companyName: "",
						natureOfBusiness: "",
						companyAddress: "",
						companyCity: "",
						companyZipCode: "",
						companyCountry: "",
						projectIncorporationDate: "",
						companyRegistrationNumber: "",
						companyEstimatedAnnualTurnover: "",
						projectTaxCountry: "",
						taxIdNumber: "",
						whitePaperUrl: "",
						tokenomicsUrl: "",
						certificateOfIncumbency: null,
						companyStructureChart: null,
					},
			  }
	);
	const [formErrors, setFormErrors] = useState({});
	const [renderTab, setRenderTab] = useState(null);

	const addInputError = (input, errorMessage) => {
		setFormErrors({
			...formErrors,
			[input]: errorMessage,
		});
	};

	const removeInputError = (input) => {
		let tmp = { ...formErrors };
		delete tmp[input];
		setFormErrors(tmp);
	};

	const handleEmptyInputError = (value, input, errorMessage) => {
		if (!value || value === "" || value === null) {
			addInputError(input, errorMessage);
		} else {
			removeInputError(input);
		}
	};

	const handleNonSelectedDropMenu = (
		value,
		defaultDropMenuText,
		input,
		errorMessage
	) => {
		if (value === defaultDropMenuText) {
			addInputError(input, errorMessage);
		} else {
			removeInputError(input);
		}
	};

	const handleInputErrors = (name, value) => {
		switch (name) {
			case "projectTitle":
				handleEmptyInputError(
					value,
					"projectTitle",
					"Project Title is required!"
				);
				break;
			case "projectCategory":
				handleNonSelectedDropMenu(
					value,
					"Choose Category",
					"projectCategory",
					"Please select a category!"
				);
				break;
			case "projectType":
				handleNonSelectedDropMenu(
					value,
					"Choose Project Type",
					"projectType",
					"Please select a project type!"
				);
				break;
			case "projectCountry":
				handleNonSelectedDropMenu(
					value,
					"Choose a country",
					"projectCountry",
					"Please select a project country!"
				);
				break;
			case "projectImageFile":
				handleEmptyInputError(
					value,
					"projectImageFile",
					"Project Image is required!"
				);
				break;
			case "projectHead":
				handleEmptyInputError(
					value,
					"projectHead",
					"Project Head is required!"
				);
				break;
			case "projectAddress":
				handleEmptyInputError(
					value,
					"projectAddress",
					"Project Address is required!"
				);
				break;
			case "projectLaunchDate":
				handleEmptyInputError(
					value,
					"projectLaunchDate",
					"Project launch date is required!"
				);
				break;
			case "projectDeadlineDate":
				handleEmptyInputError(
					value,
					"projectDeadlineDate",
					"Project deadline date is required!"
				);
				break;
			case "projectFundsAmount":
				handleEmptyInputError(
					value,
					"projectFundsAmount",
					"Project Funding Amount is required!"
				);
				break;
		}
	};

	const updateProjectData = (event, source) => {
		let { name, value } = event.target;
		console.log(name, value);
		handleInputErrors(name, value);
		setProjectData({
			...projectData,
			[source]: { ...projectData[source], [name]: value },
		});
	};

	useEffect(() => {
		handleInputErrors("projectTitle", "");
		// handleInputErrors("projectCategory", "Choose Category");
		// handleInputErrors("projectType", "Choose Project Type");
		// handleInputErrors("projectCountry", "Choose a country");
		// handleInputErrors("projectImageFile", null);
		// handleInputErrors("projectDeadlineDate", null);
	}, []);

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
