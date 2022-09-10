import Dropdown from "react-bootstrap/Dropdown";
import "./index.scss";

function DropDown(props) {
	const handleClickedItem = (e) => {
		e.preventDefault();
		const value = e.target.textContent;
		document.getElementById(props.id).textContent = value;
		if (props.function_) {
			props.function_(value);
		}
	};

	const handleClick = (eventKey, event) => {
		event.persist();
		console.log(eventKey);
		console.log(event);
	};

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
								onClick={handleClickedItem}
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
