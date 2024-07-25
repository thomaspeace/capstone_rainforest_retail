import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/RegionCarousel.css';
import { Button, Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import Weather from './Weather'

const RegionCarousel = ( {countOrdersTodayPerRegion, countTotalCompletedDeliveriesPerRegion, countNotDeliveredPerRegion, countClustersTodayPerRegion, countCompletedClustersPerRegion, countUncompletedClustersPerRegion} ) => {

  const [countOrdersTodayLondon ,setCountOrdersTodayLondon] = useState(0);
  const [countOrdersTodayMidlands ,setCountOrdersTodayMidlands] = useState(0);

  const [countTotalCompletedDeliveriesLondon, setCountTotalCompletedDeliveriesLondon] = useState(0);
  const [countTotalCompletedDeliveriesMidlands, setCountTotalCompletedDeliveriesMidlands] = useState(0);

  const [countNotDeliveredLondon, setCountNotDeliveredLondon] = useState(0);
  const [countNotDeliveredMidlands, setCountNotDeliveredMidlands] = useState(0);

  const [countClustersTodayLondon, setCountClustersTodayLondon] = useState(0);
  const [countClustersTodayMidlands, setCountClustersTodayMidlands] = useState(0);

  const [countCompletedClustersLondon, setCountCompletedClustersLondon] = useState(0);
  const [countCompletedClustersMidlands, setCountCompletedClustersMidlands] = useState(0);

  const [countUncompletedClustersLondon, setCountUncompletedClustersLondon] = useState(0);
  const [countUncompletedClustersMidlands, setCountUncompletedClustersMidlands] = useState(0);

  const [loading, setLoading] = useState(true);


  useEffect( () => {

    setCountOrdersTodayLondon(countOrdersTodayPerRegion(1));
    setCountOrdersTodayMidlands(countOrdersTodayPerRegion(2));

    setCountTotalCompletedDeliveriesLondon(countTotalCompletedDeliveriesPerRegion(1));
    setCountTotalCompletedDeliveriesMidlands(countTotalCompletedDeliveriesPerRegion(2));

    setCountNotDeliveredLondon(countNotDeliveredPerRegion(1));
    setCountNotDeliveredMidlands(countNotDeliveredPerRegion(2));

    setCountClustersTodayLondon(countClustersTodayPerRegion(1));
    setCountClustersTodayMidlands(countClustersTodayPerRegion(2));

    setCountCompletedClustersLondon(countCompletedClustersPerRegion(1));
    setCountCompletedClustersMidlands(countCompletedClustersPerRegion(2));

    setCountUncompletedClustersLondon(countUncompletedClustersPerRegion(1));
    setCountUncompletedClustersMidlands(countUncompletedClustersPerRegion(2));

    setLoading(false);
}, [])

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>

      {console.log("countOrdersTodayLondon = ", countOrdersTodayLondon)}
      {console.log("countOrdersTodayMidlands = ", countOrdersTodayMidlands)}
      {console.log("countTotalCompletedDeliveriesLondon = ", countTotalCompletedDeliveriesLondon)}
      {console.log("countTotalCompletedDeliveriesMidlands = ", countTotalCompletedDeliveriesMidlands)}
      {console.log("countNotDeliveredLondon = ", countNotDeliveredLondon)}
      {console.log("countNotDeliveredMidlands = ", countNotDeliveredMidlands)}
      {console.log("countClustersTodayLondon = ", countClustersTodayLondon)}
      {console.log("countClustersTodayMidlands = ", countClustersTodayMidlands)}
      {console.log("countCompletedClustersLondon = ", countCompletedClustersLondon)}
      {console.log("countCompletedClustersMidlands = ", countCompletedClustersMidlands)}
      {console.log("countUncompletedClustersLondon = ", countUncompletedClustersLondon)}
      {console.log("countUncompletedClustersMidlands = ", countUncompletedClustersMidlands)}

      <Carousel className='carousel-class'>
        <Carousel.Item interval={4000} className="carousel-item">
          <div className="carousel-background">
            <Carousel.Caption>
              <Container>
                <h3 className='region-title-carousel'>London</h3>
                <Row>
                  <Col className='info-cards' xs={12} lg={6}>
                    <Row>
                      <Card className='carousel-card-class'>
                        <Card.Body className='carousel-card-body'>
                          <Card.Title className='carousel-card-title'>Successful Deliveries Today</Card.Title>
                            <ProgressBar className="custom-progress-bar">
                              <ProgressBar animated now={(countTotalCompletedDeliveriesLondon / (countOrdersTodayLondon + countNotDeliveredLondon))*100} label={`${((countTotalCompletedDeliveriesLondon / (countOrdersTodayLondon + countNotDeliveredLondon))*100).toFixed(0)}%`} key={1}/>
                              <ProgressBar variant='warning' animated now={(countNotDeliveredLondon / (countOrdersTodayLondon + countNotDeliveredLondon))*100} label={`${((countNotDeliveredLondon / (countOrdersTodayLondon + countNotDeliveredLondon))*100).toFixed(0)}%`} key={2}/>
                            </ProgressBar>
                        </Card.Body>
                      </Card>
                    </Row>
                    <Row>
                      <Card className='carousel-card-class'>
                        <Card.Body className='carousel-card-body'>
                          <Card.Title className='carousel-card-title'>Successful Order Clusters</Card.Title>
                            <ProgressBar className="custom-progress-bar">
                              <ProgressBar animated now={(countCompletedClustersLondon / countClustersTodayLondon)*100} label={`${((countCompletedClustersLondon / countClustersTodayLondon)*100).toFixed(0)}%`} key={1}/>
                              <ProgressBar variant='warning' animated now={(countUncompletedClustersLondon / countClustersTodayLondon)*100} label={`${((countUncompletedClustersLondon / countClustersTodayLondon)*100).toFixed(0)}%`} key={2}/>
                            </ProgressBar>
                        </Card.Body>
                      </Card>
                    </Row>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Weather city={'London'}/>
                  </Col>
                </Row>
              </Container>
            </Carousel.Caption>
          </div>
        </Carousel.Item>


        <Carousel.Item interval={4000} className="carousel-item">
          <div className="carousel-background">
            <Carousel.Caption>
              <Container>
                <h3 className='region-title-carousel'>Midlands</h3>
                <Row>
                  <Col className='info-cards' xs={12} lg={6}>
                    <Row>
                      <Card className='carousel-card-class'>
                        <Card.Body className='carousel-card-body'>
                          <Card.Title className='carousel-card-title'>Successful Deliveries Today</Card.Title>
                            <ProgressBar className="custom-progress-bar">
                              <ProgressBar animated now={(countTotalCompletedDeliveriesMidlands / (countOrdersTodayMidlands + countNotDeliveredMidlands))*100} label={`${((countTotalCompletedDeliveriesMidlands / (countOrdersTodayMidlands + countNotDeliveredMidlands))*100).toFixed(0)}%`} key={1}/>
                              <ProgressBar variant='warning' animated now={(countNotDeliveredMidlands / (countOrdersTodayMidlands + countNotDeliveredMidlands))*100} label={`${((countNotDeliveredMidlands / (countOrdersTodayMidlands + countNotDeliveredMidlands))*100).toFixed(0)}%`} key={2}/>
                            </ProgressBar>
                        </Card.Body>
                      </Card>
                    </Row>
                    <Row>
                      <Card className='carousel-card-class'>
                        <Card.Body className='carousel-card-body'>
                          <Card.Title className='carousel-card-title'>Successful Order Clusters</Card.Title>
                            <ProgressBar className="custom-progress-bar">
                              <ProgressBar animated now={(countCompletedClustersMidlands / countClustersTodayMidlands)*100} label={`${((countCompletedClustersMidlands / countClustersTodayMidlands)*100).toFixed(0)}%`} key={1}/>
                              <ProgressBar variant='warning' animated now={(countUncompletedClustersMidlands / countClustersTodayMidlands)*100} label={`${((countUncompletedClustersMidlands / countClustersTodayMidlands)*100).toFixed(0)}%`} key={2}/>
                            </ProgressBar>
                        </Card.Body>
                      </Card>
                    </Row>
                  </Col>
                  <Col xs={12} lg={6}>
                    <Weather city={'Birmingham'}/>
                  </Col>
                </Row>
              </Container>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default RegionCarousel;
