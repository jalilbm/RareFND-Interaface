import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function ExtensibleInputs(props) {
	const [inputs, setInputs] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		let projectData_ = { ...props.projectDataRef.current };
		if (
			props.rowId &&
			props.projectDataRef &&
			projectData_["rewards"][props.rowId]
		) {
			if (projectData_["rewards"][props.rowId]["incentives"]) {
				projectData_["rewards"][props.rowId]["incentives"] = {
					...projectData_["rewards"][props.rowId]["incentives"],
					[name]: value,
				};
			} else {
				projectData_["rewards"][props.rowId]["incentives"] = {
					[name]: value,
				};
			}
			console.log(projectData_);
			props.setProjectData(projectData_);
		}
	};

	const input = (
		<div className="input-with-title">
			<p
				style={{
					marginBottom: "3px",
				}}
			>
				{props.title}
			</p>
			<input
				className={props.className || ""}
				maxlength={props.maxLength || ""}
				name={`${inputs.length + 1}`}
				placeholder={props.placeholder || ""}
				type="text"
				onChange={handleChange}
				style={{
					marginBottom: "3px",
					width: "100%",
				}}
				value={
					props.projectDataRef.current &&
					props.projectDataRef.current["rewards"] &&
					props.projectDataRef.current["rewards"][`${props.rowId}`] &&
					props.projectDataRef.current["rewards"][`${props.rowId}`][
						"incentives"
					] &&
					props.projectDataRef.current["rewards"][`${props.rowId}`][
						"incentives"
					][`${inputs.length + 1}`]
				}
			/>
		</div>
	);

	const addInput = () => {
		let tmp = [...inputs];
		tmp.push(input);
		setInputs(tmp);
	};

	if (
		props.projectDataRef.current &&
		props.projectDataRef.current["rewards"] &&
		props.projectDataRef.current["rewards"][`${props.rowId}`] &&
		props.projectDataRef.current["rewards"][`${props.rowId}`]["incentives"] &&
		Object.keys(
			props.projectDataRef.current["rewards"][`${props.rowId}`]["incentives"]
		).length > inputs.length
	) {
		console.log("aaa");
		return addInput();
	}

	return (
		<div style={props.style}>
			<h3>Included Incentives:</h3>
			{inputs.map((input) => input)}
			<Button
				variant="outline-warning"
				size="sm"
				onMouseDown={(e) => e.preventDefault()}
				onClick={addInput}
				style={{ borderRadius: "0px" }}
			>
				+
			</Button>
		</div>
	);
}
