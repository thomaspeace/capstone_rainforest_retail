import { Row, Container, Col } from "react-bootstrap";
import './styles/Home.css';
import RegionCarousel from "./RegionCarousel";
import React from 'react';
import logo from '../assets/Logo.png';



const Home = () => {

    return(
        <Container>
            <div className="home">
                <Row>
                    <Col className="col-12">
                        <div className="logo-container">
                          <img src={logo} alt="Rainforest Retail Logo" className="logo" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                    <p>Text</p>
                    </Col>
                    <Col xs={12} md={4}>
                    <p>Text</p>
                    </Col>
                </Row>
                <Row>
                    <RegionCarousel/>
                </Row>
                <p>This is the home page of our delivery managemnt system</p>
            </div>
        </Container>

    )
};

export default Home;