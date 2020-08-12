import React, { useState, useEffect, useRef } from 'react';

import './html5reset.css';
import './style.css';
import MapIcon from './MapIcon';
import Popup from './Popup';
import image from './img/bg-2048.jpg';
import { useWindowDimensions } from './Utility';

function calculateScrollbarWidth(element) {
  if (element != null) {
    return element.offsetWidth - element.clientWidth;
  }
  return 0;
}

const Map = () => {
  const {height, width} = useWindowDimensions();

  let bodyElement = document.body;
  let infoTabElement = document.getElementById("infotab");
  let styles;
  let popupElement = null;

  const [state, setState] = useState([0, 0]);
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current == null) {
      return;
    }
    setState([ref.current.clientHeight, ref.current.clientWidth]);
  }, [width, height]);

  if (width > 600) {
    bodyElement.classList.add("desktop");
    bodyElement.classList.remove("mobile");
    let scrollWidth = calculateScrollbarWidth(infoTabElement);
    if (infoTabElement != null) {
      infoTabElement.style.width = 220 + scrollWidth + "px";
    }
    styles = {
      maxHeight: height + "px",
      maxWidth: width - 220 - scrollWidth + "px",
    }
    popupElement = <Popup width={state[0]} height={state[1]} />;
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
  
  return (
    <div id="mapscreen" className="col">
      <div id="map">
        <img
          id="bg"
          src={image}
          //srcSet="img/bg-512.jpg 512w, img/bg-1024.jpg 1024w, img/bg-2048.jpg 2048w"
          draggable="false"
          alt="Satellite view map of San Andreas (GTA V)"
          style={styles}
          ref={ref}
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
				<button className="button setup red">Setup</button>
			</div>
      {popupElement}
    </div>
  );
}

export default Map;
