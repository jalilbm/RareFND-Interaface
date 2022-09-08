import { Row, Col } from "react-bootstrap";
import DashboardCreateProjectItemHead from "../../../components/DashboardCreateProjectItemHead";
import DropDown from "../../../components/DropDown";
import UploadButton from "../../../components/UploadButton";
import Calendar from "../../../components/Calendar";
import "./project.scss";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

export default function Basics(props) {
	const [categories, setCategories] = useState([{}]);
	const [subCategories, setSubCategories] = useState([{}]);
	const [basicsData, setBasicsData] = useState([{}]);
	const [countries, setCountries] = useState([{}]);

	useEffect(() => {
		axios
			.get("http://rarefndapi.herokuapp.com/api/category/")
			.then((response) => {
				setCategories(response.data.categories);
			});
		axios
			.get("http://rarefndapi.herokuapp.com/api/country/")
			.then((response) => {
				setCountries(response.data.categories);
			});
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setBasicsData({ ...basicsData, [name]: value });
	};

	const handleSubCategories = (category) => {
		document.getElementById("subcategories-dropdown").textContent =
			"Choose Subcategory";
		axios
			.get(
				`http://rarefndapi.herokuapp.com/api/category/${category}/subcategories/`
			)
			.then((response) => {
				setSubCategories(response.data.subcategories);
			});
		return subCategories;
	};

	return (
		<div className="DashboardCreateProjectBasics">
			<DashboardCreateProjectItemHead
				title="Start with the basics"
				head="Make it easy for people to learn about your project."
			/>
			<Row style={{ padding: "3vw", width: "100%" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project title
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Write a clear, brief title and subtitle to help people quickly
									understand your project. Both will appear on your project and
									pre-launch pages.
								</span>
							</p>
							<p className="">
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
							className="atomic-text-input w-100"
							id="project-name"
							maxlength="60"
							name="title"
							placeholder="Aloe Bud: Self-care pocket companion for iOS"
							type="text"
							onChange={handleChange}
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
							className="atomic-text-input w-100 h-50"
							id="project-description"
							maxlength="135"
							name="description"
							placeholder="Gently brings awareness to self-care activities, using encouraging push notifications, rather than guilt or shame."
							onChange={handleChange}
						></textarea>
					</div>
				</Col>
			</Row>
			<hr />
			<Row style={{ padding: "3vw", width: "100%" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project category
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Choose a primary category and subcategory to help backers find
									your project.
								</span>
							</p>
							<p className="">
								<span>
									Your second subcategory will help us provide more relevant
									guidance for your project. It won’t display on your project
									page or affect how it appears in search results.
								</span>
							</p>
							<p className="">
								<span>
									You can change these anytime before and during your campaign.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="input-with-title" style={{ position: "relative" }}>
						<p
							style={{
								marginBottom: "3px",
							}}
						>
							Category
						</p>
						<DropDown
							title="Choose Category"
							id="categories-dropdown"
							options={
								categories
									? categories.map((category) => {
											if (category.name != "All") return category.name;
									  })
									: []
							}
							function_={handleSubCategories}
						/>
					</div>
					<br></br>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Sub Category
					</p>
					<div className="input-with-title">
						<DropDown
							title="Choose Subcategory"
							id="subcategories-dropdown"
							options={
								subCategories
									? subCategories.map((subcategory) => {
											if (subcategory.name != "All") return subcategory.name;
									  })
									: []
							}
						/>
					</div>
				</Col>
			</Row>
			<hr />
			<Row style={{ padding: "3vw", width: "100%" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project location
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Enter the location that best describes where your project is
									based.
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
							Address
						</p>
						<input
							className="atomic-text-input w-100"
							id="project-name"
							maxlength="60"
							name="title"
							placeholder="DMCC Crypto Centre, 48th Floor, Almas Tower, JLT"
							type="text"
							onChange={handleChange}
						/>
					</div>
					<br></br>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Country
					</p>
					<div className="input-with-title">
						<DropDown
							title="Choose a country"
							id="countries-dropdown"
							options={
								subCategories
									? countries.map((subcategory) => {
											if (subcategory.name != "All") return subcategory.name;
									  })
									: []
							}
						/>
					</div>
				</Col>
			</Row>
			<hr />
			<Row style={{ padding: "3vw", width: "100%" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Project image
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Add an image that clearly represents your project. Choose one
									that looks good at different sizes, it will appear on your
									project page, across the RareFnd website, and (when shared) on
									social channels.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="input-with-title h-100">
						<div
							className="h-100"
							style={{
								display: "flex",
								gap: "20px",
								alignItems: "center",
							}}
						>
							<p style={{ margin: "0px" }}>Upload Image:</p>
							<UploadButton
								title="Select image"
								accepted_formats=".gif,.jpg,.jpeg,.png"
							/>
						</div>
					</div>
				</Col>
			</Row>
			<hr />
			<Row style={{ padding: "3vw", width: "100%" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Target launch date
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Select a date when you want to launch your project, if your
									project got accepted it will be live on our platform on that
									date, before that it will be on the "Coming soon" projects and
									you will get a URL to your project that you can use for
									promotion.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Launch date:
					</p>
					<div className="input-with-title">
						<Calendar />
					</div>
				</Col>
			</Row>
			<hr />
			<Row style={{ padding: "3vw", width: "100%" }}>
				<Col md={6}>
					<div className="grid-col-12 grid-col-4-lg hide block-md">
						<h2
							className="type-14 type-18-md book mb0 medium soft-black"
							aria-level="2"
						>
							Fundraising deadline
						</h2>
						<div className="type-13 type-14-md book dark-grey-500 mt1 mb2 mb0-lg">
							<p className="">
								<span>
									Set a time limit for your fundraising. You will not be able to
									change this after you launch.
								</span>
							</p>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<p
						style={{
							marginBottom: "3px",
						}}
					>
						Deadline date:
					</p>
					<div className="input-with-title">
						<Calendar />
					</div>
				</Col>
			</Row>
			<Row style={{ padding: "3vw", width: "100%" }}>
				<div style={{ textAlign: "right" }}>
					<Button
						variant="warning"
						onMouseDown={(e) => e.preventDefault()}
						size="md"
						onClick={props.nextTabFunction}
						style={{ borderRadius: "0px", width: "150px" }}
					>
						Next
					</Button>
				</div>
			</Row>
		</div>
	);
}
