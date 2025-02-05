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

        // first, save the hub location for future reference
        hubLocation = hub;

        // create the actual map with specific settings
        routeMap = tt.map({
            key: VITE_TOMTOM_API,           // API key
            container: mapElement.current,  // where to put the map within the page
            center: hub,                    // start the map centered on the hub
            bearing: 0,                     // 0 = north
            pitch: 60,                      // tilt
            zoom: 10                        // zoom level
        });

        // create marker denoting the hub
        let element = document.createElement("div")
        element.id = "hub-marker"

        // put the marker on the map
        let hubMarker = new tt.Marker({element: element}).setLngLat(hub).addTo(routeMap)

        // return the configured map
        return routeMap;
    },



    getROUTE: async (waypoints) => {

        let optimisedRoute;

        // ----- CLEAR THE MAP -----
        // clear the map of the current route displayed on it, if there is one
        // firstly removes the layers that are overlayed on the map
        // then removes data associated to the map
        if(routeLayerIds.length > 0) {
            routeLayerIds.forEach(id => {
                // remove existing route lines from the map
                if(routeMap.getLayer(id)) {
                    routeMap.removeLayer(id)
                }
                // remove the data corresponding to the route lines
                if(routeMap.getSource(id)) {
                    routeMap.removeSource(id)
                }
            })
            routeLayerIds = []
        }

        // clean up any existing markers
        waypointArr.forEach(marker => {marker.remove()})
        waypointArr = []


        // ----- ADDING NEW MARKERS -----
        waypoints.forEach(location => {
            // check if it's not the hub location
            if(location.lng != hubLocation[0] && location.lat != hubLocation[1]){
                // create marker for each stop
                let marker = new tt.Marker().setLngLat(location).addTo(routeMap)
                // create a pop up for the stop
                let popup = new tt.Popup({offset: 50}).setHTML(location.orderName + "<br>PostCode: " + location.postCode + "<br>Address: " + location.addressLine)
                marker.setPopup(popup)
                waypointArr.push(marker)
            }
        })

        // ----- DRAWING THE ROUTE -----
        // helper function to draw the route on the map
        const createRoute = (points) => {
            ttServices.services.calculateRoute(points).then((response) => {
                const features = response.toGeoJson().features
                // draw each segment of the route
                features.forEach((feature, index) => {
                    const layerId = 'route' + index
                    // add a new layer to draw the route line
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
        // prepare the data for the TOMTOM api
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
            // get the optimsed route from tomtom
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            // rearrange the waypoints into the optimised order
            let locations = result.optimizedOrder.map((order) => {
                return waypoints[order];
            })
            // draw the optimised route and return the ordered locations
            return optimisedRoute = await createRoute({
                key: VITE_TOMTOM_API,
                locations: locations
            })
        } catch (e) {
            console.error('ERR: ', e);
        }

    },
}