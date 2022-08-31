import SideBar from "../../../components/DashboardSideBare";
import "./project.scss";
import Basics from "./Basics";
import CreateProjectNavBar from "../../../components/CreateProjectNavBar";

export default function DashboardProjects() {
	return (
		<div className="dashboard-projects">
			<SideBar />
			<div className="dashboard-projects-container">
				<CreateProjectNavBar />
				<Basics />
			</div>
		</div>
	);
}
