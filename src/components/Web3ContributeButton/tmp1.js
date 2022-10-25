import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext, useMemo } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import token_info from "../../token.json";
import { useParams } from "react-router";
import { ProviderContext } from "../../web3/ProviderContext";
import LoadingSpinner from "../LoadingSpinner";
import {
	formatUsd,
	formatFnd,
	sendTx,
	USDT_DECIMALS,
	popupError,
} from "../../utils/Helpers";
import { TARGET_CHAIN } from "../../utils/Helpers";

var regexp = /^\d+(\.\d{1,18})?$/;

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

let refreshStakingId = 0;

export default function ContributeBtnn(props) {
	const [walletAddress, setWalletAddress] = useState();
	const [chainId, setChainId] = useState();
	const [readyToContribute, setReadyToContribute] = useState();
	const [pending, setPending] = useState(false);
	const [token, setToken] = useState();
	const [staking, setStaking] = useState();
	const [allowance, setAllowance] = useState(0);
	const [finishedTokenInfoUpdate, setFinishedTokenInfoUpdate] = useState(true);
	const [projectData, setProjectData] = useState();
	const [stakingOptions, setStakingOptions] = useState();
	const [stakingData, setStakingData] = useState();
	const [projectLive, setProjectLive] = useState(false);
	const [stakingAddress, setStakingAddress] = useState();
	const [staking_abi, setStaking_abi] = useState();
	const [txHash, setTxHash] = useState(null);
	const { id } = useParams();
	const { provider, setProvider } = useContext(ProviderContext);
	const token_abi = token_info.token_abi;
	const tokenAddress = token_info.token_address;

	const getAllowance = async (token_) => {
		const allownce = await token_.allowance(walletAddress, stakingAddress);
		setAllowance(allownce);
		console.log("hahahahahash", allownce);
		setFinishedTokenInfoUpdate(true);
	};

	const getStakingOptions = async (staking) => {
		const options = await staking.getOptions();
		setStakingOptions(options);
	};

	const getStakingData = async (staking) => {
		const data = await staking.getUserData();
		setStakingData(data);
	};

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BASE_URL + `/api/project/${id}/`)
			.then((response) => {
				setProjectData(response.data);
				setProjectLive(response.data.live);
				setStakingAddress(response.data.staking_address);
				setStaking_abi(JSON.parse(response.data.staking_abi));
			});
	}, []);

	useEffect(() => {
		clearInterval(refreshStakingId);
		refreshStakingId = setInterval(() => {
			if (!!staking) {
				getStakingData(staking);
				getStakingOptions(staking);
			}
		}, 5000);
	}, [staking]);

	useMemo(() => {
		if (provider && stakingAddress && stakingAddress) {
			const signer = provider.getSigner();
			const token_ = new ethers.Contract(tokenAddress, token_abi, signer);
			const staking = new ethers.Contract(stakingAddress, staking_abi, signer);
			setToken(token_);
			setStaking(staking);
			isReadyToContribute();

			getAllowance(token_);
			getStakingOptions(staking);
			getStakingData(staking);
		}
	}, [provider, walletAddress, stakingAddress]);

	async function stake() {
		if (!allowance || allowance <= 0) {
			// popupError("You should first approve before you can pay in FND!");
			// return;
			await approve();
		}
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		if (!regexp.test(contribution_amount)) {
			return alert("Invalid contribution amount");
		} else {
			await isReadyToContribute();
			if (!walletAddress || (walletAddress && chainId !== TARGET_CHAIN)) {
				document.querySelector("#connect-btn").click();
			} else if (walletAddress && chainId === TARGET_CHAIN) {
				try {
					setPending(true);
					const tx = () =>
						staking?.stakeUsd(
							ethers.utils.parseUnits(contribution_amount, USDT_DECIMALS)
						);
					const status = await sendTx(tx, "You have successfully donated!");
					setPending(false);
					if (status.valid) {
						setTxHash(status.hash);
						axios.post(
							process.env.REACT_APP_BASE_URL + "/api/pending_contribution/",
							{
								hash: status.hash,
								project: id,
							}
						);
					}
				} catch (e) {
					setPending(false);
				}
			}
		}
	}

	async function approve() {
		setPending(true);
		const approveTx = () =>
			token?.approve(stakingAddress, ethers.constants.MaxInt256);
		const status = await sendTx(approveTx, "Approved successfully!");
		setPending(false);
		status.valid && setAllowance(ethers.constants.MaxInt256);
	}

	async function claim() {
		setPending(true);
		const tx = () => staking?.claim();
		await sendTx(tx, "You have successfully claimed!");
		setPending(false);
	}

	async function isReadyToContribute() {
		if (!projectLive) {
			setReadyToContribute(false);
			return;
		}
		if (provider && projectLive) {
			setChainId(toHex(provider.network.chainId));
			const accounts = await provider.listAccounts();
			if (accounts) setWalletAddress(accounts[0]);
			if (accounts[0]) {
				setReadyToContribute(true);
			} else {
				setReadyToContribute(false);
			}
		} else {
			setReadyToContribute(false);
		}
	}

	return (
		<div>
			{finishedTokenInfoUpdate ? (
				<div>
					{!!stakingOptions && stakingOptions[6] && (
						<span>
							<div>
								{!!stakingData ? formatFnd(stakingData[0]) : "-"} FND Pending
								Gains
							</div>
							<div>
								{!!stakingData ? formatFnd(stakingData[1]) : "-"} FND Total
								Gains
							</div>
						</span>
					)}
					{!!stakingData && (
						<div>
							${formatUsd(stakingData[3])} Total Contributed (
							{formatFnd(stakingData[2])} FND)
						</div>
					)}
					<div
						className="contribution-details align-self-end text-center w-70 mx-auto"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div
							style={{
								border: "3px solid",
								borderColor: "#FEC008",
								borderRadius: "12px",
								maxWidth: "500px",
							}}
						>
							<Row
								className="mx-auto no-gutters jumbotron d-flex align-items-center"
								style={{ padding: "0 1em 0 1em" }}
							>
								<Col style={{ padding: "0" }}>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<p
											style={{
												padding: "0",
												margin: "0",
												fontSize: "1.5rem",
												borderRight: "1px solid",
												paddingRight: "10px",
												borderColor: "#FEC008",
											}}
										>
											$
										</p>
										<input
											id="contribute-amount"
											placeholder={"100"}
											autoComplete="off"
											type="text"
											pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
											// disabled={!allowance || allowance <= 0}
											style={{
												backgroundColor: "transparent",
												border: "none",
												width: "100%",
												// minWidth: "250px",
												// minHeight: "59px",
												height: "100%",
												fontSize:
													!allowance || allowance <= 0 ? "1 rem" : "1.2rem",
												// color: !allowance || allowance <= 0 ? "red" : "black",
												color: "black",
												fontFamily: "'Kaisei Opti', sans-serif",
												outline: "none",
												paddingLeft: "10px",
											}}
										></input>
									</div>
								</Col>
							</Row>
						</div>
					</div>

					<div
						className="align-self-end text-center w-70 mx-auto"
						style={{
							padding: 5,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Row
							className="mx-auto no-gutters jumbotron d-flex align-items-center"
							style={{
								padding: "0 1em 0 1em",
								width: "100%",
								maxWidth: "500px",
							}}
						>
							<Col className="p-1 w-20" style={{ width: "100%" }}>
								{provider ? (
									<Button
										id="contribute-fnd-btn"
										variant="warning"
										size="lg"
										style={{
											width: "100%",
											fontSize: "1rem",
											maxHeight: "100%",
										}}
										onClick={() =>
											!allowance || allowance <= 0 ? approve() : stake()
										}
										disabled={
											!stakingOptions ||
											!stakingOptions[7] ||
											!readyToContribute ||
											pending
										}
									>
										{!allowance || allowance <= 0
											? "Approve Donation"
											: "Complete Donation"}
									</Button>
								) : (
									<Button
										id="contribute-fnd-btn-2"
										variant="warning"
										size="lg"
										style={{
											width: "100%",
											fontSize: "1rem",
											maxHeight: "100%",
										}}
										onClick={() =>
											document.getElementById("connect-btn").click()
										}
									>
										Approve Donation
									</Button>
								)}
							</Col>
						</Row>
					</div>
					<div
						className="align-self-end text-center w-70 mx-auto"
						style={{
							padding: 5,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Row
							className="mx-auto no-gutters jumbotron d-flex align-items-center"
							style={{
								padding: "0 1em 0 1em",
								width: "100%",
								maxWidth: "500px",
							}}
						>
							<Col className="p-1 w-30" style={{ width: "100%" }}>
								<Button
									id="claim-btn"
									variant="warning"
									size="lg"
									style={{
										width: "100%",
										fontSize: "1rem",
										maxHeight: "100%",
									}}
									onClick={() => claim()}
									disabled={!stakingOptions || !stakingOptions[6]}
								>
									Claim
								</Button>
							</Col>
							<Col className="p-1 w-30" style={{ width: "100%" }}>
								<Button
									id="contribute-usd-btn"
									variant="warning"
									size="lg"
									style={{ width: "100%", fontSize: "1rem", maxHeight: "100%" }}
									// onClick={() => stake()}
									// disabled={
									// 	!stakingOptions ||
									// 	!stakingOptions[7] ||
									// 	!readyToContribute ||
									// 	pending
									// }
									disabled={true}
								>
									Donate by card
								</Button>
								{/* <Button
							id="approve-btn"
							variant="warning"
							size="lg"
							style={{ width: "100%", fontSize: "1rem", maxHeight: "100%" }}
							onClick={
								provider
									? () => approve()
									: () => document.getElementById("connect-btn").click()
							}
							disabled={allowance > 0 || !projectLive || pending}
						>
							{provider ? "Approve" : "Connect Wallet"}
						</Button> */}
							</Col>
						</Row>
					</div>

					{
						txHash && (
							<div
								style={{
									backgroundColor: "#09ce00",
									color: "white",
									height: "50px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<p style={{ margin: "0", padding: "0" }}>
									Transaction Hash:{" "}
									<a
										href={`https://bscscan.com/tx/${txHash}`}
										target="_blank"
										rel="noopener"
									>
										{txHash}
									</a>
								</p>
							</div>
						)

						// <a
						// 	style={{ margin: "0", padding: "0" }}
						// 	href="https://bscscan.com/tx/"
						// >
						// 	"Transaction Hash: " + <a href="https://bscscan.com/tx/">txHash</a>
						// </a>
					}
				</div>
			) : (
				<LoadingSpinner color="#FFC115" />
			)}
		</div>
	);
}
