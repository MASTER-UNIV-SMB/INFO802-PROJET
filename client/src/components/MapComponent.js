import React from "react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import WayAPI from "../api/WayAPI";

mapboxgl.accessToken = "pk.eyJ1IjoibWVpbGxldXJzYmllbnNpbW1vIiwiYSI6ImNrYnJva3N0OTJ5NnMyeWw5czEyNGF4cWkifQ.5PHBkbj4G7DEnSLN221TJA";

export default class MapComponent extends React.Component{

    state = {
        waypoints: [],
        loading: false,
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapWrapper,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [5.917781, 45.564601],
            zoom: 12
        });

        const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/driving',
            interactive: false,
            language: "fr"
        });

        directions.on('route', (e) => {
            console.log("route", e);

            if(!this.state.loading){
                this.setState({loading: true});
                WayAPI.listWaypoints(e.route[0].legs[0].steps, this.props.autonomy, e.route[0].distance / 1000).then(waypoints => {
                    this.setState({waypoints: waypoints.stations});

                    waypoints.stations.map((w, i) => {
                        directions.addWaypoint(i, [w.geometry.coordinates]);
                        const el = document.createElement('div');
                        el.className = 'marker';
                        new mapboxgl.Marker(el).setLngLat(w.geometry.coordinates).addTo(map);
                    });

                    setTimeout(() => {
                        this.setState({loading: false});
                    }, 10000);
                });
            }
        });

        directions.on('destination ', (e) => {
            console.log("destination", e);
        });

        map.addControl(directions, 'top-left');


    }

    render() {
        return (
            <div
                ref={el => (this.mapWrapper = el)}
                className="mapWrapper"
            />
        );
    }

}
