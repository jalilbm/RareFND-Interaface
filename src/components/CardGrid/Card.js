import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import "./index.css";


function HomeCard(props) {
  return (
    <Container className={(props.image ? "" : "no-image-card-text")}>
      <Card className="border-0 mt-5 bg-dark" >
        <Row>
          {props.image ?
            (<Col 
              md={props.horizontal ? 6 : 12}
              className={(props.imageLeft ? "order-1" : "order-0")}>
                {/* <div style={{width: "100px", margin: "auto"}}> */}
                <div style={props.multi_cards ? {width: "100px", margin: "auto"} : {}}>
                  <a href={props.buttonHref}>
                    <Card.Img 
                      variant="left h-100" 
                      src={props.image}
                      style={
                        props.multi_cards ? {
                          objectFit: "cover", 
                          width: "100px",
                          margin: "auto"
                          } : {
                          objectFit: "cover",
                          width: "100%",
                        }
                      }
                    />
                  </a>
                </div>
            </Col>) : (null)
          }
          <Col md={(props.image && !props.multi_cards ? 6 : 12)}>
            <Card.Body className="text-light">
              <Card.Title className={(props.multi_cards ? 'display-6 ' : "display-6 ") + "fw-bold text-center mb-5"}>{props.title}</Card.Title>
              <Card.Text className={(props.multi_cards ? 'p ' : "h5 ") + (props.image ? "" : "text-center")}>
                {props.text}
              </Card.Text>              
              {props.buttonText ?
              (<Row>
                <Col className={"mt-5 " + (props.image ? "" : "text-center")}>
                  <Button variant="warning" href={props.buttonHref} size="lg">{props.buttonText}</Button>
                </Col>
              </Row>) : (null)
              }
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default HomeCard;
