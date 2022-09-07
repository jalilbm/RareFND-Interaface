import { Row } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "react-bootstrap/Button";

export default function Story(props) {
	return (
		<div className="DashboardCreateProjectStory">
			<DashboardCreateProjectItemHead
				title="Introduce your project"
				head="Tell people why they should be excited about your project. Get specific but be clear and be brief."
			/>
			<Row style={{ padding: "3vw", width: "100%" }}>
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
						data=""
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log("Editor is ready to use!", editor);
						}}
						onChange={(event, editor) => {
							const data = editor.getData();
							console.log({ event, editor, data });
						}}
						onBlur={(event, editor) => {
							console.log("Blur.", editor);
						}}
						onFocus={(event, editor) => {
							console.log("Focus.", editor);
						}}
					/>
				</div>
			</Row>
			<Row style={{ padding: "3vw", width: "100%" }}>
				<div style={{ textAlign: "right" }}>
					<Button
						variant="warning"
						onMouseDown={(e) => e.preventDefault()}
						size="md"
						onClick={props.nextTabFunction}
						style={{ borderRadius: "0px", width: "150px" }}
					>
						Next
					</Button>
				</div>
			</Row>
		</div>
	);
}
