import Button from "react-bootstrap/Button";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useContext } from "react";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import axios from "axios";
import token_info from "../../token.json";
import { useParams } from "react-router";
import { ProviderContext } from "../../web3/ProviderContext";

const abi = token_info.token_abi;
const token_address = token_info.token_address;
const token_decimals = token_info.token_decimals;
var regexp = /^\d+(\.\d{1,18})?$/;

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

export default function ContributeBtn(props) {
	const [walletAddress, setWalletAddress] = useState();
	const [chainId, setChainId] = useState();
	const [readyToContribute, setReadyToContribute] = useState();
	const { id } = useParams();
	const { provider, setProvider } = useContext(ProviderContext);

	useEffect(() => {
		isReadyToContribute();
	}, [provider]);

	async function transferPayment(addr) {
		let contribution_amount =
			document.getElementById("contribute-amount").value;
		if (!regexp.test(contribution_amount)) {
			console.log(contribution_amount);
			return alert("Invalid Contribution Amount");
		} else {
			await isReadyToContribute();
			console.log(walletAddress, chainId);
			if (!walletAddress || (walletAddress && chainId !== "0x38")) {
				document.querySelector("#connect-btn").click();
			} else if (walletAddress && chainId === "0x38") {
				const signer = provider.getSigner();
				const token = new ethers.Contract(token_address, abi, signer);
				try {
					const tx = await token.transfer(
						addr,
						(Number(contribution_amount) * token_decimals).toString()
					);
					axios.post(
						"http://c503-94-202-120-29.ngrok.io/api/pending_contribution/",
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

	async function isReadyToContribute() {
		// if (!props.projectLive) return false;
		console.log("1");
		if (provider) {
			setChainId(toHex(provider.network.chainId));
			const accounts = await provider.listAccounts();
			if (accounts) setWalletAddress(accounts[0]);
			if (accounts[0]) {
				console.log("3");
				setReadyToContribute(true);
			} else {
				console.log("4");
				setReadyToContribute(false);
			}
		} else {
			console.log("5");
			setReadyToContribute(false);
		}
	}

	return (
		<div
			className="contribution-details align-self-end text-center w-70 mx-auto"
			style={{ marginTop: "auto" }}
		>
			<div
				style={{
					border: "3px solid",
					borderColor: "#FEC008",
					borderRadius: "12px",
				}}
			>
				<Row
					className="mx-auto no-gutters jumbotron d-flex align-items-center"
					style={{ height: "60px", width: "98%" }}
				>
					<Col>
						<input
							id="contribute-amount"
							className="bg-black"
							placeholder="0.00 FND"
							autocomplete="off"
							style={{
								border: "none",
								width: "100%",
								height: "100%",
								fontSize: "28px",
								color: "white",
								fontFamily: "'Kaisei Opti', sans-serif",
								outline: "none",
							}}
						></input>
					</Col>
					<Col className="p-0 w-20" style={{ width: "20%" }}>
						<Button
							id="contribute-btn"
							variant="warning"
							classNmae="btn-wallet align-self-end"
							size="lg"
							style={{ width: "100%", fontSize: "2vh", maxHeight: "100%" }}
							onClick={() => transferPayment(props.wallet_address)}
							disabled={!readyToContribute}
						>
							Contribute
						</Button>
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
