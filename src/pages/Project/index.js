import main from '../../assets/carousel/main.jpeg';
import 'bootstrap/dist/css/bootstrap.css';
import MainCard from '../../components/CardGrid/Card.js';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/esm/Container';


export default function Project() {
  return (
    <div className="post" style={{height: '1000px'}}>
      <MainCard
        image={main}
        title="Key Partnerships"
        text="Key partnerships to be announced with some of the leading names in the industry across the charity space.
        Stay tuned to our socials as some of the biggest partnerships in the crowdfunding space are to be announced, and you have the chance to get involved too!"
        imageLeft={false}
        horizontal={true}
        center_card_text={true}
        image_height={window.innerHeight / 2}
        project_header={true}
        project_title={true}
        backgroudColor="black"
      />
    </div>
  )
}
