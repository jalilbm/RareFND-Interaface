import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./index.scss";

function DropDown(props) {
	const [selectedItem, setSelectedItem] = useState(null);

	const handleClickedItem = (eventKey) => {
		document.getElementById(props.id).textContent = eventKey;
		setSelectedItem(eventKey);
		if (props.function_) {
			props.function_({ target: { name: props.id, value: eventKey } });
		}
	};

	useEffect(() => {
		document.getElementById(props.id).textContent =
			selectedItem || props.value || props.title;
	}, [selectedItem]);

	return (
		<Dropdown className="drop-down" onSelect={handleClickedItem}>
			<Dropdown.Toggle
				className="dropdown"
				id={props.id}
				onMouseDown={(e) => e.preventDefault()}
				disabled={props.disabled}
				variant="warning"
			>
				{props.title}
			</Dropdown.Toggle>

			<Dropdown.Menu className="drop-menu warning">
				{props.options.map(
					(child) =>
						child && (
							<Dropdown.Item
								className="drop-menu-item warning"
								eventKey={child}
							>
								{child}
							</Dropdown.Item>
						)
				)}
			</Dropdown.Menu>
		</Dropdown>
	);
}

export default DropDown;
