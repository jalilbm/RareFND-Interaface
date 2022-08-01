import Button from 'react-bootstrap/Button';
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
// BSC Main: conditional 56, connect "0x38"
// BSC Test: conditional 97, connect "0x61"

export default function Web3ConnectButton() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();

  useEffect(
    () => {
      isConnected()
    }, [walletAddress]
  )

  async function requestAccount() {
    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      // Wallet connected but not connected to BSC
      if (walletAddress) {
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x38",
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                  name: "Binance Token",
                  symbol: "BNB",
                  decimals: 18
              },
              blockExplorerUrls: ["https://bscscan.com/"]
          }]
        });
      // Wallet not connected
      } else {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setWalletAddress(accounts[0]);
        } catch (error) {
          console.log('Error connecting...');
        }
      }
    // MetaMask not Installed
    } else {
      alert('MetaMask not detected: please install and connect using MetaMask wallet');
    }
    }

  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
    }
    else {
      alert('MetaMask not detected: please install and connect using MetaMask wallet');
    }
  }

  async function isConnected() {
    if (!window.ethereum) {
      document.getElementById('connect-btn').style = {width: "20px"}
      document.querySelector('#connect-btn').innerHTML = 'MetaMask Not Detected';
      document.querySelector('#connect-btn').className = "btn btn-danger";
    } else {
      await window.ethereum.request({method: 'eth_accounts'}).then(accounts => setWalletAddress(accounts[0]));
      const provider = new ethers.providers.Web3Provider( window.ethereum, "any" );
      const network = await provider.getNetwork();
      const chainId = network.chainId;            
      
      
      
      
      
      
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const provider = new ethers.providers.StaticJsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
      // const signer_ = provider.getSigner();
      // setSigner(signer_)

      // const tx = await signer.sendTransaction({
      //   to: "0xc70548Cb637C96c47f729D2cef53e0D0C0ac971f",
      //   value: ethers.utils.parseEther("0.001")
      // });

      // setSigner(signer)


      if (walletAddress && chainId === 56) {
        document.getElementById('connect-btn').innerHTML = walletAddress.slice(0, 6) + '.....' + walletAddress.slice(-5, -1);
        document.getElementById('connect-btn').className = "btn btn-outline-light";
        document.getElementById('connect-btn').disabled = true;
      } else if (walletAddress && chainId !== 56) {
        document.getElementById('connect-btn').innerHTML = "Connect to Binance Smart Chain";
        document.getElementById('connect-btn').className = "btn btn-danger";
        document.getElementById('connect-btn').disabled = false;
      } else {
        document.getElementById('connect-btn').innerHTML = 'Connect MetaMask';
        document.getElementById('connect-btn').className = "btn btn-light";
        document.getElementById('connect-btn').disabled = false;
      }
    }
  }

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
  });

  window.ethereum.on('chainChanged', () => {
      window.location.reload();
  });

  window.ethereum.on('disconnect', () => {
      window.location.reload();
  });
  }

  window.onload = (event) => {
    isConnected();
  };

  return (
    <Button
      id="connect-btn"
      variant="light"
      className="btn-wallet"
      onClick={connectWallet}

    >{
      walletAddress ? walletAddress.slice(0, 6) + '.....' + walletAddress.slice(-5, -1) : "Connect MetaMask"
      }
    </Button>
  )
}
