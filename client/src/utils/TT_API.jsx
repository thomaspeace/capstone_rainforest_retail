import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-maps/dist/maps.css'

const VITE_TOMTOM_API = import.meta.env.VITE_TOMTOM_API;
const VITE_TOMTOM_URL = import.meta.env.VITE_TOMTOM_API_URL;

let geojson;
let routeMap;''

export default {
    getMAP: (mapElement, londonHub) => {

        routeMap = tt.map({
            key: VITE_TOMTOM_API,
            container: mapElement.current,
            center: londonHub,
            zoom: 8
        });

        var hubMarker = new tt.Marker().setLngLat(londonHub).addTo(routeMap);

        return routeMap;
    },
    getROUTE: async (waypoints) => {
        waypoints.forEach(location => {
            new tt.Marker().setLngLat(location).addTo(routeMap)
        })

        const createRoute = (points) => {
            ttServices.services.calculateRoute(points).then((response) => {
                const features = response.toGeoJson().features
                features.forEach((feature, index) => {
                    routeMap.addLayer({
                        'id': 'route' + index,
                        'type': "line",
                        'source': {
                            'type': 'geojson',
                            'data': feature
                        },
                        'paint': {
                            'line-color': 'blue',
                            'line-opacity': 0.7,
                            'line-width': 10,
                            'line-dasharray': [1, 0, 1, 0]
                        },
                        'layout': {
                            'line-cap': 'round',
                            'line-join': 'round'
                        }
                    })
                })
            })
        }

        const url = `${VITE_TOMTOM_URL}/routing/waypointoptimization/1/best?key=` + VITE_TOMTOM_API;
        const payload = {
            waypoints: waypoints.map((pointIndex) => {
                return {
                    point: {
                        latitude: pointIndex.lat,
                        longitude: pointIndex.lng
                    }
                }
            })
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log(result)
            let locations = result.optimizedOrder.map((order) => {
                return waypoints[order];
            })
            createRoute({
                key: VITE_TOMTOM_API,
                locations: locations
            })
        } catch (e) {
            console.error('ERR: ', e);
        }
    },
}