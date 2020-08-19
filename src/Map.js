import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    pushPopup,
    clearStack,
} from './redux/popupSlice.js';
import {
  toggleNotifications,
} from './redux/userInfoSlice.js';
import {
  toggleRunning,
  setBanner,
} from './redux/sessionSlice.js';

import MapIcon from './MapIcon';
import MapGhostIcon, { MapPlaceableIcon } from './MapGhostIcon';
import BannerNotification from './BannerNotification';
import Popup from './Popup';
import { staticInfo } from './InfoContext';
import { useWindowDimensions } from './Utility';
import { setFirstTickTime } from './tick';
import mapImage512 from './img/bg-512.jpg';
import mapImage1024 from './img/bg-1024.jpg';
import mapImage2048 from './img/bg-2048.jpg';
import { setCoordinates } from './redux/locationSlice.js';

export const MapSetLocation = connect((state) => {
  let newProps = {
    business: state.location.business,
    mode: state.location.mode,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  // For custom
  const container = document.getElementById("bg");

  const [state, setState] = useState([null, null]);
  const [placing, setPlacing] = useState(true);
  const [limits, setLimits] = useState({
    top: 18,
    left: 18,
    bottom: container.offsetHeight - 18,
    right: container.offsetWidth - 18,
  });

  // So window resizing is taken into account
  const { width } = useWindowDimensions();
  useEffect(() => {
    setLimits({
      top: 18,
      left: 18,
      bottom: container.offsetHeight - 18,
      right: container.offsetWidth - 18,
    })
  }, [width, container]);

  // Ensure position unset when changing modes
  useEffect(() => {
    dispatch(setCoordinates([null, null]));
  }, [dispatch, props.mode]);
  
  useEffect(() => {
    if (props.mode === 1 && !placing) {
      // Unset position, user wants to place again
      const togglePlacing = (e) => {
        dispatch(setCoordinates([null, null]));
        setPlacing(!placing);
      }
      const placeIcon = document.getElementById("icon-placing");
      placeIcon.addEventListener("click", togglePlacing);

      return () => {
        placeIcon.removeEventListener("click", togglePlacing);
      }
    }
    else if (props.mode === 1) {
      const updatePosition = (e) => {
        let xAllowed = e.clientX > limits.left && e.clientX < limits.right;
        let yAllowed = e.clientY > limits.top && e.clientY < limits.bottom;
        if (xAllowed && yAllowed) {
          let xPos = e.clientX/container.offsetWidth * 100;
          let yPos = e.clientY/container.offsetHeight * 100;
          setState([xPos, yPos]);
        }
      }

      const togglePlacing = (e) => {
        dispatch(setCoordinates(state));
        setPlacing(!placing);
      }

      document.body.addEventListener("mousemove", updatePosition);
      container.addEventListener("click", togglePlacing);

      console.log("ACTIVE")

      return () => {
        document.body.removeEventListener("mousemove", updatePosition);
        container.removeEventListener("click", togglePlacing);
      }
    }
  }, [dispatch, container, props.mode, placing, limits, state]);

  // Select
  if (props.mode === 0) {
    let locations = staticInfo[props.business].locations;
    let iconArray = [];

    for (let i = 0; i < locations.length; i++) {
      iconArray.push(<MapGhostIcon business={props.business} index={i} key={i} />)
    }
    return iconArray;
  }
  // Custom
  else {
    return <MapPlaceableIcon business={props.business} x={state[0]} y={state[1]} />;
  }
  
});

export const MapRegular = connect((state) => {
  let newProps = {
    audioEnabled: state.userInfo.settings.audio.enabled,
    running: state.session.running,
  }
  return newProps;
})((props) => {

  const dispatch = useDispatch();

  function handleRunning() {
    if (props.running) {
      dispatch(clearStack());
      dispatch(pushPopup("PopupPaused"));
      dispatch(setBanner("BannerPaused"));
    }
    else {
      dispatch(setBanner(null));
    }
    setFirstTickTime();
    dispatch(toggleRunning());
  }

  function showSetupMain() {
    dispatch(pushPopup("PopupSetupMain"));
  }

  let toggleButton;
  if (!props.running) {
    toggleButton = <button onClick={handleRunning} className="button toggle green">Start</button>;
  }
  else {
    toggleButton = <button onClick={handleRunning} className="button toggle blue">Pause</button>;
  }

  return (
    <React.Fragment>
      <MapIcon business="bunker" />
      <MapIcon business="coke" />
      <MapIcon business="meth" />
      <MapIcon business="cash" />
      <MapIcon business="weed" />
      <MapIcon business="forgery" />
      <MapIcon business="nightclub" />
      <MapIcon business="importExport" />
      <MapIcon business="wheel" />
      <div id="options" className="fsz">
        {toggleButton}
        <button onClick={() => dispatch(toggleNotifications())} className={"button audio red" + (!props.audioEnabled ? " off" : "")}>Sound</button>
        <button onClick={showSetupMain} className="button setup red">Setup</button>
      </div>
    </React.Fragment>
  );
});

const mapStateToProps = (state) => {
  let newProps = {
    banner: state.session.banner,
  }
  return newProps;
}

const Map = (props) => {

  const {width} = useWindowDimensions();

  let mapDetails;
  if (props.banner[0] == null || props.banner[0] === "BannerPaused") {
    mapDetails = <MapRegular />;
  }
  else {
    mapDetails = <MapSetLocation />;
  }

  let popupElement = null;
  if (width > 600) {
    popupElement = <Popup />;
  }
  
  return (
    <div>
      <div id="map">
        <img
          id="bg"
          src={mapImage512}
          srcSet={mapImage512 + " 512w," + mapImage1024 + " 1024w," + mapImage2048 + " 2048w"}
          draggable="false"
          alt="Satellite view map of San Andreas (GTA V)"
        />
        {mapDetails}
        <BannerNotification />
        {popupElement}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Map);
