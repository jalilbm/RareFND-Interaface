import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.css";
import MainCard from "./Card.js";
import Container from "react-bootstrap/Container";
import help from "../../assets/carousel/help.jpg";
import star from "../../assets/carousel/star.png";
import binance_card from "../../assets/carousel/binance_card.webp";
import Button from "react-bootstrap/Button";

function HomeCards() {
	return (
		<Container className="pt-5 pb-5">
			<Row>
				<Col lg={12} className="mt-4">
					<MainCard
						image={binance_card}
						title="Key Partnerships"
						text="Key partnerships to be announced with some of the leading names in the industry across the charity space.
            Stay tuned to our socials as some of the biggest partnerships in the crowdfunding space are to be announced, and you have the chance to get involved too!"
						buttonHref="/partnerships"
						buttonText="Learn More"
						imageLeft={false}
						horizontal={true}
					/>
				</Col>
			</Row>
			<hr className="text-light" />
			<Row>
				<Col lg={12} className="mt-4">
					<MainCard
						image={help}
						title="The Only Crowdfunding Platform That Pays You To Crowdfund"
						text="Start crowdfunding with Rare Fnd today and we will give you 10% towards your crowdfunding target!
            Not only that but reach your target quicker with 240% APY on all contributions."
						buttonHref="/offers"
						buttonText="Learn More"
						imageLeft={true}
						horizontal={true}
					/>
				</Col>
			</Row>
			<br />
			<br />
			<hr className="text-light" />
			<br />
			<Row>
				<Col lg={12} className="mt-4">
					<MainCard
						title="Fundraising solution"
						text="Crowdfunding with the speed and flexibility of crypto! We’re the first and only
            platform to offer a cryptocurrency based fundraising program. Contribution
            rewards can be delivered in minutes, not months using our revolutionary NFT
            fractionalization and steganography technology – a first in the cryptocurrency
            and crowdfunding space. Some of your campaign contributors not crypto – savvy?
            No problem! We offer fiat based payments as well using credit and debit cards.
            We’re a true end to end crowdfunding solution!"
						buttonHref="/startproject"
						buttonText="Start Fundraising"
						textStyle={{
							position: "realtive",
							textAlign: "center",
							// marginLeft: "200px"
						}}
					/>
				</Col>
			</Row>
			<br />
			<hr className="text-light" />
			<Row>
				<Col lg={12} className="mt-4">
					<MainCard
						title="The Most Innovative Crowfunding Platform            "
						text="Not only does Rare Fnd help charities and startups reach their full potential quicker, but we also ensure that all donators and contributors are rewarded even in the unlikely event that the crowdfunding campaign was unsuccessful.            "
						// textStyle = {{
						//   marginRight: "200px",
						//   marginLeft: "200px"
						// }}
					/>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col lg={4} className="mt-4">
					<MainCard
						image={star}
						title="Free and more"
						text="It’s not only free to fundraise — but we’ll also help you meet your goal! We’re currently offering campaigns 10% toward their fundraising target. YES, we’re paying you to launch your fundraising campaign on Rare FND!"
						horizontal={false}
						multi_cards={true}
					/>
				</Col>
				<Col lg={4} className="mt-4">
					<MainCard
						image={star}
						title="Incentives"
						text="Your incentives for contribution tiers are embedded in an NFT which can be bought, sold, traded or used. From event tickets to gift cards – It’s easy to deliver. No complications or expense of shipping items which allow you to better fund your project and opens up the usefulness of the reward to a worldwide audience"
						horizontal={false}
						multi_cards={true}
					/>
				</Col>
				<Col lg={4} className="mt-4">
					<MainCard
						image={star}
						title="Safe for investors"
						text="All of the contributions by investors in your campaign are autostaked in our platform. This provides the ultimate in safety for the contributors due to the fact that if a campaign fails to reach its fundraising goal, the funds are returned to the contributor PLUS any staking rewards that were earned during the campaign!"
						horizontal={false}
						multi_cards={true}
					/>
				</Col>
			</Row>
			<br />

			<Row style={{ height: "200px" }} className="mt-4">
				<div
					className="d-flex gap-2 mx-auto"
					style={{ height: "100%", width: "100%" }}
				>
					<Button
						href="https://t.me/RareFnd"
						variant="warning"
						size="lg"
						style={{
							width: "50%",
							fontSize: "3vw",
							fontWeight: "bold",
							textAlign: "center",
							verticalAlign: "middle",
							lineHeight: "200px",
						}}
					>
						Work better, together
					</Button>
					<Button
						href="https://t.me/RareFnd"
						variant="light"
						size="lg"
						style={{
							width: "50%",
							fontSize: "3vw",
							fontWeight: "bold",
							textAlign: "center",
							verticalAlign: "middle",
							lineHeight: "200px",
						}}
					>
						Hire a Rare Fnd Expert
					</Button>
				</div>
			</Row>
			<br />
			<hr className="text-light" />
			<Row>
				<Col lg={12} className="mt-4">
					<MainCard
						title="Our mission: Empower the innovator in all of us"
						text="We want to ensure that the innovators amongst all of us are given the best opportunity to make their ideas a success"
						buttonHref="/startproject"
						buttonText="Start Fundraising"
					/>
				</Col>
			</Row>
		</Container>
	);
}

export default HomeCards;
