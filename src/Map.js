import React, { useEffect } from 'react';
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
import MapGhostIcon from './MapGhostIcon';
import BannerNotification from './BannerNotification';
import Popup from './Popup';
import { staticInfo } from './InfoContext';
import { useWindowDimensions } from './Utility';
import { setFirstTickTime } from './tick';
import mapImage512 from './img/bg-512.jpg';
import mapImage1024 from './img/bg-1024.jpg';
import mapImage2048 from './img/bg-2048.jpg';

export const MapSetLocation = connect((state) => {
  let newProps = {
    business: state.location.business,
    mode: state.location.mode,
    index: state.location.index,
  }
  return newProps;
})((props) => {

  let locations = staticInfo[props.business].locations;
  let iconArray = [];
  
  if (props.mode === 0) {
    for (let i = 0; i < locations.length; i++) {
      iconArray.push(<MapGhostIcon business={props.business} index={i} selected={i === props.index} key={i} />)
    }
    return iconArray;
  }
  else {
    useEffect(() => {
      console.log("TEST");
    }, []);
    return null;
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
