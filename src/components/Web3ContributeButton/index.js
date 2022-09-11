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

var regexp = /^\d+(\.\d{1,18})?$/;

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

export default function ContributeBtn(props) {
	const [walletAddress, setWalletAddress] = useState();
	const [chainId, setChainId] = useState();
	const [readyToContribute, setReadyToContribute] = useState();
	const [pending, setPending] = useState(false);
	const [token, setToken] = useState();
	const [staking, setStaking] = useState();
	const [allowance, setAllowance] = useState(0);
	const [projectData, setProjectData] = useState();
	const [projectLive, setProjectLive] = useState(false);
	const [stakingAddress, setStakingAddress] = useState();
	const [staking_abi, setStaking_abi] = useState();
	const { id } = useParams();
	const { provider, setProvider } = useContext(ProviderContext);
	const token_abi = token_info.token_abi;
	const tokenAddress = token_info.token_address;

	useEffect(() => {
		axios
			.get(`https://rarefndapi.herokuapp.com/api/project/${id}/`)
			.then((response) => {
				setProjectData(response.data);
				setProjectLive(response.data.live);
				setStakingAddress(response.data.staking_address);
				setStaking_abi(JSON.parse(response.data.staking_abi));
			});
	}, []);

	const getAllowance = async (token_) => {
		const allownce = await token_.allowance(walletAddress, stakingAddress);
		setAllowance(allownce);
	};

	useMemo(() => {
		if (provider && stakingAddress && stakingAddress) {
			const signer = provider.getSigner();
			const token_ = new ethers.Contract(tokenAddress, token_abi, signer);
			const staking = new ethers.Contract(stakingAddress, staking_abi, signer);
			setToken(token_);
			setStaking(staking);
			isReadyToContribute();

			getAllowance(token_);
		}
	}, [provider, walletAddress, stakingAddress]);

	async function stake() {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		if (!regexp.test(contribution_amount)) {
			return alert("Invalid Contribution Amount");
		} else {
			await isReadyToContribute();
			if (!walletAddress || (walletAddress && chainId !== "0x38")) {
				document.querySelector("#connect-btn").click();
			} else if (walletAddress && chainId === "0x38") {
				try {
					setPending(true);
					const tx = await staking?.stake(
						ethers.utils.parseEther(contribution_amount)
					);
					await tx.wait();
					setPending(false);
					axios.post(
						"https://rarefndapi.herokuapp.com/api/pending_contribution/",
						{
							hash: tx.hash,
							project: id,
						}
					);
					document.getElementById(
						"transaction-status"
					).textContent = `Transaction hash: ${tx.hash}`;
					document.getElementById("transaction-status").href =
						"https://bscscan.com/tx/" + tx.hash;
					document.getElementById("transaction-status").className =
						"d-block p-2 bg-success text-white";
				} catch (e) {
					document.getElementById("transaction-status").innerHTML = e.message;
					document.getElementById("transaction-status").className =
						"d-block p-2 bg-danger text-white";
					document.getElementById("transaction-status").onclick = () => false;
				}
			}
		}
	}

	async function approve() {
		let approveTx;
		setPending(true);
		approveTx = await token?.approve(
			stakingAddress,
			ethers.constants.MaxInt256
		);
		await approveTx.wait();
		setPending(false);
		setAllowance(ethers.constants.MaxInt256);
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
						<input
							id="contribute-amount"
							placeholder="0.00 FND"
							autoComplete="off"
							type="text"
							pattern="(^[0-9]{0,1000}$)|(^[0-9]{0,10000}\.[0-9]{0,18}$)"
							style={{
								backgroundColor: "transparent",
								border: "none",
								width: "100%",
								height: "100%",
								fontSize: "1.5rem",
								color: "black",
								fontFamily: "'Kaisei Opti', sans-serif",
								outline: "none",
								paddingLeft: "0",
							}}
						></input>
					</Col>
					<Col className="p-0 w-20" style={{ width: "20%" }}>
						{allowance > 0 ? (
							<Button
								id="contribute-btn"
								variant="warning"
								// classNmae="btn-wallet align-self-end"
								size="lg"
								style={{ width: "100%", fontSize: "2vh", maxHeight: "100%" }}
								onClick={() => stake()}
								disabled={!readyToContribute || pending}
							>
								Contribute
							</Button>
						) : (
							<Button
								id="approve-btn"
								variant="warning"
								// classNmae="btn-wallet align-self-end"
								size="lg"
								style={{ width: "100%", fontSize: "2vh", maxHeight: "100%" }}
								onClick={() => approve()}
								disabled={!provider || !projectLive || pending}
							>
								Approve
							</Button>
						)}
					</Col>
				</Row>
			</div>
			<Row>
				<a
					href="#"
					id="transaction-status"
					className="d-none"
					target="_blank"
				></a>
			</Row>
		</div>
	);
}
