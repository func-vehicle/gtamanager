import React, { useContext } from 'react';
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

const Map = (props) => {
  const context = useContext(InfoContext);

  function toggleRunning() {
    let newRunning = !context.running;
    let popupStack = [];
    if (!newRunning) {
      popupStack.push(<PopupPaused />);
    }
    setFirstTickTime();
    context.setState((previousState) => update(previousState, {
      popupStack: {$set: popupStack},
      running: {$set: newRunning}
    }));
  }

  function toggleNotifications() {
    let newValue = !context.userInfo.settings.audio.enabled;
    context.setState((previousState) => update(previousState, {
      userInfo: {
        settings: {
          audio: {
            enabled: {$set: newValue}
          }
        }
      }
    }));
  }

  function showSetupMain() {
    let newStack = [<PopupSetupMain />];
    context.setState((previousState) => update(previousState, {
      popupStack: {$set: newStack}
    }));
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
          <button onClick={toggleNotifications} className={"button audio red" + (!context.userInfo.settings.audio.enabled ? " off" : "")}>Sound</button>
          <button onClick={showSetupMain} className="button setup red">Setup</button>
        </div>
        {popupElement}
      </div>
    </div>
  );
}

export default Map;
