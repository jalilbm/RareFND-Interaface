import Carousel from "react-bootstrap/Carousel";
import main from "../../assets/carousel/main.jpeg";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function HomeCarousel() {
	return (
		<Carousel fade controls={false} indicators={false}>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src={main}
					alt="Third slide"
					style={{
						height: "92vh",
						minHeight: "600px",
						objectFit: "cover",
					}}
				/>

				<Carousel.Caption
					className="top-caption"
					style={{ position: "absolute", top: "80px" }}
				>
					<h1 className="display-1" style={{ fontFamily: "'Cinzel', serif" }}>
						Rare Find then Fund
					</h1>
					<br />
					<br />
					<h4>
						The only crowdfunding platform that pays YOU to start your
						fundraising journey! For a limited time only kickstart your campaign
						with 10% completely free to help your reach your target!
					</h4>
					<br />
					<br />
					<br />
					<Button  variant="warning" to="/signup" size="lg">
						Sign Up - It's FREE
					</Button>
					<br />
					<p>
						or, <Link to="/start-project">Start a project!</Link>
					</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
}
