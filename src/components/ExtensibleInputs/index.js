import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function ExtensibleInputs(props) {
	const [inputs, setInputs] = useState([]);

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
				name={props.name ? `${props.name}-${inputs.length}` : ""}
				placeholder={props.placeholder || ""}
				type="text"
				onChange={props.function_}
				style={{
					marginBottom: "3px",
					width: "100%",
				}}
			/>
		</div>
	);

	const addInput = () => {
		let tmp = [...inputs];
		tmp.push(input);
		setInputs(tmp);
	};

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
