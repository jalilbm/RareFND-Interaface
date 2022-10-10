import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

export default function ExtensibleInputs(props) {
	const [projectData__, setProjectData__] = useState(
		props.projectDataRef.current
	);

	useEffect(() => {
		props.setProjectData(projectData__);
	}, [projectData__]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		let projectData_ = { ...props.projectDataRef.current };
		if (
			props.rowId &&
			projectData_ &&
			projectData_["rewards"][props.rowId] &&
			projectData_["rewards"][props.rowId]["incentives"] &&
			projectData_["rewards"][props.rowId]["incentives"][name]
		) {
			projectData_["rewards"][props.rowId]["incentives"][name][name] = value;
			setProjectData__(projectData_);
		}
	};

	const addInput = () => {
		let projectData_ = { ...props.projectDataRef.current };
		const len = `${projectData_["rewards"][props.rowId]["incentives"].length}`;
		let tmp = { [len]: "" };
		projectData_["rewards"][props.rowId]["incentives"].push(tmp);
		setProjectData__(projectData_);
	};

	return (
		<div style={props.style}>
			<h3>Included Incentives:</h3>
			{props.projectDataRef &&
				props.projectDataRef.current["rewards"] &&
				props.projectDataRef.current["rewards"][`${props.rowId}`] &&
				props.projectDataRef.current["rewards"][`${props.rowId}`][
					"incentives"
				] &&
				Object.keys(
					props.projectDataRef.current["rewards"][`${props.rowId}`][
						"incentives"
					]
				).map((incentive, _) => {
					return (
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
								maxLength={props.maxLength || ""}
								name={`${_}`}
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
									][`${incentive}`][`${_}`]
								}
							/>
						</div>
					);
				})}
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
