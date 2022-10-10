import { Row } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "react-bootstrap/Button";

export default function Story(props) {
	const handleChange = (event, editor) => {
		const data = editor.getData();
		props.updateProjectData(
			{ target: { name: "projectStory", value: data } },
			"story"
		);
	};

	return (
		<div className="DashboardCreateProjectStory">
			<DashboardCreateProjectItemHead
				title="Introduce your project"
				head="Tell people why they should be excited about your project. Get specific but be clear and be brief."
			/>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
				<h4>Project description</h4>
				<p style={{ marginBottom: "40px" }}>
					Describe what you're raising funds to do, why you care about it, how
					you plan to make it happen, and who you are. Your description should
					tell contributors everything they need to know. If possible, include
					images to show them what your project is all about and what rewards
					look like.
				</p>
				<div>
					<CKEditor
						editor={ClassicEditor}
						data={
							props.projectData &&
							props.projectData["story"] &&
							props.projectData["story"].projectStory
						}
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
						}}
						onChange={(event, editor) => handleChange(event, editor)}
						onBlur={(event, editor) => {}}
						onFocus={(event, editor) => {}}
					/>
				</div>
			</Row>
			<Row style={{ padding: "3vw", marginLeft: "0px", marginRight: "0px" }}>
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
	);
}
