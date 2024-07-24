import React, { useState, useEffect } from 'react';
import { Row, Container, Col, Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import RegionCarousel from './RegionCarousel';
import TermsPrivacyPopup from './TermsPrivacyPopup';
import "./styles/Home.css";
import bannerImage from '../assets/rainforest.jpg';
import "./styles/Banner.css";




const Home = () => {

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const termsAccepted = localStorage.getItem('termsAccepted');
        if (!termsAccepted) {
            setShowPopup(true);
        }
    }, []);

    return (
        <>
        {showPopup && <TermsPrivacyPopup onAccept={() => setShowPopup(false)} />}
        <div className="banner-container">
            <div className="text-for-banner">
                <h1>Rainforest Retail</h1>
                <h3>Streamline your route, maximise your delivery</h3>
            </div>
        </div>

        <Container>
            <div className="title">
                <h1>Your Dashboard</h1>
            </div>
            <div className="home">
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
        </>
    );
};

export default Home;

