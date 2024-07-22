import * as tt from "@tomtom-international/web-sdk-maps";

const VITE_TOMTOM_API = import.meta.env.VITE_TOMTOM_API;

export default {
    getMAP: (mapElement) => {
        let routeMap = tt.map({
            key: VITE_TOMTOM_API,
            container: mapElement.current
        });

        return () => {
            if (routeMap) {
                routeMap.remove();
            }
        }
    }
}