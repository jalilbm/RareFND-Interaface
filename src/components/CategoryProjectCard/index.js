import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Art from '../../assets/carousel/Art.jpg';
import { Link } from 'react-router-dom';
import './index.css';





export default function ProjectCard(props){
    const head = (props.head < 80 ? props.head : (props.head.slice(0, 80) + "..."))
    
    
    return(
        <Link to="/" style={{color:"black",textDecoration: "none"}}>
            <Card style={{cursor:"pointer"}} class="card">
                <Card.Img variant="top" src={Art} />
                <Card.Body >
                    <Card.Title  style={{fontFamily: "Times New Roman",fontWeight:"bold",fontSize:"22px"}}>Card title</Card.Title>
                    <Card.Text  style={{fontFamily: "Times New Roman",opacity: "0.8"}} >
                        {head}
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </Link>
    );
}