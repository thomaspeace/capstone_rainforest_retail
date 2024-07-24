import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Map from './Map';
import './styles/RegionalHub.css'; // You'll need to create this CSS file



const RegionalHub = ({ handleGetCluster }) => {
    const [hub, setHub] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        const fetchRegionalHub = async () => {
            try {
                const response = await fetch(`http://localhost:8080/regional-hubs/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHub(data);
            } catch (error) {
                console.error("Error fetching regional hub:", error);
            }
        };

        fetchRegionalHub();
    }, [id]);

    if (!hub) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="mt-4 regional-hub">
            <h1 className="mb-4 regional-hub__title text-center">{hub.region} Regional Hub</h1>
            
            <Row className="mb-4">
                <Col>
                    <Card className="regional-hub__map-card">
                        <Card.Body>
                            <Map handleGetCluster={() => handleGetCluster(hub.id)} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="regional-hub__details-card">
                        <Card.Header as="h5">Hub Details</Card.Header>
                        <Card.Body>
                            <p>Address: {hub.addressModel.line}</p>
                            <p>Postcode: {hub.addressModel.postcode}</p>
                            <p>Latitude: {hub.addressModel.latitude}</p>
                            <p>Longitude: {hub.addressModel.longitude}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="regional-hub__stats-card">
                        <Card.Header as="h5">Delivery Stats</Card.Header>
                        <Card.Body>
                            <p>Total Orders: 50</p>
                            <p>Delivered: 30</p>
                            <p>In Transit: 15</p>
                            <p>Pending: 5</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row>
                <Col>
                    <Card className="regional-hub__action-card">
                        <Card.Body className="text-center">
                            <Button variant="primary" className="me-2 regional-hub__button" onClick={() => handleGetCluster(hub.id)}>
                                Get Clusters
                            </Button>
                            <Button variant="secondary" className="regional-hub__button">Optimize Routes</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegionalHub;
