import "./sideBar.scss";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { Link } from "react-router-dom";

export default function SideBar() {
	return (
		<div className="dashboard-sidebar">
			<div className="center">
				<ul>
					<Link to="/dashboard/profile" style={{ textDecoration: "none" }}>
						<li>
							<AccountBoxIcon className="dashboard-icon" />
							<span>Profile</span>
						</li>
					</Link>
					<Link to="/dashboard/projects" style={{ textDecoration: "none" }}>
						<li>
							<AssignmentIcon className="dashboard-icon" />
							<span>Projects</span>
						</li>
					</Link>
				</ul>
			</div>
		</div>
	);
}
