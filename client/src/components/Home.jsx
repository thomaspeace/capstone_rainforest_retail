import { Row, Container, Col, Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import RegionCarousel from './RegionCarousel';
import "./styles/Home.css";
import React, { useEffect, useState } from 'react';
import bannerImage from '../assets/rainforest.jpg';
import "./styles/Banner.css";


const Home = ({orders}) => {

    const[totalCompletedDeliveries, setTotalCompletedDeliveries] = useState(0)
    const[totalOrdersToday, setTotalOrdersToday] = useState(0)
    const [loading, setLoading] = useState(true);

    const countTotalCompletedDeliveries = () => {
        let count = orders.filter((order) => order.dateToDeliver === new Date().toISOString().split('T')[0] && order.deliveryStatus === "DELIVERED").length;
        console.log("completed orders today " + count);
        setTotalCompletedDeliveries(count)
    }

    const countOrdersToday = () => {
        let count = orders.filter((order) => order.dateToDeliver === new Date().toISOString().split('T')[0]).length;
        console.log("orders today " + count);
        setTotalOrdersToday(count)
    }

    useEffect( () => {
        countTotalCompletedDeliveries();
        countOrdersToday();
        setLoading(false);
    }, [])


    if (loading) {
        return <p>Loading...</p>;
      }

    return (
        <>
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
                                    <ProgressBar className="custom-progress-bar" animated now={(totalCompletedDeliveries / totalOrdersToday)*100} label={`${((totalCompletedDeliveries / totalOrdersToday)*100).toFixed(0)}%`}/>
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

