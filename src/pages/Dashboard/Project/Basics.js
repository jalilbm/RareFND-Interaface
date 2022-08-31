import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import "./project.scss";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Basics() {
	const [categories, setCategories] = useState(second);
	useEffect(() => {
		axios.get("https://rarefndapi.herokuapp.com/api/category/");

		return () => {
			second;
		};
	}, [third]);

	return (
		<div className="DashboardCreateProjectBasics">
			<DashboardCreateProjectItemHead
				title="Start with the basics"
				head="Make it easy for people to learn about your project."
			/>
			<Row style={{ padding: "3vw" }}>
				<Col md={6}>
					<div class="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							class="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project title
						</h2>
						<div class="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p class="">
								<span>
									Write a clear, brief title and subtitle to help people quickly
									understand your project. Both will appear on your project and
									pre-launch pages.
								</span>
							</p>
							<p class="">
								<span>
									Potential backers will also see them if your project appears
									on category pages, search results, or in emails we send to our
									community.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="input-with-title">
						<p
							style={{
								marginBottom: "3px",
							}}
						>
							Title
						</p>
						<input
							class="atomic-text-input w-100"
							id="project-name"
							maxlength="60"
							name="project-name"
							placeholder="Aloe Bud: Self-care pocket companion for iOS"
							type="text"
							value=""
						/>
					</div>
					<br></br>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Subtitle
					</p>
					<div className="input-with-title">
						<textarea
							class="atomic-text-input w-100 h-50"
							id="project-description"
							maxlength="135"
							name="project-description"
							placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
						></textarea>
					</div>
				</Col>
			</Row>
			<hr />

			<Row style={{ padding: "3vw" }}>
				<Col md={6}>
					<div class="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							class="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project category
						</h2>
						<div class="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p class="">
								<span>
									Choose a primary category and subcategory to help backers find
									your project.
								</span>
							</p>
							<p class="">
								<span>
									Your second subcategory will help us provide more relevant
									guidance for your project. It won’t display on your project
									page or affect how it appears in search results.
								</span>
							</p>
							<p class="">
								<span>
									You can change these anytime before and during your campaign.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="input-with-title">
						<p
							style={{
								marginBottom: "3px",
							}}
						>
							Title
						</p>
						<input
							class="atomic-text-input w-100"
							id="project-name"
							maxlength="60"
							name="project-name"
							placeholder="Aloe Bud: Self-care pocket companion for iOS"
							type="text"
							value=""
						/>
					</div>
					<br></br>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Subtitle
					</p>
					<div className="input-with-title">
						<textarea
							class="atomic-text-input w-100 h-50"
							id="project-description"
							maxlength="135"
							name="project-description"
							placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
						></textarea>
					</div>
				</Col>
			</Row>
		</div>
	);
}
