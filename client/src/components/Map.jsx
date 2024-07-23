import { useRef , useEffect, useState } from "react";
import TT_API from "../utils/TT_API";
import './styles/Map.css'

/*

    Clusters fetched automatically
    Then can generate routes for those clusters using a button

    Hover on points to display info
    Box next to map to show orders to deliver in correct order


*/

const Map = () => {
    const [map, setMap] = useState(null);
    const [waypoints, setWaypoints] = useState([
        {lng: -0.21472394218691596, lat: 51.51951728901795},
        {lng: -0.1929948386534358, lat: 51.490776221205515},
        {lng: -0.20492147365662977, lat: 51.530631065786665},
    ])
    const mapElement = useRef();

    const londonHub = [-0.15391076496468353, 51.545344674848295]

    useEffect(() => {
        const tt_map = TT_API.getMAP(mapElement, londonHub);
        setMap(tt_map);
        return () => {
            if(tt_map) {
                tt_map.remove();
            }
        }
    }, []);

    const handleGetRoutes = () => {
        const hubPoint = {
            lng: londonHub[0],
            lat: londonHub[1]
        }
        const waypointsWithHub = [hubPoint, ...waypoints, hubPoint];
        setWaypoints(waypointsWithHub);
        TT_API.getROUTE(waypointsWithHub);
    }

    return (
        <>
            <button onClick={handleGetRoutes}>GET ROUTES</button>
            <div ref={mapElement} id="map" className="map"></div>
        </>
    )

}

export default Map;