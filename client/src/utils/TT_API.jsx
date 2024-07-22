import * as tt from "@tomtom-international/web-sdk-maps";
import ttServices from "@tomtom-international/web-sdk-services";

const VITE_TOMTOM_API = import.meta.env.VITE_TOMTOM_API;
const VITE_TOMTOM_URL = import.meta.env.VITE_TOMTOM_URL;

let geojson;

export default {
    getMAP: (mapElement) => {
        let routeMap = tt.map({
            key: VITE_TOMTOM_API,
            container: mapElement.current,
            center: [4.899, 52.372],
            zoom: 10
        });

        return () => {
            if (routeMap) {
                 routeMap.remove;
            }
        }
    },
    getROUTE: (waypoints) => {
        ttServices.services.calculateRoute({
            key: VITE_TOMTOM_API,
            locations: waypoints.map(point => `${point.lng},${point.lat}`).join(':')
        }).then(response => {
            geojson = response.toGeoJson();
            return geojson.features;
        })
    },
    getBOUNDS: () => {
        let bounds = new tt.LngLatBounds();
        geojson.features[0].geometry.coordinates.forEach(point => {
            bounds.extend(tt.LngLat.convert(point))
        })
        return bounds;
    }
}