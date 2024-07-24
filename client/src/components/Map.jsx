import { useRef , useEffect, useState } from "react";
import TT_API from "../utils/TT_API";
import './styles/Map.css'

/*
    ----------------------TODAYS TASKS------------------------

    Clusters fetched automatically - COMPLETED
    Then can generate routes for those clusters using a button - COMPLETED
    CLEAR ROUTE WHEN CLICKING THE BUTTON AGAIN - DONE

    Hover on points to display info
    Box next to map to show orders to deliver in correct order

*/

const Map = ({getClusterHelper , regionalHubLat , regionalHubLng}) => {
    const [map, setMap] = useState(null);
    const [routes, setRoutes] = useState([]);
    const mapElement = useRef();

    const hubLocation = [regionalHubLng, regionalHubLat]

    const convertClusteredOrdersToWaypoints = (clusteredOrders) => {
        let clusteredOrderRoutes = [];
        let clusteredOrderWaypoints = [];
        clusteredOrders.map(clusteredOrder => {
            clusteredOrder.listOfOrders.map(order => {
                const obj = {
                    lng: order.deliveryAddress.longitude,
                    lat: order.deliveryAddress.latitude,
                }
                clusteredOrderWaypoints.push(obj);
            })
            clusteredOrderRoutes.push(clusteredOrderWaypoints)
            clusteredOrderWaypoints = [];
        })
        return clusteredOrderRoutes;
    }

    useEffect(() => {
        const tt_map = TT_API.getMAP(mapElement, hubLocation);
        setMap(tt_map);
        return () => {
            if(tt_map) {
                tt_map.remove();
            }
        }
    }, []);

    const getClusteredList = () => {
        return getClusterHelper();
    }

    const handleOrderClusters = () => {
        getClusteredList()
            .then(clusteredOrderList => {
                return convertClusteredOrdersToWaypoints(clusteredOrderList)
            }).then(routes => {
                setRoutes(routes);
            })
    }

    const handleGetRoute = (index) => {
        const hubPoint = {
            lng: hubLocation[0],
            lat: hubLocation[1]
        }

        routes.map((route, i) => {
            if(i === index) {
                const waypointsWithHub = [hubPoint, ...route, hubPoint];
                TT_API.getROUTE(waypointsWithHub);
                return;
            }
        })
    }

    return (
        <>
            <button onClick={handleOrderClusters}>GET CLUSTERS</button>
            {routes.length > 0 && routes.map((route, index) => (
                <button key={index} onClick={() => handleGetRoute(index)}>CLUSTER {index}</button>
            ))}
            <div ref={mapElement} id="map" className="map"></div>
        </>
    )

}

export default Map;