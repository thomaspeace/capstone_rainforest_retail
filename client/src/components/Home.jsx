import { Row, Container, Col, Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import RegionCarousel from './RegionCarousel';
import "./styles/Home.css";
import React from 'react';
import logo from '../assets/Logo.png';


const Home = () => {
    return (
        <Container>
            <div className="home">
                <Row>
                    <Col className="col-12">
                        <div className="logo-container">
                          <img src={logo} alt="Rainforest Retail Logo" className="logo" />
                        </div>
                    </Col>
                </Row>
                <div className='content'>
                    <Row className='info-cards'>
                        <Col xs={12} md={4}>
                            <Card className='card-class'>
                                <Card.Body className='card-body'>
                                    <Card.Title className='card-title'>Deliveries Today</Card.Title>
                                    <ProgressBar className="custom-progress-bar" animated now={45} label={`${45}%`}/>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card className='card-class'>
                                <Card.Body className='card-body'>
                                    <Card.Title className='card-title'>Completed Routes</Card.Title>
                                    <ProgressBar className="custom-progress-bar" animated now={80} label={`${80}%`}/>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card className='card-class'>
                                <Card.Body className='card-body'>
                                    <Card.Title className='card-title'>Something Else</Card.Title>
                                    <ProgressBar className="custom-progress-bar" animated now={10} label={`${10}%`}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <RegionCarousel />
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>
    );
};

export default Home;
