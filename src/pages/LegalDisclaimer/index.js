import CategoryCarousel from "../../components/CategoryCarousel";
import AboutUs from "../../assets/carousel/AboutUs.jpg";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

export default function Legal() {
	return (
		<div className="aboutpage" style={{ marginBottom: "2%" }}>
			<CategoryCarousel image={AboutUs} title="Legal Disclaimer" />
			<section
				className="AboutBody bg-white text-black mx-auto"
				style={{ height: "100%" }}
			>
				<div style={{ padding: "3vw" }}>
					<h1
						style={{
							color: "#3d3d3d",
							lineHeight: "1.8",
							fontWeight: "500",
						}}
					>
						Please read the entirety of this "Legal Disclaimer" section
						carefully
					</h1>
					<br />
					<p style={{ textIndent: "20px" }}>
						Nothing herein constitutes legal, financial, business or tax advice
						and you are strongly advised to consult your own legal, financial,
						tax or other professional advisor(s) before engaging in any activity
						in connection herewith. Neither ratbits nft marketplace dmcc(the
						<span style={{ fontWeight: "bold" }}> company)</span>, any of the
						project team members (the{" "}
						<span style={{ fontWeight: "bold" }}>rare fnd team</span>) who have
						worked on the rare fnd platform (as defined herein) or project to
						develop the rare fnd platform in any way whatsoever, any
						distributor/vendor of $fnd tokens (the{" "}
						<span style={{ fontWeight: "bold" }}>distributor</span>), nor any
						service provider shall be liable for any kind of direct or indirect
						damage or loss whatsoever which you may suffer in connection with
						accessing the paper, deck or material relating to $fnd (the{" "}
						<span style={{ fontWeight: "bold" }}>token documentation</span>)
						available on the website at{" "}
						<Link to="/" style={{ fontWeight: "bold", color: "green" }}>
							{" "}
							https://rarefnd.com/
						</Link>
						(the <span style={{ fontWeight: "bold" }}>website</span>, including
						any sub-domains thereon) or any other websites or materials
						published by the company from time to time.
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
							Project purpose:
						</span>{" "}
						You agree that you are acquiring $FND to participate in the Rare Fnd
						platform and to obtain services on the ecosystem thereon. The
						Company, the Distributor and their respective affiliates would
						develop and contribute to the underlying source code for the Rare
						Fnd platform. The Company is acting solely as an arms’ length third
						party in relation to the $FND distribution, and not in the capacity
						as a financial advisor or fiduciary of any person with regard to the
						distribution of $FND.
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
							Nature of the Token Documentation:
						</span>{" "}
						The Token Documentation is a conceptual paper that articulates some
						of the main design principles and ideas for the creation of a
						digital token to be known as $FND. The Token Documentation and the
						Website are intended for general informational purposes only and do
						not constitute a prospectus, an offer document, an offer of
						securities, a solicitation for investment, any offer to sell any
						product, item, or asset (whether digital or otherwise), or any offer
						to engage in business with any external individual or entity
						provided in said documentation. The information herein may not be
						exhaustive and does not imply any element of, or solicit in any way,
						a legally-binding or contractual relationship. There is no assurance
						as to the accuracy or completeness of such information and no
						representation, warranty or undertaking is or purported to be
						provided as to the accuracy or completeness of such information.
						Where the Token Documentation or the Website includes information
						that has been obtained from third party sources, the Company, the
						Distributor, their respective affiliates and/or the Rare Fnd team
						have not independently verified the accuracy or completeness of such
						information. Further, you acknowledge that the project development
						roadmap, platform/network functionality are subject to change and
						that the Token Documentation or the Website may become outdated as a
						result; and neither the Company nor the Distributor is under any
						obligation to update or correct this document in connection
						therewith.
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
							Validity of Token Documentation and Website:
						</span>{" "}
						Nothing in the Token Documentation or the Website constitutes any
						offer by the Company, the Distributor, or the Rare Fnd team to sell
						any $FND (as defined herein) nor shall it or any part of it nor the
						fact of its presentation form the basis of, or be relied upon in
						connection with, any contract or investment decision. Nothing
						contained in the Token Documentation or the Website is or may be
						relied upon as a promise, representation or undertaking as to the
						future performance of the Rare Fnd platform. The agreement between
						the Distributor (or any third party) and you, in relation to any
						distribution or transfer of $FND, is to be governed only by the
						separate terms and conditions of such agreement.
					</p>
					<p>
						The information set out in the Token Documentation and the Website
						is for community discussion only and is not legally binding. No
						person is bound to enter into any contract or binding legal
						commitment in relation to the acquisition of $FND, and no digital
						asset or other form of payment is to be accepted on the basis of the
						Token Documentation or the Website. The agreement for distribution
						of $FND and/or continued holding of $FND shall be governed by a
						separate set of Terms and Conditions or Token Distribution Agreement
						(as the case may be) setting out the terms of such distribution
						and/or continued holding of $FND (the Terms and Conditions), which
						shall be separately provided to you or made available on the
						Website. The Terms and Conditions must be read together with the
						Token Documentation. In the event of any inconsistencies between the
						Terms and Conditions and the Token Documentation or the Website, the
						Terms and Conditions shall prevail.
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
							$FND tokens:
						</span>{" "}
						The native cryptographically-secure fungible protocol token of the
						Rare Fnd platform (ticker symbol{" "}
						<span style={{ fontWeight: "bold" }}>$FND</span>) is a transferable
						representation of attributed utility functions specified in the
						protocol/code of the Rare Fnd platform, and which is designed to be
						used solely as an interoperable utility token thereon.
					</p>
					<p>
						$FND is a functional multi-utility token which will be used as the
						medium of exchange between participants on the Rare Fnd platform in
						a decentralised manner. The goal of introducing $FND is to provide a
						convenient and secure mode of payment and settlement between
						participants who interact within the ecosystem on the Rare Fnd
						platform without any intermediaries such as centralised third party
						entity/institution/credit. It is not, and not intended to be, a
						medium of exchange accepted by the public (or a section of the
						public) as payment for goods or services or for the discharge of a
						debt; nor is it designed or intended to be used by any person as
						payment for any goods or services whatsoever that are not
						exclusively provided by the issuer. $FND does not in any way
						represent any shareholding, participation, right, title, or interest
						in the Company, the Distributor, their respective affiliates, or any
						other company, enterprise or undertaking, nor will $FND entitle
						token holders to any promise of fees, dividends, revenue, profits or
						investment returns, and are not intended to constitute securities in
						Singapore or any relevant jurisdiction. $FND may only be utilised on
						the Rare Fnd platform, and ownership of the same carries no rights,
						express or implied, other than the right to use $FND as a means to
						enable usage of and interaction within the Rare Fnd platform. The
						secondary market pricing of $FND is not dependent on the effort of
						the Rare Fnd team, and there is no token functionality or scheme
						designed to control or manipulate such secondary pricing.
					</p>
					<p>
						Further, $FND provides the economic incentives which will be
						distributed to encourage users to exert efforts towards contribution
						and participation in the ecosystem on the Rare Fnd platform, thereby
						creating a mutually beneficial system where every participant is
						fairly compensated for its efforts. $FND are an integral and
						indispensable part of the Rare Fnd platform, because without $FND,
						there would be no incentive for users to expend resources to
						participate in activities or provide services for the benefit of the
						entire ecosystem on the Rare Fnd platform. Given that additional
						$FND will be awarded to a user based only on its actual usage,
						activity and efforts made on the Rare Fnd platform and/or
						proportionate to the frequency and volume of transactions, users of
						the Rare Fnd platform and/or holders of $FND which did not actively
						participate will not receive any $FND incentives.
					</p>
					<p>
						$FND has the following specific features:
						<ol className="alpha">
							<li>
								<span style={{ fontWeight: "normal" }}>
									As the native platform currency, all contributions to projects
									or charities can only be made in the native token of FND.
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									Once contributed, the FND is automatically staked as a
									security deposit/guarantee of commitment, motivating the
									project to hit their target quicker (or if the project fails,
									contributions are refunded).
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									As an incentive to encourage user participation, users would
									receive additional $FND rewards for contributing to projects.
								</span>
							</li>
						</ol>
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
							Deemed Representations and Warranties:
						</span>{" "}
						By accessing the Token Documentation or the Website (or any part
						thereof), you shall be deemed to represent and warrant to the
						Company, the Distributor, their respective affiliates, and the Rare
						Fnd team as follows:
						<ol className="alpha">
							<li>
								<span style={{ fontWeight: "normal" }}>
									in any decision to acquire any $FND, you have not relied on
									and shall not rely on any statement set out in the Token
									Documentation or the Website;
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									you will and shall at your own expense ensure compliance with
									all laws, regulatory requirements and restrictions applicable
									to you (as the case may be);
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									you acknowledge, understand and agree that $FND may have no
									value, there is no guarantee or representation of value or
									liquidity for $FND, and $FND is not an investment product nor
									is it intended for any speculative investment whatsoever;
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									none of the Company, the Distributor, their respective
									affiliates, and/or the Rare Fnd team members shall be
									responsible for or liable for the value of $FND, the
									transferability and/or liquidity of $FND and/or the
									availability of any market for $FND through third parties or
									otherwise;
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									you acknowledge, understand and agree that you are not
									eligible to participate in the distribution of $FND if you are
									a citizen, national, resident (tax or otherwise), domiciliary
									and/or green card holder of a geographic area or country (i)
									where it is likely that the distribution of $FND would be
									construed as the sale of a security (howsoever named),
									financial service or investment product and/or (ii) where
									participation in token distributions is prohibited by
									applicable law, decree, regulation, treaty, or administrative
									act (including without limitation the United States of
									America, Canada, and the People's Republic of China); and to
									this effect you agree to provide all such identity
									verification document when requested in order for the relevant
									checks to be carried out.
								</span>
							</li>
						</ol>
					</p>
					<p>
						The Company, the Distributor and the Rare Fnd team do not and do not
						purport to make, and hereby disclaims, all representations,
						warranties or undertaking to any entity or person (including without
						limitation warranties as to the accuracy, completeness, timeliness,
						or reliability of the contents of the Token Documentation or the
						Website, or any other materials published by the Company or the
						Distributor). To the maximum extent permitted by law, the Company,
						the Distributor, their respective affiliates and service providers
						shall not be liable for any indirect, special, incidental,
						consequential or other losses of any kind, in tort, contract or
						otherwise (including, without limitation, any liability arising from
						default or negligence on the part of any of them, or any loss of
						revenue, income or profits, and loss of use or data) arising from
						the use of the Token Documentation or the Website, or any other
						materials published, or its contents (including without limitation
						any errors or omissions) or otherwise arising in connection with the
						same. Prospective acquirors of $FND should carefully consider and
						evaluate all risks and uncertainties (including financial and legal
						risks and uncertainties) associated with the distribution of $FND,
						the Company, the Distributor and the Rare Fnd team.
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
							$FND Token:
						</span>{" "}
						$FND are designed to be utilised, and that is the goal of the $FND
						distribution. In particular, it is highlighted that $FND:
						<ol className="alpha">
							<li>
								<span style={{ fontWeight: "normal" }}>
									does not have any tangible or physical manifestation, and does
									not have any intrinsic value (nor does any person make any
									representation or give any commitment as to its value);
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									is non-refundable and cannot be exchanged for cash (or its
									equivalent value in any other digital asset) or any payment
									obligation by the Company, the Distributor or any of their
									respective affiliates;
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									does not represent or confer on the token holder any right of
									any form with respect to the Company, the Distributor (or any
									of their respective affiliates), or their revenues or assets,
									including without limitation any right to receive future
									dividends, revenue, shares, ownership right or stake, share or
									security, any voting, distribution, redemption, liquidation,
									proprietary (including all forms of intellectual property or
									licence rights), right to receive accounts, financial
									statements or other financial data, the right to requisition
									or participate in shareholder meetings, the right to nominate
									a director, or other financial or legal rights or equivalent
									rights, or intellectual property rights or any other form of
									participation in or relating to the Rare Fnd platform, the
									Company, the Distributor and/or their service providers;
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									is not intended to represent any rights under a contract for
									differences or under any other contract the purpose or
									pretended purpose of which is to secure a profit or avoid a
									loss;
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									is not intended to be a representation of money (including
									electronic money), security, commodity, bond, debt instrument,
									unit in a collective investment scheme or any other kind of
									financial instrument or investment;
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									is not a loan to the Company, the Distributor or any of their
									respective affiliates, is not intended to represent a debt
									owed by the Company, the Distributor or any of their
									respective affiliates, and there is no expectation of profit;
								</span>
							</li>
							<li>
								<span style={{ fontWeight: "normal" }}>
									does not provide the token holder with any ownership or other
									interest in the Company, the Distributor or any of their
									respective affiliates.{" "}
								</span>
							</li>
						</ol>
					</p>
					<p>
						Notwithstanding the $FND distribution, users have no economic or
						legal right over or beneficial interest in the assets of the
						Company, the Distributor, or any of their affiliates after the token
						distribution.
					</p>
					<p>
						To the extent a secondary market or exchange for trading $FND does
						develop, it would be run and operated wholly independently of the
						Company, the Distributor, the distribution of $FND and the Rare Fnd
						platform. Neither the Company nor the Distributor will create such
						secondary markets nor will either entity act as an exchange for
						$FND.
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
							Informational purposes only:
						</span>{" "}
						The information set out herein is only conceptual, and describes the
						future development goals for the Rare Fnd platform to be developed.
						In particular, the project roadmap in the Token Documentation is
						being shared in order to outline some of the plans of the Rare Fnd
						team, and is provided solely for{" "}
						<span style={{ fontWeight: "bold" }}>INFORMATIONAL PURPOSES</span>{" "}
						and does not constitute any binding commitment. Please do not rely
						on this information in deciding whether to participate in the token
						distribution because ultimately, the development, release, and
						timing of any products, features or functionality remains at the
						sole discretion of the Company, the Distributor or their respective
						affiliates, and is subject to change. Further, the Token
						Documentation or the Website may be amended or replaced from time to
						time. There are no obligations to update the Token Documentation or
						the Website, or to provide recipients with access to any information
						beyond what is provided herein.
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
							Regulatory approval:
						</span>{" "}
						No regulatory authority has examined or approved, whether formally
						or informally, any of the information set out in the Token
						Documentation or the Website. No such action or assurance has been
						or will be taken under the laws, regulatory requirements or rules of
						any jurisdiction. The publication, distribution or dissemination of
						the Token Documentation or the Website does not imply that the
						applicable laws, regulatory requirements or rules have been complied
						with.
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
							Cautionary Note on forward-looking statements:
						</span>{" "}
						All statements contained herein, statements made in press releases
						or in any place accessible by the public and oral statements that
						may be made by the Company, the Distributor and/or the Rare Fnd
						team, may constitute forward-looking statements (including
						statements regarding the intent, belief or current expectations with
						respect to market conditions, business strategy and plans, financial
						condition, specific provisions and risk management practices). You
						are cautioned not to place undue reliance on these forward-looking
						statements given that these statements involve known and unknown
						risks, uncertainties and other factors that may cause the actual
						future results to be materially different from that described by
						such forward-looking statements, and no independent third party has
						reviewed the reasonableness of any such statements or assumptions.
						These forward-looking statements are applicable only as of the date
						indicated in the Token Documentation, and the Company, the
						Distributor as well as the Rare Fnd team expressly disclaim any
						responsibility (whether express or implied) to release any revisions
						to these forward-looking statements to reflect events after such
						date.
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
							References to companies and platforms:
						</span>{" "}
						The use of any company and/or platform names or trademarks herein
						(save for those which relate to the Company, the Distributor or
						their respective affiliates) does not imply any affiliation with, or
						endorsement by, any third party. References in the Token
						Documentation or the Website to specific companies and platforms are
						for illustrative purposes only.
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
							English language:
						</span>{" "}
						The Token Documentation and the Website may be translated into a
						language other than English for reference purpose only and in the
						event of conflict or ambiguity between the English language version
						and translated versions of the Token Documentation or the Website,
						the English language versions shall prevail. You acknowledge that
						you have read and understood the English language version of the
						Token Documentation and the Website.
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
							No Distribution:
						</span>{" "}
						No part of the Token Documentation or the Website is to be copied,
						reproduced, distributed or disseminated in any way without the prior
						written consent of the Company or the Distributor. By attending any
						presentation on this Token Documentation or by accepting any hard or
						soft copy of the Token Documentation, you agree to be bound by the
						foregoing limitations.
					</p>
				</div>
			</section>
		</div>
	);
}
