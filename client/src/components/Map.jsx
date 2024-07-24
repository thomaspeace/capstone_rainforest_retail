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

const Map = ({handleGetCluster}) => {
    const [map, setMap] = useState(null);
    const [routes, setRoutes] = useState([]);
    const mapElement = useRef();

    const londonHub = [-0.15391076496468353, 51.545344674848295]

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
        const tt_map = TT_API.getMAP(mapElement, londonHub);
        setMap(tt_map);
        return () => {
            if(tt_map) {
                tt_map.remove();
            }
        }
    }, []);

    const getClusteredList = () => {
        return handleGetCluster();
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
            lng: londonHub[0],
            lat: londonHub[1]
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