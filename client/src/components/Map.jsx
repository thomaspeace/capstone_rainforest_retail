import { useRef , useEffect } from "react";
import TT_API from "../utils/TT_API";

const Map = () => {

    const mapElement = useRef();

    useEffect(() => {
        const map = TT_API.getMAP(mapElement);
        return map;
    }, []);

    return (
        <div ref={mapElement}></div>
    )

}

export default Map;