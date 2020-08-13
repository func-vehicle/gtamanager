import React, { useContext } from 'react';
import update from 'immutability-helper';

import './html5reset.css';
import './style.css';
import MapIcon from './MapIcon';
import Popup, { PopupSetupMain } from './Popup';
import { InfoContext } from './infoContext';
import { useWindowDimensions } from './Utility';
import mapImage512 from './img/bg-512.jpg';
import mapImage1024 from './img/bg-1024.jpg';
import mapImage2048 from './img/bg-2048.jpg';


function calculateScrollbarWidth(element) {
  if (element != null) {
    return element.offsetWidth - element.clientWidth;
  }
  return 0;
}

const Map = () => {
  const context = useContext(InfoContext);
  const {height, width} = useWindowDimensions();

  let bodyElement = document.body;
  let infoTabElement = document.getElementById("infotab");
  let styles;
  let popupElement = null;

  if (width > 600) {
    bodyElement.classList.add("desktop");
    bodyElement.classList.remove("mobile");
    let scrollWidth = calculateScrollbarWidth(infoTabElement);
    if (infoTabElement != null) {
      infoTabElement.style.width = 220 + scrollWidth + "px";
    }
    let dimension = Math.min(height, width - 220 - scrollWidth);
    styles = {
      height: dimension + "px",
      width: dimension + "px",
    }
    popupElement = <Popup width={dimension} height={dimension} />;
  }
  else {
    bodyElement.classList.add("mobile");
    bodyElement.classList.remove("desktop");
    if (infoTabElement != null) {
      infoTabElement.style.width = "";
    }
    styles = {
      maxHeight: null,
      maxWidth: "100%",
    }
  }

  function showSetupMain() {
    let newStack = [<PopupSetupMain />];
    context.setState((previousState) => update(previousState, {
      popupStack: {$set: newStack}
    }));
  }
  
  return (
    <div id="mapscreen" className="col">
      <div id="map">
        <img
          id="bg"
          src={mapImage512}
          srcSet={mapImage512 + " 512w," + mapImage1024 + " 1024w," + mapImage2048 + " 2048w"}
          draggable="false"
          alt="Satellite view map of San Andreas (GTA V)"
          style={styles}
        />
        <MapIcon business="bunker" />
        <MapIcon business="coke" />
        <MapIcon business="meth" />
        <MapIcon business="cash" />
        <MapIcon business="weed" />
        <MapIcon business="forgery" />
        <MapIcon business="nightclub" />
        <MapIcon business="importExport" />
        <MapIcon business="wheel" />
      </div>
      <div id="options" className="fsz">
				<button className="button toggle start green">Start</button>
				<button className="button audio red">Sound</button>
				<button onClick={showSetupMain} className="button setup red">Setup</button>
			</div>
      {popupElement}
    </div>
  );
}

export default Map;
