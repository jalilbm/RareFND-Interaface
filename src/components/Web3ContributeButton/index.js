// import Button from "react-bootstrap/Button";
// import { ethers } from "ethers";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState, useEffect, useContext, useMemo } from "react";
// import Row from "react-bootstrap/esm/Row";
// import Col from "react-bootstrap/esm/Col";
// import axios from "axios";
// import token_info from "../../token.json";
// import { useParams } from "react-router";
// import { ProviderContext } from "../../web3/ProviderContext";
// import LoadingSpinner from "../LoadingSpinner";
// import {
// 	formatUsd,
// 	formatUsdInput,
// 	formatFnd,
// 	sendTx,
// 	USDT_DECIMALS,
// 	popupError,
// 	popupInfo,
// 	switchNetwork,
// } from "../../utils/Helpers";
// import { TARGET_CHAIN } from "../../utils/Helpers";

// var regexp = /^\d+(\.\d{1,18})?$/;

// const toHex = (num) => {
// 	const val = Number(num);
// 	return "0x" + val.toString(16);
// };

// let refreshStakingId = 0;

// export default function ContributeBtn(props) {
// 	const [walletAddress, setWalletAddress] = useState();
// 	const [chainId, setChainId] = useState();
// 	const [readyToContribute, setReadyToContribute] = useState();
// 	const [pending, setPending] = useState(false);
// 	const [token, setToken] = useState();
// 	const [staking, setStaking] = useState();
// 	const [allowance, setAllowance] = useState(0);
// 	const [finishedTokenInfoUpdate, setFinishedTokenInfoUpdate] = useState(true);
// 	const [projectData, setProjectData] = useState();
// 	const [stakingOptions, setStakingOptions] = useState();
// 	const [stakingData, setStakingData] = useState();
// 	const [projectLive, setProjectLive] = useState(false);
// 	const [stakingAddress, setStakingAddress] = useState();
// 	const [staking_abi, setStaking_abi] = useState();
// 	const [balance, setBalance] = useState(0);
// 	const [usdBalance, setUsdBalance] = useState(0);
// 	const [txHash, setTxHash] = useState(null);
// 	const { id } = useParams();
// 	const { provider, setProvider } = useContext(ProviderContext);
// 	const token_abi = token_info.token_abi;
// 	const tokenAddress = token_info.token_address;

// 	const getAllowance = async (token_) => {
// 		const allownce = await token_.allowance(walletAddress, stakingAddress);
// 		setAllowance(allownce);
// 	};

// 	const getTokenBalance = async () => {
// 		const data = await token.balanceOf(walletAddress);
// 		const usd = await staking.fndToUsd(data);
// 		setBalance(data);
// 		setUsdBalance(usd);
// 	};

// 	const getStakingOptions = async (staking) => {
// 		const options = await staking.getOptions();
// 		setStakingOptions(options);
// 		setFinishedTokenInfoUpdate(true);
// 	};

// 	const getStakingData = async (staking) => {
// 		const data = await staking.getUserData();
// 		setStakingData(data);
// 	};

// 	useEffect(() => {
// 		axios
// 			.get(process.env.REACT_APP_BASE_URL + `/api/project/${props.projectId}/`)
// 			.then((response) => {
// 				setProjectData(response.data);
// 				setProjectLive(response.data.live);
// 				setStakingAddress(response.data.staking_address);
// 				setStaking_abi(JSON.parse(response.data.staking_abi));
// 			});
// 	}, []);

// 	useEffect(() => {
// 		clearInterval(refreshStakingId);
// 		refreshStakingId = setInterval(() => {
// 			if (!!staking) {
// 				getStakingData(staking);
// 				getStakingOptions(staking);
// 			}
// 			if (!!walletAddress) {
// 				getTokenBalance();
// 			}
// 		}, 5000);
// 	}, [staking]);

// 	useMemo(() => {
// 		if (provider && stakingAddress) {
// 			const signer = provider.getSigner();
// 			const token_ = new ethers.Contract(tokenAddress, token_abi, signer);
// 			const staking = new ethers.Contract(stakingAddress, staking_abi, signer);
// 			setToken(token_);
// 			setStaking(staking);
// 			isReadyToContribute();

// 			getAllowance(token_);
// 			getStakingOptions(staking);
// 			getStakingData(staking);
// 		}
// 	}, [provider, walletAddress, stakingAddress]);

