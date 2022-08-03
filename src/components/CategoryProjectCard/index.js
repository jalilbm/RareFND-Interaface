import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import './index.css';
import Project from '../../pages/Project';


export default function ProjectCard(props){
    const head = (props.head < 80 ? props.head : (props.head.slice(0, 80) + "..."))
    return(
        <a href={`/project/${props.project_id}`} style={{color:"black",textDecoration: "none"}}>
            <Card style={{cursor:"pointer"}} className="card-project-card">
                <Card.Img variant="top" src={props.image} style={{height: "200px"}}/>
                <Card.Body style={{height: "140px"}}>
                    <Card.Title  style={{fontFamily: "Times New Roman",fontWeight:"bold",fontSize:"22px"}}>{props.title}</Card.Title>
                    <Card.Text  style={{fontFamily: "Times New Roman",opacity: "0.8"}} >
                        {head}
                    </Card.Text>
                </Card.Body>
            </Card>
        </a>
    );
}