import React, { useState, useEffect } from 'react';
import { Row, Container, Col, Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import RegionCarousel from './RegionCarousel';
import TermsPrivacyPopup from './TermsPrivacyPopup';
import "./styles/Home.css";
import bannerImage from '../assets/rainforest.jpg';
import "./styles/Banner.css";



const Home = ({orders, vans}) => {

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const termsAccepted = localStorage.getItem('termsAccepted');
        if (!termsAccepted) {
            setShowPopup(true);
        }
    }, []);
  
    const[totalCompletedDeliveries, setTotalCompletedDeliveries] = useState(0)
    const[totalCompletedNotDelivered, setTotalNotDelivered] = useState(0)
    const[totalOrdersToday, setTotalOrdersToday] = useState(0)
    const[totalCompletedClusters, setTotalCompletedClusters] = useState(0)
    const[totalUncompletedClusters, setTotalUncompletedClusters] = useState(0)
    const[totalClustersToday, setTotalClustersToday] = useState(1)
    const [loading, setLoading] = useState(true);
  
  


    const countTotalCompletedDeliveries = () => {
        let count = orders.filter((order) => order.dateToDeliver === new Date().toISOString().split('T')[0] && order.deliveryStatus === "DELIVERED").length;
        console.log("completed orders total = " + count);
        setTotalCompletedDeliveries(count)
    }

    const countNotDelivered = () => {
        let count = 0;
        vans.map(van => {
            if (van.clusteredOrder?.listOfOrders?.length > 0) {
                    van.clusteredOrder.listOfOrders.map(order => {     
                        if ((order.deliveryStatus !== "DELIVERED") && order.dateToDeliver !== new Date().toISOString().split('T')[0]) {
                            count++;
                        }
            })
        }
        setTotalNotDelivered(count)  
        })

    }

    const countOrdersToday = () => {
        let count = orders.filter((order) => order.dateToDeliver === new Date().toISOString().split('T')[0]).length;
        console.log("orders total = " + count);
        setTotalOrdersToday(count)
    }

    const countClustersToday = () => {
        let count = 1;
        let found =  false;
        vans.map(van => {
            if (van.clusteredOrder?.listOfOrders?.length > 0){
                count++;
                found = true;
                console.log(count);
            }
        })
        found ? count-- : count
        setTotalClustersToday(count)
    }

    const countCompletedClusters = () => {
        let completedCount = 0;
        vans.map(van => {
            if (van.clusteredOrder?.listOfOrders?.length > 0) {
                    let completed = true;
                    van.clusteredOrder.listOfOrders.map(order => {     
                        if (order.deliveryStatus !== "DELIVERED") {
                            completed = false;
                        }
            })
            if (completed === true) {
                completedCount++;
            }
        }
        console.log("completed clusters = " + completedCount);
        setTotalCompletedClusters(completedCount)  
        })
    }
    const countUncompletedClusters = () => {
        let uncompletedCount = 0;
        vans.map(van => {
            if (van.clusteredOrder?.listOfOrders?.length > 0) {
                    let uncompleted = true;
                    van.clusteredOrder.listOfOrders.map(order => {     
                        if (order.dateToDeliver !== new Date().toISOString().split('T')[0]) {
                            uncompleted = false;
                        }
            })
            if (uncompleted === false) {
                uncompletedCount++;
            }
        }
        console.log("uncompleted clusters = " + uncompletedCount);
        setTotalUncompletedClusters(uncompletedCount)  
        })
    }



    useEffect( () => {
        countTotalCompletedDeliveries();
        countOrdersToday();
        countClustersToday();
        countCompletedClusters();
        countNotDelivered();
        countUncompletedClusters();
        setLoading(false);
    }, [])


    if (loading) {
        return <p>Loading...</p>;
      }

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
                        <Col xs={12} md={6}>
                            <Card className='card-class'>
                                <Card.Body className='card-body'>
                                    <Card.Title className='card-title'>Successful Deliveries Today</Card.Title>
                                    <ProgressBar className="custom-progress-bar">
                                        <ProgressBar animated now={(totalCompletedDeliveries / totalOrdersToday)*100} label={`${((totalCompletedDeliveries / totalOrdersToday)*100).toFixed(0)}%`} key={1}/>
                                        <ProgressBar variant='warning' animated now={(totalCompletedNotDelivered / totalOrdersToday)*100} label={`${((totalCompletedNotDelivered / totalOrdersToday)*100).toFixed(0)}%`} key={2}/>
                                    </ProgressBar>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6}>
                            <Card className='card-class'>
                                <Card.Body className='card-body'>
                                    <Card.Title className='card-title'>Successful Order Clusters</Card.Title>
                                    <ProgressBar className="custom-progress-bar">
                                        <ProgressBar animated now={(totalCompletedClusters / totalClustersToday) * 100} label={`${((totalCompletedClusters / totalClustersToday) * 100).toFixed(0)}%`} key={1}/>
                                        <ProgressBar variant='warning' animated now={(totalUncompletedClusters / totalClustersToday) * 100} label={`${((totalUncompletedClusters / totalClustersToday) * 100).toFixed(0)}%`} key={2}/>
                                    </ProgressBar>   
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

