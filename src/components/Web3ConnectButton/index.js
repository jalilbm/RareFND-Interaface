import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { ProviderContext } from "../../web3/ProviderContext";
import { TARGET_CHAIN } from "../../utils/Helpers";

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
				params: [{ chainId: TARGET_CHAIN }],
			});
		} catch (switchError) {
			if (switchError.code === 4902) {
				try {
					await provider.provider.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: TARGET_CHAIN,
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
		if (walletAddress && chainId !== TARGET_CHAIN) {
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
				// window.location.reload();
			} catch (error) {
				console.log(error.message);
			}
		}
	}

	async function handelConnectWallet() {
		await connectWallet();
		window.location.reload();
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
		const tmp = document.getElementsByClassName("connect-wallet-btn");
		if (walletAddress && chainId !== TARGET_CHAIN) {
			for (let i = 0; i < tmp.length; i++) {
				tmp[i].textContent = "Connect to BSC";
				tmp[i].className = "btn btn-danger connect-wallet-btn";
				tmp[i].disabled = false;
			}
		} else if (walletAddress && chainId === TARGET_CHAIN) {
			for (let i = 0; i < tmp.length; i++) {
				tmp[i].textContent =
					walletAddress.slice(0, 6) + "....." + walletAddress.slice(-4);
				tmp[i].className = "btn btn-outline-light connect-wallet-btn";
				tmp[i].disabled = true;
			}
		} else {
			for (let i = 0; i < tmp.length; i++) {
				tmp[i].textContent = "Connect Wallet";
				tmp[i].className = "btn btn-light connect-wallet-btn";
				tmp[i].disabled = false;
			}
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
			variant="light"
			className="connect-wallet-btn"
			onClick={handelConnectWallet}
			style={{
				whiteSpace: "nowrap",
				textAlign: "center",
				color: "black",
			}}
		>
			Connect Wallet
		</Button>
	);
}
