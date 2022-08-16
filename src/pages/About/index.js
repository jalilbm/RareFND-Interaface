import CategoryCarousel from "../../components/CategoryCarousel";
import AboutUs from "../../assets/carousel/AboutUs.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Col, Row } from "react-bootstrap";

export default function About() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_afejnhj', 'template_gktw9ca', form.current, 'OHpPnX-MUtF6ELUyq')
      .then((result) => {
          console.log(result.text);
          console.log("message sent succesfully")
      }, (error) => {
          console.log(error.text);
      });
  };
	return (
		<div className="aboutpage">
			<CategoryCarousel image={AboutUs} title="About Us" />
			<section className="quote  text-black mx-auto bg-warning">
				<blockquote>
					It is the long history of humankind (and animal kind, too) those who
					learned to collaborate and improvise most effectively have prevailed.
				</blockquote>
				<figcaption style={{ fontSize: "18px" }}>
					&mdash; Charles Darwin
				</figcaption>
			</section>
			<section
				className="AboutBody bg-white text-black mx-auto"
				style={{ height: "100%" }}
			>
				<div>
					<p>
						RareFnd campaigns make ideas into reality. It’s where creators share
						new visions for creative work with the communities that will come
						together to fund them.
					</p>
					<p>
						Some of these creators, like Critical Role, TLC, and The Smithsonian
						Institution already had huge fanbases. But many projects have been
						as small-scale as a limited run of silent meditation vinyls or as
						up-and-coming as early versions of Issa Rae's Insecure and Phoebe
						Waller-Bridge’s Fleabag.
					</p>
					<p>
						No matter what, creators always control how the work comes
						together—no 100-page grant applications, no donors demanding you
						modify your message, no last-minute edits from investors. When
						backers chip in funding and help spread the word, they too become
						part of these independent works.
					</p>
				</div>
			</section>
			<section className="contact text-light p-5 m-5" id="contacts">
				<Row>
					<Col md={6}>
						<h1 className="contacttitle text-center mt-3"> Contact Us</h1>
						<h4 className="m-3 p-5">
							Fill out the form and we'll get back to you within 24 hours.
						</h4>
						<a target="_blank" href="https://maps.app.goo.gl/zaKNmoRAopMUHWDi9">
							<h6 className="ml-3 pl-5">
								<i
									className="bi bi-pin-map-fill"
									style={{ color: "#FAD02C", fontSize: "1.5em" }}
								></i>
								DMCC Crypto Centre, 48th Floor, Almas Tower, JLT, UAE PO BOX
								48800.
							</h6>
						</a>
						<a target="_blank" href="https://t.me/RareFnd">
							{" "}
							<h6 className="ml-3 pl-5 mt-3">
								{" "}
								<i
									className="bi bi-telegram"
									style={{ color: "#FAD02C", fontSize: "1.5em" }}
								></i>{" "}
								RareFnd Telegram Comunity
							</h6>
						</a>
						<a target="_blank" href="https://twitter.com/rare_fnd">
							<h6 className="ml-3 pl-5 mt-3">
								{" "}
								<i
									className="bi bi-twitter"
									style={{ color: "#FAD02C", fontSize: "1.5em" }}
								></i>{" "}
								RareFnd Twitter Account
							</h6>
						</a>
					</Col>
					<Col md={6}>
						<div
							className="boxcontact text-light"
							style={{
								border: "4px solid #FAD02C",
								padding: "20px",
							}}
						>
              <Form ref={form} onSubmit={sendEmail}>
							<Form.Label className="text-light">User Name</Form.Label>
							<Form.Control type="text" name ="user_name" placeholder="william Smith" />
							<Form.Group
								className="mb-3 mt-4"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label className="text-light">Email Address</Form.Label>
								<Form.Control type="email" name ="user_email" placeholder="name@example.com" />
							</Form.Group>
							<Form.Group
								className="mb-3 mt-4"
								controlId="exampleForm.ControlTextarea1"
							>
								<Form.Label className="text-light">Message</Form.Label>
								<Form.Control as="textarea" rows={3} name="message" />
							</Form.Group>
							<Button
								className="mb-3 mt-3 text-center mx-auto"
								variant="warning"
                type="submit"
          
							>
								Submit
							</Button>
              </Form>
						</div>
					</Col>
				</Row>
			</section>
		</div>
	);
}
