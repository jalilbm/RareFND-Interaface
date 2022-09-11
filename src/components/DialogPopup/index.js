import React from "react";
import { Modal, Button } from "react-bootstrap";
function ModalDialog(props) {
	const [isShow, invokeModal] = React.useState(false);
	const initModal = () => {
		return invokeModal(!isShow);
	};
	return (
		<>
			<Button variant="success" onClick={initModal}>
				Open Modal
			</Button>
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
