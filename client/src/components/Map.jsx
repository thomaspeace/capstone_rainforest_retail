import { useRef , useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import TT_API from "../utils/TT_API";
import './styles/Map.css'

const Map = ({getClusterHelper , regionalHubLat , regionalHubLng , hubRegion}) => {
    const [map, setMap] = useState(null);
    const [clusters, setClusters] = useState(() => {
        let todaysDate = new Date().toLocaleDateString()
        const clusterArr = JSON.parse(localStorage.getItem(`clusterData${hubRegion}`))
        if(clusterArr && clusterArr[3] === todaysDate && clusterArr[2] === hubRegion){
            return clusterArr[0];
        } else {
            localStorage.removeItem(`clusterData${hubRegion}`)
            return [];
        }
    });
    const [vanIds, setVanIds] = useState(() => {
        let todaysDate = new Date().toLocaleDateString()
        const clusterArr = JSON.parse(localStorage.getItem(`clusterData${hubRegion}`))
        if(clusterArr && clusterArr[3] === todaysDate && clusterArr[2] === hubRegion){
            return clusterArr[1];
        } else {
            localStorage.removeItem(`clusterData${hubRegion}`)
            return [];
        }
    });
    const [orderedRoute, setOrderedRoute] = useState([]);
    const mapElement = useRef();

    const hubLocation = [regionalHubLng, regionalHubLat]

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
        const dataToSendBack = [clusteredOrderRoutes, tempVanIdStore]
        tempVanIdStore = []
        return dataToSendBack;
    }

    const getClusteredList = () => {
        return getClusterHelper();
    }

    const handleOrderClusters = () => {
        if(clusters.length === 0 && vanIds.length === 0) {
            getClusteredList()
            .then(clusteredOrderList => {
                return convertClusteredOrdersToWaypoints(clusteredOrderList)
            }).then(clustersData => {
                setClusters(clustersData[0]);
                return clustersData
            }).then(clusterData => {
                const clusterArr = [clusterData[0], clusterData[1], hubRegion, new Date().toLocaleDateString()]
                localStorage.setItem(`clusterData${hubRegion}`, JSON.stringify(clusterArr))
            })
        }
    }

    const handleGetRoute = (index) => {
        const hubPoint = {
            lng: hubLocation[0],
            lat: hubLocation[1]
        }

        clusters.map(async (cluster, i) => {
            if(i === index) {
                const waypointsWithHub = [hubPoint, ...cluster, hubPoint];
                return setOrderedRoute([...orderedRoute, [index, await TT_API.getROUTE(waypointsWithHub)]])
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
                                    {(orderedRoute) && (
                                        orderedRoute.map((route, i) => {
                                            if(document.getElementById("route-order-list")) {
                                                let deliverOrderList = document.getElementById("route-order-list")
                                                deliverOrderList.remove();
                                            }
                                            if(route[0] === index) {
                                                return (
                                                    <div id = 'route-order-list' key = {i} className="route-order-list">
                                                        <h6>Delivery Order:</h6>
                                                        <ol>
                                                            {route[1].map((order, i) => {
                                                                if(order.orderName != undefined) {
                                                                    return <li key={i}>{order.orderName}</li>
                                                                }
                                                            })}
                                                        </ol>
                                                    </div>
                                                )
                                            }
                                        })
                                    )}
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
