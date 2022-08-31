import SideBar from "../../../components/DashboardSideBare";
import "./profile.scss";

export default function DashboardProfile() {
	return (
		<div className="dashboard-profile">
			<SideBar />
			<div className="dashboard-profile-container">Profile</div>
		</div>
	);
}
