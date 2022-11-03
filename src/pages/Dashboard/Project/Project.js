import SideBar from "../../../components/DashboardSideBare";
import "./project.scss";
import Basics from "./Basics";
import Profile from "./Profile";
import Funding from "./Funding";
import Rewards from "./Rewards";
import Story from "./Story";
import Payment from "./Payment";
import CreateProjectNavBar from "../../../components/CreateProjectNavBar";
import { useState, useEffect, useRef } from "react";

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
	const formErrorsRef = useRef(formErrors);
	formErrorsRef.current = formErrors;

	useEffect(() => {
		console.log(formErrors);
	}, [formErrors]);

	const addErrorPath = (errorPath) => {
		let tmp = { ...formErrorsRef.current };
		if (!tmp[errorPath.split(".")[0]]) {
			tmp[errorPath.split(".")[0]] = {};
		}
		if (!tmp[errorPath.split(".")[0]][errorPath.split(".")[1]]) {
			console.log("ikram", [errorPath.split(".")[1]]);
			tmp[errorPath.split(".")[0]][errorPath.split(".")[1]] = {};
		}
		formErrorsRef.current = tmp;
		console.log("jaliloooo", tmp);
		setFormErrors(tmp);
	};

	const addInputError = (input, errorMessage, errorPath = null) => {
		if (errorPath !== null) {
			let tmp = { ...formErrorsRef.current };
			tmp[errorPath.split(".")[0]][errorPath.split(".")[1]][input] =
				errorMessage;
			setFormErrors(tmp);
		} else {
			// setFormErrors((prev) => {
			// 	return { ...prev, [input]: errorMessage };
			// });
			setTimeout(() => {
				setFormErrors((formErrors) => {
					return { ...formErrors, [input]: errorMessage };
				});
			}, 0);
			// setFormErrors({
			// 	...formErrors,
			// 	[input]: errorMessage,
			// });
		}
	};

	const removeInputError = (input, errorPath = null) => {
		let tmp = { ...formErrors };
		if (
			errorPath !== null &&
			tmp[errorPath.split(".")[0]] &&
			tmp[errorPath.split(".")[0]][errorPath.split(".")[1]] &&
			tmp[errorPath.split(".")[0]][errorPath.split(".")[1]][input]
		) {
			delete tmp[errorPath.split(".")[0]][errorPath.split(".")[1]][input];
		} else {
			delete tmp[input];
		}

		setFormErrors(tmp);
	};

	const handleEmptyInputError = (
		value,
		input,
		errorMessage,
		errorPath = null
	) => {
		if (!value || value === "" || value === null) {
			addInputError(input, errorMessage, errorPath);
		} else {
			removeInputError(input, errorPath);
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

	const handleInputErrors = (name, value, errorPath = null) => {
		if (errorPath !== null) {
			addErrorPath(errorPath);
		}
		switch (name) {
			case "projectTitle":
				handleEmptyInputError(value, name, "Project Title is required!");
				break;
			case "projectCategory":
				handleNonSelectedDropMenu(
					value,
					"Choose Category",
					name,
					"Please select a category!"
				);
				handleEmptyInputError(value, name, "Please select a category!");
				break;
			case "projectType":
				handleNonSelectedDropMenu(
					value,
					"Choose Project Type",
					name,
					"Please select a project type!"
				);
				handleEmptyInputError(value, name, "Please select a project type!");
				break;
			case "projectCountry":
				handleNonSelectedDropMenu(
					value,
					"Choose a country",
					name,
					"Please select a project country!"
				);
				handleEmptyInputError(value, name, "Please select a project country!");
				break;
			case "projectImageFile":
				handleEmptyInputError(value, name, "Project Image is required!");
				break;
			case "projectHead":
				handleEmptyInputError(value, name, "Project Head is required!");
				break;
			case "projectAddress":
				handleEmptyInputError(value, name, "Project Address is required!");
				break;
			case "projectLaunchDate":
				handleEmptyInputError(value, name, "Project launch date is required!");
				break;
			case "projectDeadlineDate":
				handleEmptyInputError(
					value,
					name,
					"Project deadline date is required!"
				);
				break;
			case "projectFundsAmount":
				handleEmptyInputError(
					value,
					name,
					"Project Funding Amount is required!"
				);
				break;
			case "incentiveTitle":
				handleEmptyInputError(
					value,
					name,
					"Incentive title is required!",
					errorPath
				);
				break;
			case "incentiveDescription":
				handleEmptyInputError(
					value,
					name,
					"Incentive description is required!",
					errorPath
				);
				break;
			case "incentiveEstimatedDelivery":
				handleEmptyInputError(
					value,
					name,
					"Incentive delivery date is required!",
					errorPath
				);
				break;
			case "availableIncentives":
				handleEmptyInputError(
					value,
					name,
					"Number of available incentives is required!",
					errorPath
				);
				break;
			case "incentivePrice":
				handleEmptyInputError(
					value,
					name,
					"Incentive price is required!",
					errorPath
				);
				break;
			case "companyName":
				handleEmptyInputError(value, name, "Company name is required!");
				break;
			case "natureOfBusiness":
				handleEmptyInputError(value, name, "Nature of business is required!");
				break;
			case "companyAddress":
				handleEmptyInputError(value, name, "Company address is required!");
				break;
			case "companyCity":
				handleEmptyInputError(value, name, "Company city is required!");
				break;
			case "companyZipCode":
				handleEmptyInputError(value, name, "Company zip code is required!");
				break;
			case "projectIncorporationDate":
				handleEmptyInputError(
					value,
					name,
					"Company Incorporation date is required!"
				);
				break;
			case "companyCountry":
				handleNonSelectedDropMenu(
					value,
					"Choose a country",
					name,
					"Company country is required!"
				);
				handleEmptyInputError(value, name, "Company country is required!");
				break;
			case "companyRegistrationNumber":
				handleEmptyInputError(
					value,
					name,
					"Company registration number is required!"
				);
				break;
			case "companyEstimatedAnnualTurnover":
				handleEmptyInputError(
					value,
					name,
					"Company estimated annual turnover is required!"
				);
				break;
			case "projectTaxCountry":
				handleNonSelectedDropMenu(
					value,
					"Choose a country",
					name,
					"Company Tax country is required!"
				);
				handleEmptyInputError(value, name, "Company Tax country is required!");
				break;
			case "taxIdNumber":
				handleEmptyInputError(
					value,
					name,
					"Tax identification number is required!"
				);
				break;
			case "certificateOfIncumbency":
				handleEmptyInputError(
					value,
					name,
					"Certificate of incorporation is required!"
				);
				break;
		}
	};

	const updateProjectData = (event, source) => {
		let { name, value } = event.target;
		handleInputErrors(name, value);
		setProjectData({
			...projectData,
			[source]: { ...projectData[source], [name]: value },
		});
	};

	useEffect(() => {
		for (
			let index = 0;
			index < Object.keys(projectData.basics).length;
			index++
		) {
			const key = Object.keys(projectData.basics)[index];
			console.log(key, projectData.basics.key);
			handleInputErrors(key, projectData.basics[key] || null);
		}

		handleInputErrors(
			"projectFundsAmount",
			projectData.funding.projectFundsAmount
		);
	}, []);

	useEffect(() => {
		console.log(projectData);

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
						handleInputErrors={handleInputErrors}
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
					/>
				);
				break;
			case "create-project-tab-5":
				setRenderTab(
					<Profile
						nextTabFunction={() => changeTab("create-project-tab-6")}
						previousTabFunction={() => changeTab("create-project-tab-4")}
						formErrors={formErrors}
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
