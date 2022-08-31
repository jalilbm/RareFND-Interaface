import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./index.css";

export default function CreateProjectNavBar() {
	const [selectedNavItem, setSelectedNavItem] = useState(null);
	const handleNavItem = (event) => {
		if (selectedNavItem !== event.target.id) {
			if (selectedNavItem) {
				document.getElementById(selectedNavItem).className = document
					.getElementById(selectedNavItem)
					.className.replace(" selected", "");
			}
			setSelectedNavItem(event.target.id);
		}
	};
	useEffect(() => {
		if (selectedNavItem)
			document.getElementById(selectedNavItem).className =
				document.getElementById(selectedNavItem).className + " selected";
	}, [selectedNavItem]);
	return (
		<nav
			id="dashboard-rules-NAV_1"
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div id="dashboard-rules-DIV_2" style={{ width: "90%" }}>
				<div id="dashboard-rules-DIV_3">
					<div id="dashboard-rules-DIV_4">
						<div
							id="dashboard-rules-DIV_5"
							// style={{ border: "0.5px solid lightgray" }}
						>
							<ul
								id="dashboard-rules-UL_6"
								style={{
									listStyle: "none",
									padding: "0px",
									margin: "0px",
									width: "100%",
									height: "80px",
								}}
							>
								<Row style={{ height: "100%" }} className="d-none d-md-flex">
									<Col>
										<li
											id="dashboard-rules-LI_7"
											onClick={handleNavItem}
											style={{ padding: "15px" }}
										>
											<div
												id="dashboard-rules-DIV_9"
												style={{ pointerEvents: "none" }}
											>
												<div
													id="dashboard-rules-DIV_10"
													style={{ pointerEvents: "none" }}
												>
													<span
														id="dashboard-rules-SPAN_11"
														style={{ pointerEvents: "none" }}
													>
														✍️
													</span>
												</div>
												Basics
											</div>
										</li>
									</Col>
									<Col>
										<li id="dashboard-rules-LI_12" onClick={handleNavItem}>
											<div
												id="dashboard-rules-DIV_14"
												style={{ pointerEvents: "none" }}
											>
												<div
													id="dashboard-rules-DIV_15"
													style={{ pointerEvents: "none" }}
												>
													<span
														id="dashboard-rules-SPAN_16"
														style={{ pointerEvents: "none" }}
													>
														📊
													</span>
												</div>
												Funding
											</div>
										</li>
									</Col>
									<Col>
										<li id="dashboard-rules-LI_17" onClick={handleNavItem}>
											<div
												id="dashboard-rules-DIV_19"
												style={{ pointerEvents: "none" }}
											>
												<div
													id="dashboard-rules-DIV_20"
													style={{ pointerEvents: "none" }}
												>
													<span
														id="dashboard-rules-SPAN_21"
														style={{ pointerEvents: "none" }}
													>
														🎁
													</span>
												</div>
												Rewards
											</div>
										</li>
									</Col>
									<Col>
										<li id="dashboard-rules-LI_22" onClick={handleNavItem}>
											<div
												id="dashboard-rules-DIV_24"
												style={{ pointerEvents: "none" }}
											>
												<div
													id="dashboard-rules-DIV_25"
													style={{ pointerEvents: "none" }}
												>
													<span
														id="dashboard-rules-SPAN_26"
														style={{ pointerEvents: "none" }}
													>
														📖
													</span>
												</div>
												Story
											</div>
										</li>
									</Col>
									<Col>
										<li id="dashboard-rules-LI_27" onClick={handleNavItem}>
											<div
												id="dashboard-rules-DIV_29"
												style={{ pointerEvents: "none" }}
											>
												<div
													id="dashboard-rules-DIV_30"
													style={{ pointerEvents: "none" }}
												>
													<span
														id="dashboard-rules-SPAN_31"
														style={{ pointerEvents: "none" }}
													>
														👥
													</span>
												</div>
												People
											</div>
										</li>
									</Col>
									<Col>
										<li id="dashboard-rules-LI_32" onClick={handleNavItem}>
											<div
												id="dashboard-rules-DIV_34"
												style={{ pointerEvents: "none" }}
											>
												<div
													id="dashboard-rules-DIV_35"
													style={{ pointerEvents: "none" }}
												>
													<span
														id="dashboard-rules-SPAN_36"
														style={{ pointerEvents: "none" }}
													>
														💰
													</span>
												</div>
												Payment
											</div>
										</li>
									</Col>
									<Col>
										<li id="dashboard-rules-LI_37" onClick={handleNavItem}>
											<div
												id="dashboard-rules-DIV_39"
												style={{ pointerEvents: "none" }}
											>
												<div
													id="dashboard-rules-DIV_40"
													style={{ pointerEvents: "none" }}
												>
													<span
														id="dashboard-rules-SPAN_41"
														style={{ pointerEvents: "none" }}
													>
														📢
													</span>
												</div>
												Promotion
											</div>
										</li>
									</Col>
								</Row>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
