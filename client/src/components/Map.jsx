import { useRef , useEffect, useState } from "react";
import TT_API from "../utils/TT_API";
import './styles/Map.css'

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
        };
        const waypointsWithHub = [hubPoint, ...waypoints, hubPoint];
        setWaypoints(waypointsWithHub);
        TT_API.getROUTE(waypointsWithHub);
    }

    const handleRemoveWaypoint = (index) => {

        /*
        
        LOGIC:
                Waypoint to be removed becomes new starting waypoint
                Hub is removed from beginning of waypoint array
                New starting waypoint becomes the one removed
                Recalculate route
    
        */

        const newStartWaypoint = waypoints[index];
        let newWaypoints = waypoints.filter((_, i) => i !== index);
        newWaypoints = newWaypoints.shift();
        setWaypoints([newStartWaypoint, newWaypoints]);
        TT_API.getROUTE(waypoints);
    }

    return (
        <>
            <div>
                {waypoints.map((point, index) => (
                    <button key={index}  onClick={() => handleRemoveWaypoint(index)}>REMOVE</button>
                ))}
            </div>
            <button onClick={handleGetRoutes}>GET ROUTES</button>
            <div ref={mapElement} id="map" className="map"></div>
        </>
    )

}

export default Map;