import { useRef , useEffect, useState } from "react";
import TT_API from "../utils/TT_API";
import './styles/Map.css'

const Map = () => {
    const [map, setMap] = useState(null);
    const mapElement = useRef();

    const londonHub = [-0.15391076496468353, 51.545344674848295]

    const waypoints = [
        {lng: -0.21472394218691596, lat: 51.51951728901795},
        {lng: -0.1929948386534358, lat: 51.490776221205515},
        {lng: -0.20492147365662977, lat: 51.530631065786665},
    ]

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
        TT_API.getROUTE(waypoints);
    }

    return (
        <>
            <button onClick={handleGetRoutes}>GET ROUTES</button>
            <div ref={mapElement} id="map" className="map"></div>
        </>
    )

}

export default Map;