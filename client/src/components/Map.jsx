import { useRef , useEffect, useState } from "react";
import TT_API from "../utils/TT_API";

const Map = () => {
    const [map, setMap] = useState(null);
    const mapElement = useRef();

    useEffect(() => {
        const tt_map = TT_API.getMAP(mapElement);
        setMap(tt_map);
        planRoute(tt_map);
    }, []);

    const planRoute = async (mapInstance) => {
        const waypoints = [
            { lng: 4.899, lat: 52.372 }, // Amsterdam
            { lng: 4.479, lat: 51.922 }, // Rotterdam
            { lng: 5.121, lat: 52.090 }  // Utrecht
        ];
        const geo = await TT_API.getROUTE(waypoints);

        if(geo) {
            mapInstance.addLayer({
                id: "route",
                type: "line",
                source: {
                    type: "geojson",
                    data: geo,
                },
                paint: {
                    "line-color": "#00d7ff",
                    "line-width": 8,
                },
            })
        }

        const bounds = TT_API.getBOUNDS();

        map.fitBounds(bounds, {padding: 20})
    }

    return (
        <div ref={mapElement}></div>
    )

}

export default Map;