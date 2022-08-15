import "bootstrap/dist/css/bootstrap.css";
import "./descriptionStyle.css";

export default function ProjectDescription(props) {
	return (
		<div className="project-description bg-white p-5 w-100">
			<h1 className="display-4 fw-bold text-center mb-5">Description</h1>
			<div
				dangerouslySetInnerHTML={{ __html: props.description }}
				style={{
					maxWidth: "100vw",
				}}
			></div>
		</div>
	);
}
