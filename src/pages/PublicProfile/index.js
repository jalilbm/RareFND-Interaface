import axios from "axios";
import { useEffect, useState } from "react";
import "./index.scss";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function PublicProfile() {
	const profileId = window.location.href.split("/").at(-1);
	const [profileInfo, setProfileInfo] = useState(null);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/profile/${profileId}/`)
			.then((response) => {
				if (response.status === 200) {
					setProfileInfo(response.data);
				}
			});
	}, []);

	return (
		<div id="publicProfile">
			{profileInfo ? (
				<div>
					<div className="profileHeader">
						<div className="centerDiv">
							<img
								id="profileImage"
								className="rounded-circle"
								src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
							></img>
						</div>
						<div className="centerDiv">
							<h1>
								{profileInfo.username !== "dean"
									? profileInfo.username
									: "AURA SKYPOOL"}
							</h1>
						</div>
						<div className="centerDiv">
							<p className="m-1">{`${
								profileInfo.first_name !== null ? profileInfo.first_name : ""
							} ${
								profileInfo.last_name !== null ? profileInfo.last_name : ""
							}`}</p>
						</div>
						{/* <div className="centerDiv">
							<p>{profileInfo.email}</p>
						</div> */}
						<div className="centerDiv">
							<div
								style={{
									border: " 2px solid #FAD02C",
									width: "10%",
									minWidth: "60px",
									marginBottom: "20px",
								}}
							></div>
						</div>
						<div className="centerDiv" style={{ textAlign: "center" }}>
							<div style={{ width: "500px" }}>
								<p style={{ whiteSpace: "pre-wrap" }}>{profileInfo.bio}</p>
							</div>
						</div>
					</div>
					<div className="profileProjects"></div>
				</div>
			) : (
				<LoadingSpinner />
			)}
		</div>
	);
}
