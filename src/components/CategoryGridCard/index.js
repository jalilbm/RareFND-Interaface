import CategoryProjectCard from "../../components/CategoryProjectCard";
import CategoryVerticalCard from "./CategoryVerticalCard";
import CategoryHorizontalCard from "./CategoryHorizontalCard";
import img from "../../assets/carousel/AboutUs.jpg";
import React, { Component } from "react";
import Slider from "react-slick";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./index.css";
import { Carousel } from "bootstrap";

export default function CategoryGridCard(props) {
  const settings = {
    dots: false,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div>
      <div>
        <Row style={{ padding: "3vw", width: "100%", marginTop: "2rem" }}>
          <h1 className="text-center" style={{ fontWeight: "bolder" }}>
            {props.title}
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="descript text-center">
              Discover the artists and organizations using RareFnd to realize
              ambitious projects in visual art and performance.
            </p>
          </div>
        </Row>
      </div>
      <div>
        <Row
          style={{
            padding: "2vw 0vw 0vw 6vw",
            width: "100%",
            height: "100%",
          }}
        >
          <Col md={6}>
            <h3 className="categorygrid">Feature Project</h3>
            <CategoryVerticalCard
              title="Flesh and Soul"
              description="A vulnerable, unapologetic, experiential journey from body shame to compassion through art and mixed media."
              src={img}
              project_owner="djalil"
            />
          </Col>
          <Col md={4} style={{ position: "relative" }}>
            <hr id="hor_separator" />
            <h3 className="categorygrid">Recommended for you</h3>
            <div className="vl"></div>
            <CategoryHorizontalCard
              title="Flesh and Soul"
              project_owner="A vulnerable"
              src={img}
            />
          </Col>
        </Row>
      </div>
      <br />
      <br />
      <hr />
      <div>
        <Row
          style={{
            padding: "2vw 6vw 0vw 6vw",
            width: "100%",
            height: "100%",
          }}
        >
          <Col>
            <h3 className="categorygrid pb-5">Taking Off</h3>
            <Slider {...settings}>
              <div>
                <CategoryVerticalCard
                  src={img}
                  title="Metapolis"
                  description="www.metapolis.studio"
                  imageStyle={{ width: "100px" }}
                />
              </div>
            </Slider>
          </Col>
        </Row>
      </div>
      <hr />
      <div>
        <Row
          xs={1}
          s={2}
          md={2}
          lg={4}
          className="g-4"
          style={{
            padding: "2vw 0vw 0vw 6vw",
            width: "100%",
            height: "100%",
          }}
        >
          <Col>
            <h3 className="categorygrid">Home Stretch</h3>
            <Slider {...settings}>
              <div>
                <CategoryVerticalCard
                  src={img}
                  title="Metapolis"
                  description="www.metapolis.studio"
                />
              </div>
            </Slider>
          </Col>
        </Row>
      </div>
      <hr />
      <div>
        <Row
          style={{
            padding: "2vw 0vw 0vw 6vw",
            width: "100%",
            height: "100%",
          }}
        >
          <Col md={6}>
            <h3 className="categorygrid">All</h3>
            <p className="descript">Explore all art related campaigns.</p>
          </Col>
        </Row>
      </div>
      <div className="mb-5" style={{ minHeight: window.innerHeight }}>
        <Row
          xs={1}
          s={2}
          md={2}
          lg={4}
          className="g-4"
          style={{
            padding: "2vw 0vw 0vw 6vw",
            width: "100%",
            height: "100%",
          }}
        >
          {Array.from(props.categoryProjects).map((_, idx) => (
            <Col>
              <CategoryVerticalCard
                src={img}
                title="Metapolis"
                description="www.metapolis.studio"
                project_owner="ikram"
              />
              {/* <CategoryProjectCard
                head={_.head}
                title={_.title}
                image={img}
                project_id={_.id} />  */}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