// 	async function stake() {
// 		if (!allowance || allowance.lte(0)) {
// 			popupInfo(
// 				"Please approve 2x transactions in your wallet to complete your donation!"
// 			);
// 			const approvalStatus = await approve();
// 			if (!approvalStatus) {
// 				// popupError("You need to first approve the payment!");
// 				return;
// 			}
// 		}
// 		let contribution_amount =
// 			document.getElementById("contribute-amount").value;
// 		if (!regexp.test(contribution_amount)) {
// 			return alert("Invalid contribution amount");
// 		} else {
// 			await isReadyToContribute();
// 			if (!walletAddress || (walletAddress && chainId !== TARGET_CHAIN)) {
// 				document.querySelector("#connect-btn").click();
// 			} else if (walletAddress && chainId === TARGET_CHAIN) {
// 				try {
// 					setPending(true);
// 					const tx = () =>
// 						staking?.stakeUsd(
// 							ethers.utils.parseUnits(contribution_amount, USDT_DECIMALS)
// 						);
// 					const status = await sendTx(tx, "You have successfully donated!");
// 					setPending(false);
// 					if (status.valid) {
// 						setTxHash(status.hash);
// 						axios.post(
// 							process.env.REACT_APP_BASE_URL + "/api/pending_contribution/",
// 							{
// 								hash: status.hash,
// 								project: id,
// 							}
// 						);
// 					}
// 				} catch (e) {
// 					setPending(false);
// 				}
// 			}
// 		}
// 	}

// 	async function approve() {
// 		setPending(true);
// 		const approveTx = () =>
// 			token?.approve(stakingAddress, ethers.constants.MaxInt256);
// 		const status = await sendTx(approveTx, "Approved successfully!");
// 		setPending(false);
// 		status.valid && setAllowance(ethers.constants.MaxInt256);
// 		return status;
// 	}

// 	function setInputValue(usdAmount) {
// 		document.getElementById("contribute-amount").value =
// 			formatUsdInput(usdAmount);
// 	}

// 	async function claim() {
// 		setPending(true);
// 		const tx = () => staking?.claim();
// 		await sendTx(tx, "You have successfully claimed!");
// 		setPending(false);
// 	}

// 	async function isReadyToContribute() {
// 		if (!projectLive) {
// 			setReadyToContribute(false);
// 			return;
// 		}
// 		if (provider && projectLive) {
// 			setChainId(toHex(provider.network.chainId));
// 			const accounts = await provider.listAccounts();
// 			if (accounts) setWalletAddress(accounts[0]);
// 			if (accounts[0]) {
// 				setReadyToContribute(true);
// 			} else {
// 				setReadyToContribute(false);
// 			}
// 		} else {
// 			setReadyToContribute(false);
// 		}
// 	}

// 	return (
// 		<div>
// 			{!!walletAddress && (
// 				<div>
// 					Balance | {formatFnd(balance)} FND (${formatUsd(usdBalance || 0)})
// 				</div>
// 			)}
// 			{finishedTokenInfoUpdate ? (
// 				<div>
// 					{!!stakingOptions && stakingOptions[6] && (
// 						<span>
// 							<div>
// 								{!!stakingData ? formatFnd(stakingData[0]) : "-"} FND Pending
// 								Gains
// 							</div>
// 							<div>
// 								{!!stakingData ? formatFnd(stakingData[1]) : "-"} FND Total
// 								Gains
// 							</div>
// 						</span>
// 					)}
// 					{!!stakingData && (
// 						<div>
// 							${formatUsd(stakingData[3])} Total Contributed (
// 							{formatFnd(stakingData[2])} FND)
// 						</div>
// 					)}
// 					<div
// 						className="contribution-details align-self-end text-center w-70 mx-auto"
// 						style={{
// 							display: "flex",
// 							alignItems: "center",
// 							justifyContent: "center",
// 						}}
// 					>
// 						<div
// 							style={{
// 								border: "3px solid",
// 								borderColor: "#FEC008",
// 								borderRadius: "12px",
// 								maxWidth: "500px",
// 							}}
// 						>
// 							<Row
// 								className="mx-auto no-gutters jumbotron d-flex align-items-center"
// 								style={{ padding: "0 6px 0 1em" }}
// 							>
// 								<Col style={{ padding: "0" }}>
// 									<div
// 										style={{
// 											display: "flex",
// 											justifyContent: "center",
// 											alignItems: "center",
// 										}}
// 									>
// 										<p
// 											style={{
// 												padding: "0",
// 												margin: "0",
// 												fontSize: "1.5rem",
// 												borderRight: "1px solid",
// 												paddingRight: "10px",
// 												borderColor: "#FEC008",
// 											}}
// 										>
// 											$
// 										</p>
// 										<input
// 											id="contribute-amount"
// 											placeholder={"100"}
// 											autoComplete="off"
// 											type="text"
// 											onKeyPress={(e) => {
// 												if (
// 													(e.key === "." &&
// 														(e.target.value.includes(".") ||
// 															e.target.value === "")) ||
// 													(!/^[0-9]/.test(e.key) && !/^[.]/.test(e.key))
// 												) {
// 													e.preventDefault();
// 												}
// 												!/^[0-9]/.test(e.key) &&
// 													!/^[.]/.test(e.key) &&
// 													!e.target.value.includes(".") &&
// 													e.preventDefault();
// 											}}
// 											pattern="^[0-9]*[.]?[0-9]*$"
// 											// disabled={!allowance || allowance <= 0}
// 											style={{
// 												backgroundColor: "transparent",
// 												border: "none",
// 												width: "100%",
// 												// minWidth: "250px",
// 												// minHeight: "59px",
// 												height: "100%",
// 												fontSize:
// 													!allowance || allowance <= 0 ? "1 rem" : "1.2rem",
// 												// color: !allowance || allowance <= 0 ? "red" : "black",
// 												color: "black",
// 												fontFamily: "'Kaisei Opti', sans-serif",
// 												outline: "none",
// 												paddingLeft: "10px",
// 											}}
// 										></input>

