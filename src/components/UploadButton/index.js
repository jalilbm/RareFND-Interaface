import React, { useRef } from "react";
import useFileUpload from "react-use-file-upload";

const UploadButton = (props) => {
	const { handleDragDropEvent, setFiles } = useFileUpload();

	const inputRef = useRef();

	return (
		<div css={{}}>
			<div className="form-container">
				{/* Provide a drop zone and an alternative button inside it to upload files. */}
				<div
					css={{}}
					onDragEnter={handleDragDropEvent}
					onDragOver={handleDragDropEvent}
					onDrop={(e) => {
						handleDragDropEvent(e);
						setFiles(e, "a");
					}}
				>
					<button
						onClick={() => inputRef.current.click()}
						style={{
							backgroundColor: "transparent",
							border: "1.5px solid #fad02c",
						}}
					>
						{props.title}
					</button>

					{/* Hide the crappy looking default HTML input */}
					<input
						ref={inputRef}
						type="file"
						// multiple
						style={{ display: "none" }}
						accept={props.accepted_formats}
						onChange={(e) => {
							setFiles(e, "a");
							inputRef.current.value = null;
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default UploadButton;
