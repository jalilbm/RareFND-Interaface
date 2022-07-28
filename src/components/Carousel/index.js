import Carousel from 'react-bootstrap/Carousel';
import idea from '../../assets/carousel/idea.jpg';
import main from '../../assets/carousel/main.jpeg';
import help from '../../assets/carousel/help.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Button from 'react-bootstrap/Button';

function carousel() {
  return (
      <Carousel fade controls={false} indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={main}
            alt="Third slide"
          />

          <Carousel.Caption className="top-caption">
            <h1 class="display-1">Rare Find then Fund</h1>
            <br/>
            <br/>
            <h4>
            The only crowdfunding platform that pays YOU to start your fundraising journey! For a limited time only kickstart your campaign with 10% completely free to help your reach your target!
            </h4>
            <br/>
            <br/>
            <br/>
            <Button variant="warning" href="/signup" size="lg">Sign Up - It's FREE</Button>
            <br/>
            <p>or, <a href="/start-project">Start a project!</a></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
  );
}

export default carousel;
