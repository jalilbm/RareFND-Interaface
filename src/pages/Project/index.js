import main from '../../assets/carousel/main.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import MainCard from '../../components/CardGrid/Card.js';
import ContributeBtn from '../../components/Web3ContributeButton';
import ProjectCurrentContributions from '../../components/ProjectCurrentContributions';
import ProjectDescription from '../../components/ProjectDescription';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';
import axios from 'axios';
import {useState, useEffect} from 'react';
import ProjectCard from '../../components/ProjectCard'


export default function Project() {
  const [ height, setHeight ] = useState({})
  const [projectData, setProjectData] = useState({})
  useEffect(() => {
    setHeight(window.innerHeight)
    window.addEventListener('resize', () => setHeight(window.innerHeight));
    return () => window.removeEventListener('resize', () => setHeight(window.innerHeight));
  }, [])
  useEffect(() => {
    axios.get("http://localhost:8000/api/project/")
    .then((response) => {
      // response.data.projects.data[0];
      // console.log(response.data.projects[0]);
      setProjectData(response.data.projects[0]);
      // console.log(response.data.projects[0]);
    })
    .then((data) => {
      // setprojectData(data)
      console.log(projectData)
    });
  },[])
  return (
    <div className="post" style={{height: '10000px'}}>
      <ProjectCard
        image={projectData.thumbnail}
        title={projectData.title}
        text={projectData.head}
        backgroudColor="black"
        image_height={height / 1.8}
        wallet_address={projectData.wallet_address}
      />
    <ProjectCurrentContributions />
    <ProjectDescription description={projectData.description}/>
    </div>
  )
}
