import React from 'react';
import './html5reset.css';
import './style.css';
import MapIcon from './MapIcon';
import image from './img/bg-2048.jpg'

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

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
    </div>
  );
}

export default Map;
