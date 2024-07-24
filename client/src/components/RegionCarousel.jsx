import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/RegionCarousel.css';
import { Button, Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';

const RegionCarousel = () => {
  return (
    <Carousel className='carousel-class'>
      <Carousel.Item interval={4000} className="carousel-item">
        <div className="carousel-background">
          <Carousel.Caption>
          <Container>
            <h3 className='region-title-carousel'>London</h3>
          <Row className='info-cards'>
            <Col xs={12} lg={6}>
                <Card className='carousel-card-class'>
                    <Card.Body className='carousel-card-body'>
                        <Card.Title className='carousel-card-title'>Deliveries Completed Today</Card.Title>
                        <ProgressBar className="custom-progress-bar" animated now={45} label={`${45}%`}/>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} lg={6}>
                <Card className='carousel-card-class'>
                    <Card.Body className='carousel-card-body'>
                        <Card.Title className='carousel-card-title'>Completed Routes</Card.Title>
                        <ProgressBar className="custom-progress-bar" animated now={80} label={`${80}%`}/>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} lg={6}>
                <Card className='carousel-card-class'>
                    <Card.Body className='carousel-card-body'>
                        <Card.Title className='carousel-card-title'>Number of Vans in Fleet</Card.Title>
                        <ProgressBar className="custom-progress-bar" animated now={45} label={`${45}%`}/>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} lg={6}>
                <Card className='carousel-card-class'>
                    <Card.Body className='carousel-card-body'>
                        <Card.Title className='carousel-card-title'>Completed Routes</Card.Title>
                        <ProgressBar className="custom-progress-bar" animated now={80} label={`${80}%`}/>
                    </Card.Body>
                </Card>
            </Col>
          </Row>
          </Container>
          </Carousel.Caption>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default RegionCarousel;
