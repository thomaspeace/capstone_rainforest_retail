import { useRef , useEffect, useState } from "react";
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import TT_API from "../utils/TT_API";
import './styles/Map.css'

const Map = ({getClusterHelper , regionalHubLat , regionalHubLng , hubRegion}) => {
    const [map, setMap] = useState(null); // stores tomtomapi map instance
    const [clusters, setClusters] = useState(() => {
        // checks local storage for existing cluster data
        let todaysDate = new Date().toLocaleDateString()
        const clusterArr = JSON.parse(localStorage.getItem(`clusterData${hubRegion}`))
        // only use stored data if it's from today and for the right hub
        if(clusterArr && clusterArr[3] === todaysDate && clusterArr[2] === hubRegion){
            return clusterArr[0];
        } else {
            localStorage.removeItem(`clusterData${hubRegion}`)
            return [];
        }
        // clusterArr[0] = array's of delivery points grouped by van
        // clusterArr[1] = van ID's for each cluster
        // clusterArr[2] = the hub region
        // clusterArr[3] = the date
    });
    const [vanIds, setVanIds] = useState(() => {
        let todaysDate = new Date().toLocaleDateString()
        const clusterArr = JSON.parse(localStorage.getItem(`clusterData${hubRegion}`))
        // If it finds data AND it's from today AND it's for the right hub
        if(clusterArr && clusterArr[3] === todaysDate && clusterArr[2] === hubRegion){
            return clusterArr[1];
        } else {
            // otherwise the localStorage is cleared and returns an empty array
            localStorage.removeItem(`clusterData${hubRegion}`)
            return [];
        }
    });
    // the vanIds are then:
    // updated when new clusters are created (in convertClusteredOrdersToWaypoints)
    // used to link each cluster to its van (vans/${vanIds[index]})


    // holds the optimized delivery routes once they're calculated
    const [orderedRoute, setOrderedRoute] = useState([]);
    //reference to the DOM element where the map will display
    const mapElement = useRef();

    // Creates array of the hub's coordinates from the props passed to the component
    const hubLocation = [regionalHubLng, regionalHubLat]

    // runs when component mounts
    useEffect(() => {
        // creates map using our tt_api utility and stores the map instance
        const tt_map = TT_API.getMAP(mapElement, hubLocation);
        setMap(tt_map);
        // cleanup function that runs when component unmounts
        return () => {
            if(tt_map) {
                tt_map.remove();
            }
        }
    }, []);

    // Converts raw cluster data into waypoints that TomTom's API can use
    const convertClusteredOrdersToWaypoints = (clusteredOrders) => {
        let clusteredOrderRoutes = []; // Will hold all routes for all vans
        let clusteredOrderWaypoints = []; // Temporary array for current van's waypoints
        let tempVanIdStore = []; // Store van IDs in order of clusters

        // Loop through each cluster (van with its orders)
        clusteredOrders.map(clusteredOrder => { 
            // Loop through each order in this van's cluster
            clusteredOrder.listOfOrders.map(order => {
                // Create waypoint object for this delivery
                const obj = {
                    lng: order.deliveryAddress.longitude,
                    lat: order.deliveryAddress.latitude,
                    orderName: "Order " + order.id,
                    postCode: order.deliveryAddress.postcode,
                    addressLine: order.deliveryAddress.line
                }
                clusteredOrderWaypoints.push(obj);
            })
            // Add this van's waypoints to main routes array
            clusteredOrderRoutes.push(clusteredOrderWaypoints)
            clusteredOrderWaypoints = [] // Clear for next van
            tempVanIdStore.push(clusteredOrder.van.id)
        })
        setVanIds(tempVanIdStore); // Update van IDs in state
        const dataToSendBack = [clusteredOrderRoutes, tempVanIdStore]
        tempVanIdStore = [] // Cleanup
        return dataToSendBack;
    }

    // Simple wrapper function to get clusters from helper function passed as prop
    const getClusteredList = () => {
        return getClusterHelper();
    }

    // Handles the "GET CLUSTERS" button click
    const handleOrderClusters = () => {
        // Only get new clusters if we don't already have them
        if(clusters.length === 0 && vanIds.length === 0) {
            getClusteredList()
            .then(clusteredOrderList => {
                // Convert raw cluster data to waypoints
                return convertClusteredOrdersToWaypoints(clusteredOrderList)
            }).then(clustersData => {
                // Save clusters to state
                setClusters(clustersData[0]);
                return clustersData
            }).then(clusterData => {
                // Save to localStorage for persistence
                const clusterArr = [clusterData[0], clusterData[1], hubRegion, new Date().toLocaleDateString()]
                localStorage.setItem(`clusterData${hubRegion}`, JSON.stringify(clusterArr))
            })
        }
    }
    // Handles getting optimised route for a specific cluster when "Get Route" is clicked
    const handleGetRoute = (index) => {
        // Create hub location object for start/end point
        const hubPoint = {
            lng: hubLocation[0],
            lat: hubLocation[1]
        }

        // Find the selected cluster and create its route
        clusters.map(async (cluster, i) => {
            if(i === index) {
                // Add hub as first and last point of route
                const waypointsWithHub = [hubPoint, ...cluster, hubPoint];
                // Get optimised route and save to state
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
