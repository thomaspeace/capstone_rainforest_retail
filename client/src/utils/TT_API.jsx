import * as tt from "@tomtom-international/web-sdk-maps";
import * as ttServices from "@tomtom-international/web-sdk-services";
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import '../components/styles/TT_API.css'

const VITE_TOMTOM_API = import.meta.env.VITE_TOMTOM_API;
const VITE_TOMTOM_URL = import.meta.env.VITE_TOMTOM_API_URL;

let hubLocation = null;
let routeMap;
let routeLayerIds = [];
let waypointArr = [];

export default {
    getMAP: (mapElement, hub) => {

        hubLocation = hub;

        routeMap = tt.map({
            key: VITE_TOMTOM_API,
            container: mapElement.current,
            center: hub,
            bearing: 0,
            pitch: 60,
            zoom: 10
        });

        let element = document.createElement("div")
        element.id = "hub-marker"

        let hubMarker = new tt.Marker({element: element}).setLngLat(hub).addTo(routeMap)

        return routeMap;
    },
    getROUTE: async (waypoints) => {

        let optimisedRoute;

        // clear the map of the current route displayed on it, if there is one
        // firstly removes the layers that are overlayed on the map
        // then removes data associated to the map
        if(routeLayerIds.length > 0) {
            routeLayerIds.forEach(id => {
                if(routeMap.getLayer(id)) {
                    routeMap.removeLayer(id)
                }
                if(routeMap.getSource(id)) {
                    routeMap.removeSource(id)
                }
            })
            routeLayerIds = []
        }

        waypointArr.forEach(marker => {marker.remove()})
        waypointArr = []

        waypoints.forEach(location => {
            if(location.lng != hubLocation[0] && location.lat != hubLocation[1]){
                console.log(location.postCode)
                let marker = new tt.Marker().setLngLat(location).addTo(routeMap)
                let popup = new tt.Popup({offset: 50}).setHTML(location.orderName + "<br>PostCode: " + location.postCode + "<br>Address: " + location.addressLine)
                marker.setPopup(popup)
                waypointArr.push(marker)
            }
        })

        const createRoute = (points) => {
            ttServices.services.calculateRoute(points).then((response) => {
                const features = response.toGeoJson().features
                features.forEach((feature, index) => {
                    const layerId = 'route' + index
                    routeMap.addLayer({
                        'id': layerId,
                        'type': "line",
                        'source': {
                            'type': 'geojson',
                            'data': feature
                        },
                        'paint': {
                            'line-color': '#04787B',
                            'line-opacity': 0.7,
                            'line-width': 10,
                            'line-dasharray': [1, 0, 1, 0]
                        },
                        'layout': {
                            'line-cap': 'round',
                            'line-join': 'round'
                        }
                    })
                    routeLayerIds.push(layerId)
                })
            })
            return points.locations
        }

        // calls the waypoint optimisation service provided by tomtom
        // and returns an array of routes in an optimised order
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
            let locations = result.optimizedOrder.map((order) => {
                return waypoints[order];
            })
            return optimisedRoute = await createRoute({
                key: VITE_TOMTOM_API,
                locations: locations
            })
        } catch (e) {
            console.error('ERR: ', e);
        }

    },
}