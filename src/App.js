import React, { useState, useEffect, useRef } from 'react';
import update from 'immutability-helper';

import './html5reset.css';
import './style.css';
import { InfoContext, defaultUserInfo, shouldUpdate, updateUserInfo } from './InfoContext';
import Map from './Map';
import { BannerPaused } from './BannerNotification';
import InfoTabContainer from './InfoTabContainer';
import { useWindowDimensions } from './Utility';
import Popup, { PopupNewUser, PopupPatchnotes, PopupNewWeek, PopupPaused } from './Popup';
import tick from './tick';

const App = () => {
  // Allow children to arbitrarily use setState
  let setNewState = (func) => {
    setState(func);
  }

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let popupStack = [];

  if (userInfo == null) {
    userInfo = {...defaultUserInfo};
    popupStack.push(<PopupNewUser />);
  }
  else {
    if (shouldUpdate(userInfo)) {
      userInfo = updateUserInfo(userInfo);
      popupStack.unshift(<PopupPatchnotes />);
    }
    // Check if new week
    // This is called "Friday" but actually it's Thursday in UTC
    var recentFriday = new Date();
    // Use last Friday if Friday today but before 10AM UTC
    if (recentFriday.getUTCDay() === 4 && recentFriday.getUTCHours() < 10) {
      recentFriday.setUTCDate(recentFriday.getUTCDate() - 7);
    }
    // Find recent Friday
    while (recentFriday.getUTCDay() !== 4) {
      recentFriday.setUTCDate(recentFriday.getUTCDate() - 1);
    }
    // Set time to 10AM UTC
    recentFriday.setUTCHours(10);
    recentFriday.setUTCMinutes(0);
    recentFriday.setUTCSeconds(0);
    recentFriday.setUTCMilliseconds(0);
    if (recentFriday.toUTCString() !== userInfo.recentFriday) {
      userInfo.recentFriday = recentFriday.toUTCString();
      popupStack.unshift(<PopupNewWeek />);
    }
    popupStack.unshift(<PopupPaused />);
  }

  // State also contains the updater function so it will be passed down into the context provider
  let defaultState = {
    userInfo: userInfo,
    popupStack: popupStack,
    bannerNotification: <BannerPaused />,
    running: false,
    setState: setNewState,
  };

  // Create the state
  const [state, setState] = useState(defaultState);

  // Use fullscreen popup
  const {width} = useWindowDimensions();
  let popupElement = null;
  let bodyElement = document.body;
  if (width > 600) {
    bodyElement.classList.add("desktop");
    bodyElement.classList.remove("mobile");
  }
  else {
    bodyElement.classList.add("mobile");
    bodyElement.classList.remove("desktop");
    popupElement = <Popup width="100%" height="100%" />;
  }

  // Apply dark mode
  if (state.userInfo.settings.app_style === 1) {
    bodyElement.classList.add("darkMode");
  }
  else {
    bodyElement.classList.remove("darkMode");
  }

  // Save application state
  useEffect(() => {
    //console.log("UPDATING")
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  }, [state.userInfo]);

  // Apply tick
  const runTick = () => {
    //console.log("runTick!")
    //console.log(state);
    if (state.running) {
      let newUserInfo = tick({...state.userInfo});
      setState((previousState) => update(previousState, {
        userInfo: {$set: newUserInfo}
      }));
    }
  }

  let func = useRef(runTick);

  useEffect(() => {
    console.log("useEffect!");
    if (!state.running) return;
    let interval = setInterval(func.current, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [state.running]);

  // TODO: Very ugly, has a 1 second delay, fix this.
  // const intervalID = useRef(null);
  // const upToDate = useRef(state.userInfo);
  // useEffect(() => {
  //   upToDate.current = state.userInfo;
  //   if (intervalID.current == null && state.running) {
  //     intervalID.current = setInterval(() => {
  //       let newUserInfo = tick({...upToDate.current});
  //       setState((previousState) => update(previousState, {
  //         userInfo: {$set: newUserInfo}
  //       }));
  //     }, 1000);
  //   }
  //   else if (intervalID.current != null && !state.running) {
  //     clearInterval(intervalID.current);
  //     intervalID.current = null;
  //   }
  // }, [state.userInfo, state.running]);

  return (
    <InfoContext.Provider value={state}>
      <Map />
      <InfoTabContainer />
      {popupElement}
    </InfoContext.Provider>
  );
}

export default App;