// 										<Button
// 											style={{
// 												// padding: "0",
// 												// margin: "0",
// 												// fontSize: "1.5rem",
// 												// borderLeft: "1px solid",
// 												// paddingLeft: "10px",
// 												// borderColor: "#FEC008",
// 												borderRadius: "12px",
// 											}}
// 											size="sm"
// 											variant="outline-warning"
// 											onClick={() => setInputValue(usdBalance || "0")}
// 										>
// 											MAX
// 										</Button>
// 									</div>
// 								</Col>
// 							</Row>
// 						</div>
// 					</div>

// 					<div
// 						className="align-self-end text-center w-70 mx-auto"
// 						style={{
// 							padding: 5,
// 							display: "flex",
// 							alignItems: "center",
// 							justifyContent: "center",
// 						}}
// 					>
// 						<Row
// 							className="mx-auto no-gutters jumbotron d-flex align-items-center"
// 							style={{
// 								padding: "0 0 0 0",
// 								width: "100%",
// 								maxWidth: "500px",
// 							}}
// 						>
// 							<Col className="p-1 w-20" style={{ width: "100%" }}>
// 								{provider ? (
// 									<Button
// 										id="contribute-fnd-btn"
// 										variant="warning"
// 										size="lg"
// 										style={{
// 											width: "100%",
// 											fontSize: "1rem",
// 											maxHeight: "100%",
// 										}}
// 										onClick={() => stake()}
// 										disabled={
// 											!stakingOptions ||
// 											!stakingOptions[7] ||
// 											!readyToContribute ||
// 											// !projectLive ||
// 											pending
// 										}
// 									>
// 										{`Complete Donation`}
// 									</Button>
// 								) : (
// 									<Button
// 										id="contribute-fnd-btn"
// 										variant="warning"
// 										size="lg"
// 										style={{
// 											width: "100%",
// 											fontSize: "1rem",
// 											maxHeight: "100%",
// 										}}
// 										onClick={() =>
// 											document.getElementById("connect-btn").click()
// 										}
// 										disabled={!projectLive}
// 									>
// 										Approve Donation
// 									</Button>
// 								)}
// 							</Col>
// 						</Row>
// 					</div>
// 					<div
// 						className="align-self-end text-center w-70 mx-auto"
// 						style={{
// 							padding: 5,
// 							display: "flex",
// 							alignItems: "center",
// 							justifyContent: "center",
// 						}}
// 					>
// 						<Row
// 							className="mx-auto no-gutters jumbotron d-flex align-items-center"
// 							style={{
// 								padding: "0 0 0 0",
// 								width: "100%",
// 								maxWidth: "500px",
// 							}}
// 						>
// 							<Col className="p-1 w-30" style={{ width: "100%" }}>
// 								<Button
// 									id="claim-btn"
// 									variant="warning"
// 									size="lg"
// 									style={{
// 										width: "100%",
// 										fontSize: "1rem",
// 										maxHeight: "100%",
// 									}}
// 									onClick={() => claim()}
// 									disabled={!stakingOptions || !stakingOptions[6]}
// 								>
// 									Claim
// 								</Button>
// 							</Col>
// 							<Col className="p-1 w-30" style={{ width: "100%" }}>
// 								<Button
// 									id="contribute-usd-btn"
// 									variant="warning"
// 									size="lg"
// 									style={{ width: "100%", fontSize: "1rem", maxHeight: "100%" }}
// 									// onClick={() => stake()}
// 									disabled={
// 										// 	!stakingOptions ||
// 										// 	!stakingOptions[7] ||
// 										!projectLive
// 										// 	pending
// 									}
// 									// disabled={true}
// 								>
// 									Donate by card
// 								</Button>
// 							</Col>
// 						</Row>
// 					</div>

