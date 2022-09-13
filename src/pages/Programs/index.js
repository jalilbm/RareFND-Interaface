import CategoryCarousel from "../../components/CategoryCarousel";
import Charity from "../../assets/carousel/charity.jpg";
import Startup from "../../assets/carousel/startup.jpg";
import AboutUs from "../../assets/carousel/AboutUs.jpg";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./index.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function About() {
	const [tabIndex, setTabIndex] = useState(0);
	const location = useLocation();

	useEffect(() => {
		if (location.hash) setTabIndex(parseInt(location.hash.replace("#", "")));
	}, [location.hash]);

	const handleChange = (event, newTabInex) => {
		setTabIndex(newTabInex);
	};

	return (
		<div>
			<CategoryCarousel image={AboutUs} title="About Us" />
			{/* <div
				className="mt-5"
				style={{
					border: " 2px solid #FAD02C",
					width: "10%",
					minWidth: "60px",
					marginLeft: "5%",
				}}
			></div> */}
			{/* <h1
				className="mt-4"
				style={{
					color: "#3d3d3d",
					fontWeight: "bold",
					marginLeft: "5%",
				}}
			>
				Our Initiatives
			</h1> */}
			{/* <Box>
				<Box className="w-100">
					<Tabs
						value={tabIndex}
						onChange={handleChange}
						className="m-2"
						TabIndicatorProps={{ style: { background: "#FAD02C" } }}
						aria-label="secondary tabs example"
						centered
					>
						<Tab
							style={{
								maxWidth: "300px",
								width: "50%",
								color: "#3d3d3d",
								fontSize: "18px",
							}}
							label="Our team"
						/>
						<Tab
							style={{
								maxWidth: "300px",
								width: "50%",
								color: "#3d3d3d",
								fontSize: "18px",
							}}
							label="Our community"
						/>
					</Tabs>
				</Box>
				<Box sx={{ padding: "3vw" }}>
					{
						<Box className="h-100">
							<Typography>
								<div
									style={{ color: "white", height: "100%" }}
									className="programText bg-white text-black mx-auto"
								>
									<div>
										<img
											style={{
												height: `56${
													window.innerHeight > window.innerWidth ? "vw" : "vh"
												}`,
												width: "100%",
												objectFit: "cover",
											}}
											src={tabIndex === 0 ? Charity : Startup}
											id={tabIndex.toString()}
											className="img-fluid shadow-4"
											alt="..."
										/>
									</div>

									<div style={{ padding: "5vw" }}>
										{tabIndex === 0 ? (
											<>
												<p>
													The Rare FND organization is a non-profit organization
													made up of rare individuals who are experts in their
													field that when combined form a rare force to help
													support the ecosystem of all involved with Rare FND.
												</p>
												<p>
													With governmental advisors to philanthropists to
													industry experts across a range of sectors we aim to
													provide the support needed to build the best possible
													community for all campaigns on our platform to give
													exposure to that Rare Find and ensure that they can
													complete their Rare Fund.
												</p>
											</>
										) : (
											<>
												<p>
													Through the utilization of our huge community, you get
													an extension to your own marketing campaigns. With
													Rare FND partnerships with influencers across all
													social media platforms your crowdfunding campaign gets
													exposure through each and every one of our influencer
													partnerships meaning that you reach millions of users
													just by using by platform.
												</p>
												<p>
													Not only that but we have our own strong community in
													our own social media platforms who can also support
													your crowdfunding campaign through a range of
													different engagements.
												</p>
												<p>
													Our community members can also help your campaign even
													more! Through holding our native community token
													members can vote on their favourite crowdfunding
													charities or start-ups they would like to receive
													extra exposure.
												</p>
												<p>
													Your crowdfunding campaign starts with our community
													as well as your own, so as your campaign grows within
													our community then so does your own.
												</p>
												<h5>Whitepaper:</h5>
												<p>
													Download our technical documentation relating to the
													Rare FND native token here.
												</p>
											</>
										)}

										<div className="col-md-12 text-center">
											<Button
												type="button"
												className="btn-warning"
												size="lg"
												to="/dashboard/projects"
											>
												Start Project {""}
											</Button>
										</div>
									</div>
								</div>
							</Typography>
						</Box>
					}
				</Box>
			</Box> */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						backgroundColor: "white",
						padding: "5vw",
						marginTop: "30px",
						marginBottom: "30px",
						width: "90%",
					}}
				>
					<h2>Our team</h2>
					<p>
						The Rare FND organization is a non-profit organization made up of
						rare individuals who are experts in their field that when combined
						form a rare force to help support the ecosystem of all involved with
						Rare FND. With governmental advisors to philanthropists to industry
						experts across a range of sectors we aim to provide the support
						needed to build the best possible community for all campaigns on our
						platform to give exposure to that Rare Find and ensure that they can
						complete their Rare Fund.
					</p>
					<h2>Our community</h2>
					<p>
						Through the utilization of our huge community, you get an extension
						to your own marketing campaigns. With Rare FND partnerships with
						influencers across all social media platforms your crowdfunding
						campaign gets exposure through each and every one of our influencer
						partnerships meaning that you reach millions of users just by using
						by platform. Not only that but we have our own strong community in
						our own social media platforms who can also support your
						crowdfunding campaign through a range of different engagements. Our
						community members can also help your campaign even more! Through
						holding our native community token members can vote on their
						favourite crowdfunding charities or start-ups they would like to
						receive extra exposure. Your crowdfunding campaign starts with our
						community as well as your own, so as your campaign grows within our
						community then so does your own.
						<br />
						<br />
						<h2>Whitepaper</h2>
						<br />
						Download our technical documentation relating to the Rare FND native
						token{" "}
						<a
							href="https://rarefnd-bucket.s3.us-east-2.amazonaws.com/RareFNDData/Rare_FND_Whitepaper_v2.1.pdf?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBMaCXVzLWVhc3QtMSJGMEQCIHQPdpbSep9pCblUqIcyme1lQTZNDiuZPZ%2BMI%2BQlbbakAiARAq995xogXCyO45mOUCCPjqN3%2Bg1OY%2F1W0Cw%2Fi%2FHpPyrtAgis%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDIxMDg0MzMzODUzMyIMovDWq7MyhYveEXmXKsECyuWxeIib42lmtCQLM4nYRowd%2FtuH3EN3k2AajtKtOAn2voVgU1PVIgNEabFrxmK63HBl6ZV69Qx%2Be0xycg4roqrCKd%2FurB8ewAGjAN2e3nDpu3LCujnbphZiY7IbOiSP2XeH2145CuCRdb2Cn%2FMxZkAJtVMyZTD%2FIAlYvz1mfMU5%2BsYMhLUFXyrEtaWqcU7ypyRCrlJ3HPAhgr4pU9N2IZxpCSQ1HgLDhtnMKwG96uszQ5tqikxDmJ2%2FUfAFWlfCFDP%2F11KAuWOGlYT1uU25mFYcf2GthzIRlrkPgrPT6GYDd05i7mQ67oyeJ9N1WP997n%2B8g6CAMsKsO0r%2ByNwFHR%2FPc7YaE08BdjbOSOXmKJNVuHAuK6opO6wQWKw8p615dZXqSnVW7X6i5njH28P1R4OhTX06SL7%2FMtGdrRk8tNKDMMiYg5kGOrQCOLmPkG3dTxJZ4k4A3fquI%2BKPCxEd7euEmjOwogUXrnDS2savV%2FMlTY0NAXt5FeGEkyMR%2FMX%2Bemnzi4w6VwQlUkmqi3%2BzFzgks5hdxTzz8ROHvK3S4FhRnLqZF%2Fy5ZmnGY6f1c7zCHFGY6FmqcmzDRQ%2FBUl2D6rnYLMYXOwNQkemXjSa9ReOJ%2BqRqB59Ok8bDB1PJcL39BISdoGgIhdJ8%2BGuxbkw8YWcAOBvTq13NxDBCLUapeYhwXjkG540uUtAZjc8rtlCoegp86DI%2FevqvLx8DR7Pz18Ozx40nX1lHpnX9Ut%2BEa3QOLR6a0enx7ktHaN0zccCadrKu2IqXVttRmdYqShqYcWuGsqlpCVPK3wR3yxF%2FYltoUfjp4aAQG2g1%2F3kpdWcw83hHBr%2FwniJ72kdSz%2FM%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220913T195719Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIATCFZ6A4S25VNKTHD%2F20220913%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=c7b6bd83394d2890dfc1f01e264691506b54687d3ac91ac045627e77d553cc95"
							target="_blank"
							rel="noreferrer"
						>
							here
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
