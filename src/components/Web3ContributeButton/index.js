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
  const [balance, setBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);
  const [projectData, setProjectData] = useState();
  const [stakingOptions, setStakingOptions] = useState();
  const [stakingData, setStakingData] = useState();
  const [projectLive, setProjectLive] = useState(false);
  const [stakingAddress, setStakingAddress] = useState();
  const [staking_abi, setStaking_abi] = useState();
  const { id } = useParams();
  const { provider, setProvider } = useContext(ProviderContext);
  const token_abi = token_info.token_abi;
  const tokenAddress = token_info.token_address;

  const [networkStatus, setNetworkStatus] = useState();

  useEffect(() => {
    switchNetwork(provider).then((status) => setNetworkStatus(status));
  }, [networkStatus, provider]);

  const getAllowance = async (token_) => {
    const allownce = await token_.allowance(walletAddress, stakingAddress);
    setAllowance(allownce);
  };

  const getStakingOptions = async (staking) => {
    const options = await staking.getOptions();
    setStakingOptions(options);
  };

  const getStakingData = async (staking) => {
    const data = await staking.getUserData();
    setStakingData(data);
  };

  const getTokenBalance = async () => {
    const data = await token.balanceOf(walletAddress);
    const usd = await staking.fndToUsd(data);
    setBalance(data);
    setUsdBalance(usd);
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
      if (networkStatus && !!staking) {
        getStakingData(staking);
        getStakingOptions(staking);
      }
      if (networkStatus && !!walletAddress) {
        getTokenBalance();
      }
    }, 5000);
  }, [staking]);

  useMemo(() => {
    if (provider && networkStatus && stakingAddress && stakingAddress) {
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
  }, [provider, networkStatus, walletAddress, stakingAddress]);

  async function stake() {
    console.log(allowance);
    if (!allowance || allowance.lte(0)) {
      popupInfo(
        "Please approve 2x transactions in your wallet to complete your donation!"
      );
      const approvalStatus = await approve();
      if (!approvalStatus) {
        popupError("You need to first approve the payment!");
        return;
      }
    }
    let contribution_amount =
      document.getElementById("contribute-amount").value;
    if (!regexp.test(contribution_amount)) {
      return alert("Invalid Contribution Amount");
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
          const status = await sendTx(tx, "You have successfully staked!");
          setPending(false);
          if (status) {
            axios.post(
              process.env.REACT_APP_BASE_URL + "/api/pending_contribution/",
              {
                hash: tx.hash,
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
    console.log(ethers.constants.MaxInt256);
    const approveTx = () =>
      token?.approve(stakingAddress, ethers.constants.MaxInt256);
    const status = await sendTx(approveTx, "You have successfully staked!");
    setPending(false);
    status && setAllowance(ethers.constants.MaxInt256);
    return status;
  }

  async function claim() {
    setPending(true);
    const tx = () => staking?.claim();
    await sendTx(tx, "You have successfully claimed!");
    setPending(false);
  }

  function setInputValue(usdAmount) {
    document.getElementById("contribute-amount").value =
      formatUsdInput(usdAmount);
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
      {!!walletAddress && (
        <div>
          Balance | {formatFnd(balance)} FND (${formatUsd(usdBalance || 0)})
        </div>
      )}
      {!!stakingOptions && stakingOptions[6] && (
        <span>
          <div>
            {!!stakingData ? formatFnd(stakingData[0]) : "-"} FND Pending Gains
          </div>
          <div>
            {!!stakingData ? formatFnd(stakingData[1]) : "-"} FND Total Gains
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
              <input
                id="contribute-amount"
                placeholder="$100"
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
              <Button
                onClick={() => setInputValue(usdBalance || "0")}
                style={{
                  alignItems: "right",
                  justifyContent: "right",
                }}
              >
                MAX
              </Button>
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
          style={{ padding: "0 1em 0 1em", width: "50%" }}
        >
          <Col className="p-1 w-30" style={{ width: "40%" }}>
            <Button
              id="contribute-usd-btn"
              variant="warning"
              // classNmae="btn-wallet align-self-end"
              size="lg"
              style={{ width: "100%", fontSize: "2vh", maxHeight: "100%" }}
              // onClick={() => stake()}
              disabled={
                !stakingOptions ||
                !stakingOptions[7] ||
                !readyToContribute ||
                pending
              }
            >
              Pay $
            </Button>
          </Col>
          <Col className="p-1 w-20" style={{ width: "10%" }}>
            <Button
              id="contribute-fnd-btn"
              variant="warning"
              // classNmae="btn-wallet align-self-end"
              size="lg"
              style={{ width: "100%", fontSize: "2vh", maxHeight: "100%" }}
              onClick={() => stake()}
              disabled={
                !stakingOptions ||
                !stakingOptions[7] ||
                !readyToContribute ||
                pending
              }
            >
              Pay FND
            </Button>
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
          style={{ padding: "0 1em 0 1em", width: "50%" }}
        >
          <Col className="p-1 w-30" style={{ width: "10%" }}>
            <Button
              id="claim-btn"
              variant="warning"
              // classNmae="btn-wallet align-self-end"
              size="lg"
              style={{
                width: "100%",
                fontSize: "2vh",
                maxHeight: "100%",
              }}
              onClick={() => claim()}
              disabled={!stakingOptions || !stakingOptions[6]}
            >
              Claim
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
