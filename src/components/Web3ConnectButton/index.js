import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { ProviderContext } from "../../web3/ProviderContext";

const providerOptions = {
	binancechainwallet: {
		package: true,
	},
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: "b0a552cf598947f68b787c90b25aaeeb",
		},
	},
	coinbasewallet: {
		package: CoinbaseWalletSDK,
		options: {
			appName: "RareFnd",
			infuraId: "b0a552cf598947f68b787c90b25aaeeb",
			rpc: "",
			chainId: 56,
			darkMode: true,
		},
	},
};

const toHex = (num) => {
	const val = Number(num);
	return "0x" + val.toString(16);
};

export default function Web3ConnectButton() {
	const [connection, setConnection] = useState();
	const [walletAddress, setWalletAddress] = useState("");
	const [chainId, setChainId] = useState(0);
	const { provider, setProvider } = useContext(ProviderContext);

	const web3Modal = new Web3Modal({
		// network: "Binance Smart Chain (BSC)",
		theme: "dark",
		cacheProvider: true,
		providerOptions,
	});

	const switchNetwork = async () => {
		try {
			await provider.provider.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: "0x38" }],
			});
		} catch (switchError) {
			if (switchError.code === 4902) {
				try {
					await provider.provider.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: "0x38",
								rpcUrls: ["https://bsc-dataseed.binance.org/"],
								chainName: "Binance Smart Chain",
								nativeCurrency: {
									name: "Binance Token",
									symbol: "BNB",
									decimals: 18,
								},
								blockExplorerUrls: ["https://bscscan.com/"],
							},
						],
					});
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	async function connectWallet() {
		// wallet connected but not to BSC
		if (walletAddress && chainId !== "0x38") {
			switchNetwork();
		} else {
			try {
				const connection_ = await web3Modal.connect();
				const provider_ = new ethers.providers.Web3Provider(connection_);
				const accounts = await provider_.listAccounts();
				const network = await provider_.getNetwork();
				setProvider(provider_);
				setConnection(connection_);
				if (accounts) setWalletAddress(accounts[0]);
				setChainId(toHex(network.chainId));
			} catch (error) {
				console.log(error.message);
			}
		}
	}

	const disconnect = async () => {
		await web3Modal.clearCachedProvider();
		setChainId("");
		setProvider();
		setConnection();
		setWalletAddress();
	};

	useEffect(() => {
		if (web3Modal.cachedProvider) {
			connectWallet();
		}
	}, []);

	async function updateProvider() {
		const connection_ = await web3Modal.connect();
		const provider_ = new ethers.providers.Web3Provider(connection_);
		const accounts = await provider_.listAccounts();
		const network = await provider_.getNetwork();
		setProvider(provider_);
		setConnection(connection_);
		if (accounts) setWalletAddress(accounts[0]);
		setChainId(toHex(network.chainId));
	}

	useEffect(() => {
		if (walletAddress && chainId !== "0x38") {
			document.getElementById("connect-btn").textContent =
				"Connect to Binance Smart Chain";
			document.getElementById("connect-btn").className = "btn btn-danger";
			document.getElementById("connect-btn").disabled = false;
		} else if (walletAddress && chainId === "0x38") {
			document.getElementById("connect-btn").innerHTML =
				walletAddress.slice(0, 6) + "....." + walletAddress.slice(-4);
			document.getElementById("connect-btn").className =
				"btn btn-outline-light";
			document.getElementById("connect-btn").disabled = true;
		} else {
			document.getElementById("connect-btn").textContent = "Connect to Wallet";
			document.getElementById("connect-btn").className = "btn btn-light";
			document.getElementById("connect-btn").disabled = false;
		}

		if (connection?.on) {
			const handleAccountsChanged = (accounts) => {
				if (accounts.length) {
					connectWallet();
				} else {
					disconnect();
				}
			};

			const handleChainChanged = (_hexChainId) => {
				updateProvider();
			};

			connection.on("accountsChanged", handleAccountsChanged);
			connection.on("chainChanged", handleChainChanged);

			return () => {
				if (connection.removeListener) {
					connection.removeListener("accountsChanged", handleAccountsChanged);
					connection.removeListener("chainChanged", handleChainChanged);
				}
			};
		}
	}, [connection, provider, chainId]);

	return (
		<Button
			id="connect-btn"
			variant="dark"
			// className="btn-wallet"
			onClick={connectWallet}
			style={{
				whiteSpace: "nowrap",
				textAlign: "center",
				color: "black",
			}}
		>
			Connect to Wallet
		</Button>
	);
}
