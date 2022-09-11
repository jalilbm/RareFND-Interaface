import React from "react";
import { Modal, Button } from "react-bootstrap";

function ModalDialog(props) {
	const [isShow, invokeModal] = React.useState(props.show);
	const initModal = () => {
		if (props.function_) props.function_();
		return invokeModal(!isShow);
	};
	return (
		<>
			{props.button && <div onClick={initModal}>{props.button}</div>}
			<Modal show={isShow}>
				<Modal.Header closeButton onClick={initModal}>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.description}</Modal.Body>
				<Modal.Footer>
					<Button
						variant="warning"
						onMouseDown={(e) => e.preventDefault()}
						size="md"
						style={{ borderRadius: "0px" }}
						onClick={initModal}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default ModalDialog;
