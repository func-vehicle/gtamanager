import React from 'react';
import './html5reset.css';
import './style.css';
import MapIcon from './MapIcon';
import image from './img/bg-512.jpg'

class Map extends React.Component {
    render() {
        return (
            <div id="mapscreen" className="col">
                <div id="map">
                    <img id="bg" src={image}
                    //srcSet="img/bg-512.jpg 512w, img/bg-1024.jpg 1024w, img/bg-2048.jpg 2048w"
                    draggable="false" alt="Satellite view map of San Andreas (GTA V)" />
                    <MapIcon business="bunker" clickable="true" />
                    <MapIcon business="coke" clickable="true" />
                    <MapIcon business="meth" clickable="true" />
                    <MapIcon business="cash" clickable="true" />
                    <MapIcon business="weed" clickable="true" />
                    <MapIcon business="forgery" clickable="true" />
                    <MapIcon business="nightclub" clickable="true" />
                    <MapIcon business="importExport" clickable="false" />
                    <MapIcon business="wheel" clickable="true" />
                </div>
            </div>
        );
    }
}

export default Map;
