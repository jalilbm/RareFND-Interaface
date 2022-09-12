import CategoryCarousel from "../../components/CategoryCarousel";
import AboutUs from "../../assets/carousel/AboutUs.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import Image from "react-bootstrap/Image";
import "./index.css";
import Contact_us from "../../assets/assets/carousel/Contact_us.png";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Col, Row } from "react-bootstrap";

export default function About() {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_afejnhj",
				"template_gktw9ca",
				form.current,
				"OHpPnX-MUtF6ELUyq"
			)
			.then(
				(result) => {
					console.log(result.text);
					console.log("message sent succesfully");
				},
				(error) => {
					console.log(error.text);
				}
			);
	};
	return (
		<div className="aboutpage mt-5">
			<section className="contact text-light" id="contacts">
				<Row>
					<Col md={6} style={{ color: "#3d3d3d", position: "relative" }}>
						<h1 className="contacttitle text-center mt-5"> Contact Us</h1>
						<h4 className="mt-3">
							Fill out the form and we'll get back to you within 24 hours.
						</h4>
						<a
							style={{ color: "#3d3d3d" }}
							target="_blank"
							rel="noreferrer"
							href="https://maps.app.goo.gl/zaKNmoRAopMUHWDi9"
						>
							<h6 style={{ color: "#3d3d3d" }} className="ml-3 mt-3 pl-5">
								<i
									className="bi bi-pin-map-fill"
									style={{ color: "#FAD02C", fontSize: "1.5em" }}
								></i>
								DMCC Crypto Centre, 48th Floor, Almas Tower, JLT, UAE PO BOX
								48800.
							</h6>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://t.me/RareFnd"
							style={{ color: "#3d3d3d" }}
						>
							{" "}
							<h6 className="ml-3 pl-5 mt-3" style={{ color: "#3d3d3d" }}>
								{" "}
								<i
									className="bi bi-telegram"
									style={{ color: "#FAD02C", fontSize: "1.5em" }}
								></i>{" "}
								RareFnd Telegram Comunity
							</h6>
						</a>
						<a
							target="_blank"
							rel="noreferrer"
							href="https://twitter.com/rare_fnd"
							style={{ color: "#3d3d3d" }}
						>
							<h6 className="ml-3 pl-5 mt-3 mb-5" style={{ color: "#3d3d3d" }}>
								{" "}
								<i
									className="bi bi-twitter"
									style={{ color: "#FAD02C", fontSize: "1.5em" }}
								></i>{" "}
								RareFnd Twitter Account
							</h6>
						</a>
						<Image
							className="contact_image"
							src={Contact_us}
							style={{
								position: "absolute",
								top: "30%",
								left: "40%",
								width: "400px",
								height: "400px",
							}}
						/>
					</Col>
					<Col md={6}>
						<div
							className="boxcontact"
							style={{
								border: "4px solid #3d3d3d",
								padding: "5%",
							}}
						>
							<Form ref={form} onSubmit={sendEmail}>
								<Form.Label style={{ color: "#3d3d3d" }}>
									Your Full Name
								</Form.Label>
								<Form.Control
									type="text"
									name="user_name"
									placeholder="Ex. william Smith"
								/>
								<Form.Group
									className="mb-3 mt-4"
									controlId="exampleForm.ControlInput1"
								>
									<Form.Label
										className="FormLabel"
										style={{ color: "#3d3d3d" }}
									>
										Your Email Address
									</Form.Label>
									<Form.Control
										type="email"
										name="user_email"
										placeholder="Ex. name@example.com"
									/>
								</Form.Group>
								<Form.Group
									className="mb-3 mt-4"
									controlId="exampleForm.ControlTextarea1"
								>
									<Form.Label style={{ color: "#3d3d3d" }}>
										Your Message
									</Form.Label>
									<Form.Control as="textarea" rows={3} name="message" />
								</Form.Group>
								<div className="col-md-12 text-center">
									<Button
										className="mt-3 text-center mx-auto"
										style={{ fontWeight: "bold", color: "#3d3d3d" }}
										variant="warning"
										type="submit"
									>
										Submit
									</Button>
								</div>
							</Form>
						</div>
					</Col>
				</Row>
			</section>
		</div>
	);
}
