import "./Profile.css";
import Profile from "../Profile/Profile";

import { Button, Row } from "react-bootstrap";

export default function Profile_(props) {
	return (
		<div className="dashboard-profile">
			<div className="dashboard-profile-container">
				<div className="container rounded bg-white mt-5 mb-5">
					<Profile />
					<Row
						style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}
					>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div style={{ textAlign: "left" }}>
								<Button
									variant="warning"
									onMouseDown={(e) => e.preventDefault()}
									size="md"
									onClick={props.previousTabFunction}
									style={{
										borderRadius: "0px",
										width: "8vw",
										minWidth: "100px",
									}}
								>
									Previous
								</Button>
							</div>

							<div style={{ textAlign: "right" }}>
								<Button
									variant="warning"
									onMouseDown={(e) => e.preventDefault()}
									size="md"
									onClick={props.nextTabFunction}
									style={{
										borderRadius: "0px",
										width: "8vw",
										minWidth: "100px",
									}}
								>
									Next
								</Button>
							</div>
						</div>
					</Row>
				</div>
			</div>
		</div>
	);
}
