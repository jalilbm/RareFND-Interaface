import React from "react";
import commingSoonImage from "../../assets/comingSoon.png";
import "./index.css";

const CommingSoon = () => {
	return (
		<div className="mainDiv">
			<div className="row mainRow">
				<div className="col-12 col-md-6 textCol">
					<div>
						<h3>This page is Coming Soon</h3>
						{/* <div className="paraDiv">
							<p>There is nothing to show on this page yet</p>
						</div> */}
						{/* <div className="buttonDiv">
              <input type="text" placeholder="Enter your email address " />
              <button>Notify Me</button>
            </div> */}
					</div>
				</div>
				<div className="col-12 col-md-6 imageCol">
					<img src={commingSoonImage} />
				</div>
			</div>
		</div>
	);
};

export default CommingSoon;
