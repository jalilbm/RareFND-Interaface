import { Row } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Button from "react-bootstrap/Button";

export default function Story(props) {
	return (
		<div className="DashboardCreateProjectFunding">
			<DashboardCreateProjectItemHead
				title="Verify your details and link a bank account"
				head="Confirm who’s raising funds and receiving them if this project reaches its funding goal. 
        Double-check your information—you agree the details you provide are true and acknowledge they can’t be changed once submitted."
			/>
		</div>
	);
}
