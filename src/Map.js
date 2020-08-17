import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    pushPopup,
    clearStack,
} from './redux/popupSlice.js';
import {
  toggleNotifications,
} from './redux/userInfoSlice.js';
import update from 'immutability-helper';

import MapIcon from './MapIcon';
import BannerNotification from './BannerNotification';
import Popup, { PopupSetupMain, PopupPaused } from './Popup';
import { InfoContext } from './InfoContext';
import { useWindowDimensions } from './Utility';
import { setFirstTickTime } from './tick';
import mapImage512 from './img/bg-512.jpg';
import mapImage1024 from './img/bg-1024.jpg';
import mapImage2048 from './img/bg-2048.jpg';

const mapStateToProps = (state) => {
  let newProps = {
    audioEnabled: state.userInfo.settings.audio.enabled,
  }
  return newProps;
}

const Map = (props) => {
  const context = useContext(InfoContext);
  const dispatch = useDispatch();

  function toggleRunning() {
    let newRunning = !context.running;
    if (!newRunning) {
      dispatch(clearStack());
      dispatch(pushPopup(<PopupPaused />))
    }
    setFirstTickTime();
    context.setState((previousState) => update(previousState, {
      running: {$set: newRunning}
    }));
  }

  function toggleNotifications2() {
    dispatch(toggleNotifications());
  }

  function showSetupMain() {
    dispatch(pushPopup(<PopupSetupMain />))
  }

  const {width} = useWindowDimensions();

  let popupElement = null;
  if (width > 600) {
    popupElement = <Popup />;
  }

  let toggleButton;
  if (!context.running) {
    toggleButton = <button onClick={toggleRunning} className="button toggle green">Start</button>;
  }
  else {
    toggleButton = <button onClick={toggleRunning} className="button toggle blue">Pause</button>;
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
        <MapIcon business="bunker" />
        <MapIcon business="coke" />
        <MapIcon business="meth" />
        <MapIcon business="cash" />
        <MapIcon business="weed" />
        <MapIcon business="forgery" />
        <MapIcon business="nightclub" />
        <MapIcon business="importExport" />
        <MapIcon business="wheel" />
        <BannerNotification />
        <div id="options" className="fsz">
          {toggleButton}
          <button onClick={toggleNotifications2} className={"button audio red" + (!props.audioEnabled ? " off" : "")}>Sound</button>
          <button onClick={showSetupMain} className="button setup red">Setup</button>
        </div>
        {popupElement}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Map);
