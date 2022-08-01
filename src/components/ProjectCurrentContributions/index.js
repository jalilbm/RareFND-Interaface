import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';



export default function ProjectCurrentContributions() {

  const [projectData, setprojectData] = useState({})
  useEffect(() => {
    axios.get("http://localhost:8000/api/project/")
    .then(response => response.data.projects[0])
    .then((data) => {
      setprojectData(data)
    });
  },[])

  return (
    <div 
      className="project-current-contributions bg-white" 
    >
      <Row className="justify-content-md-center">
        <Col md={12} className="text-center mt-4" style={{color: "black"}}>
          <h1 className="display-6 fw-bold" style={{fontFamily: "'Kaisei Opti', sans-serif"}}>US$ {Number(projectData.raised_amount).toLocaleString()} / {Number(projectData.fund_amount).toLocaleString()}</h1>
          <ProgressBar animated variant="success" now={(Number(projectData.raised_amount) / Number(projectData.fund_amount) * 100)} label={`${(Number(projectData.raised_amount) / Number(projectData.fund_amount) * 100).toFixed(2)}%`} className="mx-auto" style={{width: "50%", height: "20px"}}/>
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-5">
        <Col md={6} className="text-center mt-1" style={{color: "black"}}>
          <div className="display-6 fw-bold text-success fw-bold" style={{fontFamily: "'Kaisei Opti', sans-serif", whiteSpace: "pre-line"}}>
            240% APY
          </div>
          <div className="display-6 fw-bold" style={{fontFamily: "'Kaisei Opti', sans-serif", whiteSpace: "pre-line"}}>
            US$ {(Number(projectData.raised_amount) * 2.4).toLocaleString()}
          </div>
          
        </Col>

        <Col md={6} className="text-center mt-1" style={{color: "black"}}>
          <div className="display-6 fw-bold text-success fw-bold" style={{fontFamily: "'Kaisei Opti', sans-serif"}}>
            Reward
          </div>
          <div className="display-6 fw-bold" style={{fontFamily: "'Kaisei Opti', sans-serif", whiteSpace: "pre-line"}}>
            US$ {Number(projectData.rewarded_amount).toLocaleString()}
          </div>
        </Col>
      </Row>
    </div>
  )
}

