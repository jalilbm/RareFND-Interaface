import CategoryCarousel from "../../components/CategoryCarousel";
import legalPapersCover from "../../assets/carousel/legal-papers.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

export default function PrivacyPolicy() {
	return (
		<div className="aboutpage" style={{ marginBottom: "2%" }}>
			<CategoryCarousel image={legalPapersCover} title="Privacy Policy" />
			<section
				className="AboutBody bg-white text-black mx-auto"
				style={{ height: "100%" }}
			>
				<div style={{ padding: "3vw" }}>
					<p style={{ textIndent: "20px" }}>
						At Rare FND Limited (“Rare FND”), we take your privacy seriously.
						This Privacy Policy (“Policy”) describes how Rare FND collects,
						uses, discloses, transfers, stores, retains, or otherwise processes
						any Personal Data received from you when sign up for or use any of
						our donation services or our various other products (collectively,
						“Services”).
					</p>
					<h1
						style={{
							color: "#3d3d3d",
							fontSize: "18px",
							fontWeight: "bold",
						}}
					>
						Please read this Policy carefully. By accessing, browsing or using
						our website or Services, you confirm that you have read, understand
						and agree to the terms of this Privacy Policy.
					</h1>
					<br />
					<p style={{ textIndent: "20px" }}>
						As used in this Privacy Policy, “Personal Data” means any
						information that identifies or relates to a particular individual,
						and includes information referred to as “personally identifiable
						information” or “personal information” under applicable data privacy
						laws, rules or regulations. This Privacy Policy does not cover the
						practices of companies we don’t own or control or people we don’t
						manage.
					</p>
					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							Personal Data:
						</span>{" "}
						<br />
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "16px",
							}}
						>
							Personal Data We Collect
						</span>
						<br />
						In order for you to create an account on Rare FND and use our
						Services, we need to collect and process certain information.
						Depending on your use of the Services, that may include:
						<br />
						<ul>
							<li>
								Information you provide by completing forms on Rare FND — your
								name, email and postal addresses, telephone number, country of
								residence, login, and password details. We may ask for this
								information if you register as a user of the Services, subscribe
								to our newsletters, upload or submit content through Rare FND,
								or if you contact us;
							</li>
							<li>
								Information you provide for identity verification purposes when
								launching a project, including your legal name, business name,
								company registration and Tax ID for business entities, and date
								of birth. In some cases, our payment processor will request that
								you provide a secure upload of an identity document (such as
								your passport, drivers license or other government-issued ID) to
								Rare FND;
							</li>
							<li>
								Details of any requests or transactions you make through the
								Services. Rare FND partners with other companies (such as
								Moonpay) for payment processing, and the payment information you
								submit is collected and used by them in accordance with their
								privacy policies (read Moonpay's privacy policy). Rare FND
								doesn’t store your payment information apart from the last four
								digits of your credit card or bank account (as applicable),
								expiration date, and country, which we require for tax,
								government regulatory, and security purposes;
							</li>
							<li>
								Information about your activity on and interaction with Rare
								FND, including use of our mobile apps (such as your IP address,
								the type of device or browser you use, and your actions on the
								Site);
							</li>
							<li>
								Information about the ways people visit and interact with our
								Site, in the form of traffic analytics.
							</li>
							<li>
								Information necessary for using Google Maps features and
								content; use of Google Maps features and content is subject to
								current versions of: (1){" "}
								<a
									target="_blank"
									rel="noreferrer"
									href="https://maps.google.com/help/terms_maps"
								>
									Google Maps/Google Earth Additional Terms of Service;
								</a>{" "}
								and (2){" "}
								<a
									target="_blank"
									rel="noreferrer"
									href="https://www.google.com/policies/privacy/"
								>
									Google Privacy Policy
								</a>
								;
							</li>
							<li>
								Communications you send to us (for example, when you ask for
								support, send us questions or comments, or report a problem);
							</li>
							<li>
								Information that you submit on or to Rare FND in the form of
								comments, contributions to discussions, or messages to other
								users; and
							</li>
							<li>
								The email address associated with your Facebook account, if you
								choose to sign up using your Facebook credentials. Rare FND will
								also request permission to access your name, profile picture,
								and friend list (these permissions are governed by Facebook’s
								privacy policies and can be managed through your Facebook
								privacy settings). We never post anything to your Facebook,
								Twitter, or other third-party accounts without your permission.
							</li>
							<li>
								Demographic information—such as your age, gender identity,
								sexual orientation, race, and ethnicity—that you have the option
								to provide to us after giving your consent to the processing of
								those personal data in order to help Rare FND equitably support
								all creators and represent a diverse population in our research.
								This category includes data that may qualify as protected
								classifications under other California, federal, or other
								applicable laws.
							</li>
							<li>
								Your wallet address should you choose to make a payment using
								FND tokens.{" "}
							</li>
						</ul>
						<p>
							You may decline to provide us with your information. However, this
							will limit your ability to register for an account or use our
							Services. You may donate or contribute to a project as a guest by
							providing only your wallet address. However, to adjust your
							amount, save payment details for future payments, make project
							comments and take most other actions on our Site, you will need to
							create an account. You may review, change or remove your
							information through your account settings.
						</p>
					</p>
					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							How We Use Your Information:
						</span>
						<br />
						<span>
							We collect your Personal Data for purposes consistent with our
							provision of the Services, including the following:
						</span>
						<br />
						<ul>
							<li>Providing, Customizing and Improving the Services</li>
							<li>Creating and managing your account or other user profiles</li>
							<li>Processing orders or other transactions; billing</li>
							<li>
								Providing you with the products, services or information you
								request
							</li>
							<li>
								Meeting or fulfilling the reason you provided the information to
								us
							</li>
							<li>Providing support and assistance for the Services</li>
							<li>
								Personalizing the Services, website content and communications
								based on your preferences
							</li>
							<li>Doing fraud protection, security and debugging</li>
							<li>
								Carrying out other business purposes that we communicate to you
								at the point that we collect your Personal Data consistent with
								applicable law
							</li>
							<li>
								Marketing and selling the Services to you, including through the
								use of interest-based or online behavioral advertising
							</li>
							<li>Corresponding with You about the Services</li>
							<li>
								Fulfilling our legal obligations under applicable law,
								regulation, court order or other legal process, such as
								preventing, detecting and investigating security incidents and
								potentially illegal or prohibited activities
							</li>
							<li>
								Protecting the rights, property or safety of you, Rare FND or
								another party
							</li>
							<li>Enforcing any agreements with you</li>
							<li>
								Responding to claims that any posting or other content violates
								third-party rights
							</li>
							<li>Resolving disputes</li>
						</ul>
					</p>
					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							How We Share Your Personal Data:
						</span>
						<br />
						We do not sell, share, or disclose Personal Information about our
						users and visitors to outside companies. This includes but is not
						limited to advertisers and sponsors on the Site, unless you give
						explicit permission.
						<br />
						We may disclose user Personal and Non-Personal Information if:
						<ul>
							<li>
								We are required to do so by law or regulation, search warrant,
								subpoena or court order, or to a third-party to which ownership
								of Company, and/or the Site is transferred via an acquisition,
								merger, sale of assets or otherwise, or are compelled to do so
								on good faith belief that such action is necessary to conform or
								comply with any legal, regulatory, law enforcement, or similar
								requirement for investigation.
							</li>
							<li>
								To protect or defend the rights of Company, or any user of the
								Site.
							</li>
						</ul>
					</p>
					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							Data Security and Retention:
						</span>
						<br />
						We seek to protect your Personal Data from unauthorized access, use
						and disclosure using appropriate physical, technical, organizational
						and administrative security measures based on the type of Personal
						Data and how we are processing that data. You should also help
						protect your data by appropriately selecting and protecting your
						password and/or other sign-on mechanism; limiting access to your
						computer or device and browser; and signing off after you have
						finished accessing your account. Although we work to protect the
						security of your account and other data that we hold in our records,
						please be aware that no method of transmitting data over the
						internet or storing data is completely secure.
					</p>
					<p>
						We retain Personal Data about you for as long as you have an open
						account with us or as otherwise necessary to provide you with our
						Services. In some cases we retain Personal Data for longer, if doing
						so is necessary to comply with our legal obligations, resolve
						disputes or collect fees owed, or is otherwise permitted or required
						by applicable law, rule or regulation. We may further retain
						information in a de-identified, anonymous, or aggregated form.
					</p>

					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							California Resident Rights:
						</span>
						<br /> In accordance with California privacy rights, residents may
						request further information as to the exact type of personal
						information that we share with third parties or corporate
						affiliates. If you would like a copy of this notice, send an email
						to help@rarefnd.com with the subject of “CALIFORNIA PRIVACY RIGHTS.”
					</p>
					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							UK and European Union Users:
						</span>
						<br />
						As a UK or EU citizen or resident, you are entitled to the
						following:
						<ul>
							<li>
								The right to access—You have the right to request copies of your
								Personal Information.
							</li>
							<li>
								The right to rectification—You have the right to request that
								any Personal Information you believe is inaccurate be corrected,
								and request that any incomplete Personal Information be
								completed.{" "}
							</li>
							<li>
								The right to erasure—You have the right to request that your
								Personal Information be erased under certain conditions.
							</li>
							<li>
								The right to restrict processing—You have the right to request
								that the processing of your Personal Information be restricted
								under certain conditions.
							</li>
							<li>
								The right to object to processing—You have the right object to
								the processing of your Personal Information be restricted under
								certain conditions.
							</li>
							<li>
								The right to data portability—You have the right to request that
								your Personal Information be transferred to another
								organization, or directly to you, under certain conditions.
							</li>
						</ul>
						<span>
							We rely on Standard Contractual Clauses, legitimate interests, or
							your consent, for the lawful transfer of Personal Data from the UK
							or the EU to the U.S. or U.A.E.
						</span>
						<br />
						<span>
							If you have an unresolved privacy or data use concern that we have
							not addressed satisfactorily, please contact our DPA Dispute
							Resolution and Enforcement center at the following location:
							<a
								target="_blank"
								rel="noreferrer"
								href="https://www.privacyshield.gov/assistance"
							>
								https://www.privacyshield.gov/assistance.
							</a>
						</span>
						<br />
						<span>
							If you wish to enquire further about the safeguards we use, please
							contact us using the details set out at the end of this Privacy
							Policy.
						</span>
					</p>

					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							Transfers of Personal Data:
						</span>
						<br />
						The Services are hosted and operated in the United States (“U.S.”),
						United Arab Emirates (“U.A.E.”), and United Kingdom (U.K.) through
						Rare FND and its service providers, and if you do not reside in
						these regions the law may differ from the laws where you reside. By
						using the Services, you acknowledge that any Personal Data about
						you, regardless of whether provided by you or obtained from a third
						party, is being provided to Rare FND in these countries and will be
						hosted on these servers, and you authorize Rare FND to transfer,
						store and process your information to and in the U.S., U.A.E., and
						possibly other countries, including in U.K.
					</p>
					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							Children:
						</span>
						<br />
						People under 18 (or the legal age in your jurisdiction) are not
						permitted to use Rare FND on their own. Rare FND does not knowingly
						collect any personal information from children under the age of 16
						and children under 16 are not permitted to register for an account
						or use our Services.
					</p>
					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							Changes to this Privacy Policy:
						</span>
						<br />
						We’re constantly trying to improve our Services, so we may change
						this Privacy Policy from time to time. When we change the policy in
						a material way, a notice will be posted on our website along with
						the updated Privacy Policy.
					</p>
					<p>
						<span
							style={{
								fontWeight: "bold",
								color: "black",
								fontSize: "18px",
								textDecoration: "underline",
							}}
						>
							Contact Information:
						</span>
						<br />
						If you have any questions or comments about this Privacy Policy, the
						ways in which we collect and use your Personal Data or your choices
						and rights regarding such collection and use, please do not hesitate
						to contact us at:
						<ul>
							<li>
								<a target="_blank" rel="noreferrer" href="https://rarefnd.com">
									https://rarefnd.com
								</a>
							</li>
							<li>privacy@rarefnd.com</li>
						</ul>
						Effective Date: August 1, 2022
					</p>
				</div>
			</section>
		</div>
	);
}
