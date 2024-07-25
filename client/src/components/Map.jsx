import { useRef , useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import TT_API from "../utils/TT_API";
import './styles/Map.css'

/*
    ----------------------TODAYS TASKS------------------------

    Clusters fetched automatically - COMPLETED
    Then can generate routes for those clusters using a button - COMPLETED
    CLEAR ROUTE WHEN CLICKING THE BUTTON AGAIN - DONE
    Hover on points to display info - DONE
    Box next to map to show orders to deliver in correct order - DONE

*/

const Map = ({getClusterHelper , regionalHubLat , regionalHubLng}) => {
    const [map, setMap] = useState(null);
    const [clusters, setClusters] = useState(() => {
        const savedClusters = localStorage.getItem('clusters');
        return savedClusters ? JSON.parse(savedClusters) : [];
    });
    const [vanIds, setVanIds] = useState(() => {
        const savedVanIds = localStorage.getItem('vanIds');
        return savedVanIds ? JSON.parse(savedVanIds) : [];
    });
    const mapElement = useRef();

    const hubLocation = [regionalHubLng, regionalHubLat]

    useEffect(() => {
        localStorage.setItem('clusters', JSON.stringify(clusters));
    }, [clusters]);

    useEffect(() => {
        localStorage.setItem('vanIds', JSON.stringify(vanIds));
    }, [vanIds]);

    useEffect(() => {
        const tt_map = TT_API.getMAP(mapElement, hubLocation);
        setMap(tt_map);
        return () => {
            if(tt_map) {
                tt_map.remove();
            }
        }
    }, []);

    const convertClusteredOrdersToWaypoints = (clusteredOrders) => {
        let clusteredOrderRoutes = [];
        let clusteredOrderWaypoints = [];
        let tempVanIdStore = [];
        clusteredOrders.map(clusteredOrder => {
            clusteredOrder.listOfOrders.map(order => {
                const obj = {
                    lng: order.deliveryAddress.longitude,
                    lat: order.deliveryAddress.latitude,
                    orderName: "Order " + order.id,
                    postCode: order.deliveryAddress.postcode,
                    addressLine: order.deliveryAddress.line
                }
                clusteredOrderWaypoints.push(obj);
            })
            clusteredOrderRoutes.push(clusteredOrderWaypoints)
            clusteredOrderWaypoints = []
            tempVanIdStore.push(clusteredOrder.van.id)
        })
        setVanIds(tempVanIdStore);
        tempVanIdStore = []
        return clusteredOrderRoutes;
    }

    const getClusteredList = () => {
        return getClusterHelper();
    }

    const handleOrderClusters = () => {
        if(clusters.length === 0) {
            getClusteredList()
            .then(clusteredOrderList => {
                return convertClusteredOrdersToWaypoints(clusteredOrderList)
            }).then(clusters => {
                setClusters(clusters);
            })
        }
    }

    const handleGetRoute = (index) => {
        const hubPoint = {
            lng: hubLocation[0],
            lat: hubLocation[1]
        }

        clusters.map((cluster, i) => {
            if(i === index) {
                const waypointsWithHub = [hubPoint, ...cluster, hubPoint];
                TT_API.getROUTE(waypointsWithHub);
                return;
            }
        })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="cluster-list-col">
                        <Button className="button button-cluster" onClick={handleOrderClusters}>GET CLUSTERS</Button>
                        <div ref={mapElement} id="map" className="map"></div>
                    </Col>
                    <Col className="cluster-list-col">
                        {clusters.length > 0 && clusters.map((cluster, index) => (
                            <Card className="cluster-list-card" key={index} style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title className="cluster-list-card-title">Order Cluster {index + 1}</Card.Title>
                                    <div className="cluster-button-container">
                                        <Button className="button" key={index} onClick={() => handleGetRoute(index)}>Get Route</Button>
                                        <Link to={`/vans/${vanIds[index]}`} className="van-list-card-button-container">
                                            <Button className='button'>
                                            Go to Van
                                            </Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Map;
