import SideBar from "../../../components/DashboardSideBare";
import "./home.scss";

export default function DashboardHome() {
	return (
		<div className="dashboard-home">
			<SideBar />
			<div className="dashboard-home-container">Container</div>
		</div>
	);
}
