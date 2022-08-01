import CategoryProjectCard from '../../components/CategoryProjectCard';
import CategoryCarousel from '../CategoryCarousel';
import Art from '../../assets/carousel/Art.jpg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CategoryGridCard(props) {
    return (
      
      <div className="CategoryGridCard">
        <CategoryCarousel image={props.image} title={props.title} />
        <Row xs={1} md={2} lg={4} className="g-4" style={{marginTop:"50px",marginLeft:"40px",marginRight:"40px"}}>
          {Array.from({ length: 8 }).map((_, idx) => (
          <Col>
            <CategoryProjectCard head="Microsoft Windows [version 10.0.19043.1826]
                                      (c) Microsoft Corporation. Tous droits réservés.
                                      C:\Users\asus\Desktop\khra\RareFND-Interaface>npm install 
                                      added 2 packages, and audited 1469 packages in 8s"/>
          </Col>
          ))}
        </Row>
      </div>
    );
  }