// 					{txHash && (
// 						<div
// 							style={{
// 								backgroundColor: "#09ce00",
// 								color: "white",
// 								height: "50px",
// 								display: "flex",
// 								justifyContent: "center",
// 								alignItems: "center",
// 							}}
// 						>
// 							<p style={{ margin: "0", padding: "0" }}>
// 								Transaction Hash:{" "}
// 								<a
// 									href={`https://bscscan.com/tx/${txHash}`}
// 									target="_blank"
// 									rel="noopener"
// 								>
// 									{txHash}
// 								</a>
// 							</p>
// 						</div>
// 					)}
// 				</div>
// 			) : (
// 				<LoadingSpinner color="#FFC115" />
// 			)}
// 		</div>
// 	);
// }

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
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
	formatUsdInput,
	formatFnd,
	sendTx,
	USDT_DECIMALS,
	popupError,
	popupInfo,
	switchNetwork,
} from "../../utils/Helpers";
import { TARGET_CHAIN } from "../../utils/Helpers";
import Iframe from "react-iframe";
import { sha512 } from "js-sha512";

var regexp = /^\d+(\.\d{1,18})?$/;

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

let refreshStakingId = 0;

export default function ContributeBtn(props) {
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
	const [balance, setBalance] = useState(0);
	const [usdBalance, setUsdBalance] = useState(0);
	const [txHash, setTxHash] = useState(null);
	const [venlyAuth, setVenlyAuth] = useState("");
	const [venlyEmail, setVenlyEmail] = useState("");
	const [venlyEmailErr, setVenlyEmailErr] = useState("");
	const [venlyWalletAddress, setVenlyWalletAddress] = useState("");
	const [venlyWalletId, setVenlyWalletId] = useState("");
	const [show, setShow] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const [mercuryoCurrency, setMercuryoCurrency] = useState("");
	const [mercuryoFiatCurrency, setMercuryoFiatCurrency] = useState("");
	const [mercuryoBusdFee, setMercuryoBusdFee] = useState("");
	const [mercuryoFiatCurrencyAmount, setMercuryoFiatCurrencyAmount] =
		useState(0);
	const [mercuryoCurrencyAmount, setMercuryoCurrencyAmount] = useState(0);
	const [mercuryoRecievingAmount, setMercuryoRecievingAmount] = useState(0);
	const [mercuryoPopupURL, setMercuryoPopupURL] = useState("");
	const { provider, setProvider } = useContext(ProviderContext);
	const token_abi = token_info.token_abi;
	const tokenAddress = token_info.token_address;
	const id = props.projectId;

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleCloseCard = () => setShowCard(false);
	const handleShowCard = () => setShowCard(true);

	const getAllowance = async (token_) => {
		const allownce = await token_.allowance(walletAddress, stakingAddress);
		setAllowance(allownce);
	};

	const getTokenBalance = async () => {
		const data = await token.balanceOf(walletAddress);
		const usd = await staking.fndToUsd(data);
		setBalance(data);
		setUsdBalance(usd);
	};

	const getStakingOptions = async (staking) => {
		const options = await staking.getOptions();
		setStakingOptions(options);
		setFinishedTokenInfoUpdate(true);
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

		// getVenlyAuth();
		getVenlyAuth_2();
	}, []);

	useEffect(() => {
		clearInterval(refreshStakingId);
		refreshStakingId = setInterval(() => {
			if (!!staking) {
				getStakingData(staking);
				getStakingOptions(staking);
			}
			if (!!walletAddress) {
				getTokenBalance();
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

	// get venly auth from the venly directly
	function getVenlyAuth() {
		const details = {
			grant_type: "client_credentials",
			client_id: "Testaccount-capsule",
			client_secret: "82c19251-1753-44f5-ae76-93438d3628de",
		};

		let formBody = [];
		for (let property in details) {
			let encodedKey = encodeURIComponent(property);
			let encodedValue = encodeURIComponent(details[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");

		axios
			.post(
				`https://login.arkane.network/auth/realms/Arkane/protocol/openid-connect/token`,
				formBody,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
						// "Access-Control-Allow-Origin": "*"
					},
				}
			)
			.then((res) => {
				if (res.data) {
					setVenlyAuth(res.data.access_token);
				}
			})
			.catch((err) => {
				console.log(err.response);
			});
	}

	// get venly auth through the backend from venly server
	function getVenlyAuth_2() {
		axios
			// .get("https://login.arkane.network", {
			.get(process.env.REACT_APP_BASE_URL + "/api/auth/venly_auth/", {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				// console.log(">>>>>>>>>> auth token: ", res.data);
				if (res.data) {
					setVenlyAuth(res.data.access_token);
				}
			})
			.catch((err) => {
				console.log(err.response);
			});
	}

	async function stake() {
		// console.log("allownce: ", allowance);

		if (!allowance || allowance.lte(0)) {
			popupInfo(
				"Please approve 2x transactions in your wallet to complete your donation!"
			);
			const approvalStatus = await approve();
			if (!approvalStatus) {
				// popupError("You need to first approve the payment!");
				return;
			}
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
		// stacking address -> smart contract address and the max amount
		const approveTx = () =>
			token?.approve(stakingAddress, ethers.constants.MaxInt256);
		const status = await sendTx(approveTx, "Approved successfully!");
		setPending(false);
		status.valid && setAllowance(ethers.constants.MaxInt256);
		return status;
	}

	function setInputValue(usdAmount) {
		document.getElementById("contribute-amount").value =
			formatUsdInput(usdAmount);
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

	function openPopUp() {
		let contribution_amount =
			document.getElementById("contribute-amount").value;

		if (!regexp.test(contribution_amount)) {
			popupInfo("Please enter amount to complete your donation with card!");
			// return alert("Invalid contribution amount");
		} else {
			handleShow();
		}
	}

	function donateByCard() {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		// console.log("contribution_amount: ", contribution_amount);

		// getting mercuryo buy rates - not needed for now
		// mercuryoBuyRate(contribution_amount);

		if (!venlyEmail) {
			setVenlyEmailErr("Email field is required.");
		} else if (!venlyAuth) {
			popupInfo("Retry! Unauthorized access.");
			getVenlyAuth_2();
		} else if (contribution_amount < 16) {
			popupInfo("Donation amount should at least be $16 or above");
		} else {
			// popupInfo("Proceed payment with card!");
			createVenlyWallet();
		}
	}

	function createVenlyWallet() {
		// console.log("auth ", true);
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		axios
			.get(
				process.env.REACT_APP_BASE_URL +
					`/api/venly/create_wallet/${venlyEmail}/${contribution_amount}/${stakingAddress}/${id}/`
			)
			.then((res) => {
				// console.log("res: ", res.data)
				if (res.data) {
					redirectToMercuryo(venlyEmail, res.data.email);
				}
			})
			.catch((err) => console.log(err));
	}

	function redirectToMercuryo(address, email) {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		const stringSec = "rarefndproduction";
		sha512(address + stringSec);
		var hash = sha512.update(address + stringSec);
		// hash.update(address + stringSec);
		const sigHax = hash.hex();

		// console.log("sigHax: ", sigHax);

		if (contribution_amount >= 16) {
			const data = {
				type: "buy",
				// address: venlyWalletAddress,
				from: mercuryoFiatCurrency ? mercuryoFiatCurrency : "USD",
				to: mercuryoCurrency ? mercuryoCurrency : "BNB",
				// amount: mercuryoFiatCurrency,
				amount: contribution_amount, // user input
				widget_id: "c95bbe0f-334f-4848-a138-25125125b4b7",
				address: address,
				signature: sigHax,
				email: email,
				// redirect_url: window.location.href + `?message=completed`,
				redirect_url: `https://temporary-rarefnd.netlify.app/?message=completed`,
			};

			window.location.replace(
				`https://exchange.mercuryo.io/?widget_id=${data.widget_id}&address=${data.address}&signature=${data.signature}&fiat_amount=${data.amount}&type=${data.type}&fiat_currency=${data.from}&currency=${data.to}&email=${data.email}&redirect_url=${data.redirect_url}`
			);
		} else {
			popupInfo("Donation amount should at least be $16 or above");
		}
	}

	// console.log("venlyAuth: ", venlyAuth);
	// console.log("wallet: ", venlyWalletAddress);
	return (
		<div>
			{!!walletAddress && (
				<div>
					Balance | {formatFnd(balance)} FND (${formatUsd(usdBalance || 0)})
				</div>
			)}
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
								style={{ padding: "0 6px 0 1em" }}
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
											onKeyPress={(e) => {
												if (
													e.key === "." &&
													(e.target.value.includes(".") ||
														e.target.value === "")
												) {
													e.preventDefault();
												}
												!/^[0-9]/.test(e.key) &&
													!/^[.]/.test(e.key) &&
													!e.target.value.includes(".") &&
													e.preventDefault();
											}}
											pattern="^[0-9]*[.]?[0-9]*$"
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

										<Button
											style={{
												// padding: "0",
												// margin: "0",
												// fontSize: "1.5rem",
												// borderLeft: "1px solid",
												// paddingLeft: "10px",
												// borderColor: "#FEC008",
												borderRadius: "12px",
											}}
											size="sm"
											variant="outline-warning"
											onClick={() => setInputValue(usdBalance || "0")}
										>
											MAX
										</Button>
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
								padding: "0 0 0 0",
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
										onClick={() => stake()}
										disabled={
											!stakingOptions ||
											!stakingOptions[7] ||
											!readyToContribute ||
											// !projectLive ||
											pending
										}
									>
										{`Complete Donation`}
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
										disabled={!projectLive}
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
								padding: "0 0 0 0",
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
									onClick={() => openPopUp()}
									disabled={!projectLive}
									// disabled={true}
								>
									Donate by card
								</Button>
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

			{/* >>>>>>>>>>>> POPUP PAYMENT WITH Mercuryo */}
			{mercuryoPopupURL ? (
				<>
					{/* <iframe title="mercuryo_widget" data-test="main_iframe" src={mercuryoPopupURL} style={{ minWidth: '320px', minHeight: '320px', display: 'block', }} allow="camera" allowpaymentrequest="" width="100%" height="100%" frameborder="0"></iframe> */}
					<div id="mercuryo-widget">
						<Iframe
							url={mercuryoPopupURL}
							width="640px"
							height="320px"
							id=""
							className=""
							display="block"
							position="relative"
						/>
					</div>
				</>
			) : (
				<>
					{null}
					{/* <div>
				<div className="row d-flex">
					<div className="col-lg-6">
						<p className="m-1">From total ({mercuryoFiatCurrency})</p>
						<p className="m-1">To total ({mercuryoCurrency})</p>
						<p className="m-1">Fee ({mercuryoCurrency})</p>
						<p className="m-1">Total Recieve ({mercuryoCurrency})</p>
					</div>
					<div className="col-lg-6">
						<p className="m-1">${parseFloat(mercuryoFiatCurrencyAmount).toFixed(2)}</p>
						<p className="m-1">{parseFloat(mercuryoCurrencyAmount).toFixed(2)}</p>
						<p className="m-1">{parseFloat(mercuryoBusdFee).toFixed(2)}</p>
						<p className="m-1"><strong>{parseFloat(mercuryoRecievingAmount).toFixed(2)}</strong></p>
					</div>
				</div>
			</div> */}
				</>
			)}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Enter you email address</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								value={venlyEmail}
								onChange={(e) => setVenlyEmail(e.target.value)}
								onClick={() => setVenlyEmailErr("")}
								placeholder="name@example.com"
								autoFocus
							/>
							{venlyEmailErr ? (
								<p className="ml-2 mt-2 text-danger">{venlyEmailErr}</p>
							) : null}
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button variant="primary" onClick={() => {
				handleShowCard();
				handleClose();
			}}>
            Card
          	</Button> */}
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={() => donateByCard()}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showCard} onHide={handleCloseCard}>
				<Modal.Header closeButton>
					<Modal.Title>Conversation Rate</Modal.Title>
				</Modal.Header>
				<Modal.Body></Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						//   onClick={() => redirectToMercuryo()}
					>
						Please Confirm
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
