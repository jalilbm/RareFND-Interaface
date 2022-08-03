import Button from 'react-bootstrap/Button';
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Alert } from 'bootstrap';
import axios from 'axios';
import token_info from '../../token.json';
import { useParams } from 'react-router';


const abi = token_info.token_abi
const token_address = token_info.token_address
var regexp = /^\d+(\.\d{1,18})?$/;



export default function ContributeBtn(props) {
  const [walletAddress, setWalletAddress] = useState()
  const [chainId, setchainId] = useState()
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const { id } = useParams();


  async function transferPayment(addr) {
    let contribution_amount = document.getElementById("contribute-amount").value
    if (!regexp.test(contribution_amount)) {
      console.log(contribution_amount)
      return alert("Invalid Contribution Amount")
    }
    if (!window.ethereum) {
      document.querySelector('#contribute-btn').disabled = true;
    } else {
      await isReadyToContribute()
      if ((!walletAddress) || (walletAddress && chainId !== 56)) {
        document.querySelector('#connect-btn').click()
      } else if (walletAddress && chainId === 56) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const token = new ethers.Contract(token_address, abi, signer);
        try {
          axios
              .post("http://localhost:8000/api/pending_contribution/", {
                "hash": '0xdeaf1dce521b4bac5e575b947f6fad3ab290234838143206b19e94edea78340d',
              }).then(window.location.reload())

          const tx = await token.transfer(addr, (Number(contribution_amount) * 1000000000).toString())
          
          

          axios.get(`http://localhost:8000/api/project/${id}/`)
          .then(response => response.data)
          .then((data) => {
            let old_data = data;
            old_data.raised_amount += Number(contribution_amount);
            delete old_data.thumbnail;
            axios
            .put(`http://localhost:8000/api/project/${id}/`, old_data)
            .then(() => {
              axios
              .post("http://localhost:8000/api/contribution/", {
                "contributor_wallet_address": walletAddress,
                "project": id,
                "amount": Number(contribution_amount)
              }).then(window.location.reload())
            })
          });
          setTxs(tx)
          console.log(tx)
          console.log(tx.hash)
          document.getElementById("transaction-status").innerHTML = tx.hash
          document.getElementById("transaction-status").className = "d-block p-2 bg-warning text-white"
          // add here
        } catch (e) {
          setError(e.message);
          document.getElementById("transaction-status").innerHTML = e.message
          document.getElementById("transaction-status").className = "d-block p-2 bg-danger text-white"
        }
      }
    }
  }


  async function isReadyToContribute() {
    if (!window.ethereum) {
      document.querySelector('#contribute-btn').disabled = true;
    } else {
      await window.ethereum.request({method: 'eth_accounts'}).then(accounts => setWalletAddress(accounts[0]));
      const provider = new ethers.providers.Web3Provider( window.ethereum, "any" );
      const network = await provider.getNetwork();
      const chainId_ = network.chainId;
      setchainId(chainId_)
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

  window.ethereum.on('connect', () => {
    isReadyToContribute();
  });

  window.onload = (event) => {
    isReadyToContribute();
  };

  return (
    <div 
      className="contribution-details align-self-end text-center w-70 mx-auto" 
      style={{marginTop: "auto"}} >
      <div 
      style={{
        border: "4px solid",
        borderColor: "#FEC008",
        borderRadius: "12px",
        padding: "0px",
        
      }}
      >
        <Row 
          className="mx-auto no-gutters jumbotron d-flex align-items-center" 
          style={{height: "60px", width:"98%"}}>
          <Col>
            <input
              id="contribute-amount"
              className= "bg-black"
              placeholder= "0.00 FND"
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
            >
            </input>
          </Col>
          <Col className="p-0 w-20" style={{width: "20%"}}>
            <Button
              id="contribute-btn"
              variant="warning"
              // className="btn-wallet"
              classNmae="btn-wallet align-self-end"
              size="lg"
              style={{width: "100%"}}
              onClick={() => transferPayment(props.wallet_address)}
            >
              Contribute Now
            </Button>
          </Col>
        </Row>
      </div>
      <Row id="transaction-status" className="d-none">
        <Col>
          <p style={{
            border: "2px solid",
            borderColor: "#FFC007",
            backgroudColor: error ? "red" : "green",
            color: "white",
          }}>
            {error || txs}
          </p>
        </Col>
      </Row>
    </div>
  )
}

