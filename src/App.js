import React, {useState, useEffect} from 'react';

import { InfoContext, defaultUserInfo, shouldUpdate, updateUserInfo } from './InfoContext';
import Map from './Map';
import InfoTabContainer from './InfoTabContainer';
import { useWindowDimensions } from './Utility';
import Popup, { PopupNewUser, PopupPatchnotes, PopupNewWeek, PopupPaused } from './Popup'

// Emulates a constructor in functional components
// TODO: is this needed for App?
export function useConstructor(callBack = () => {}) {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

const App = () => {
  // Hack solution to allow children to arbitrarily use setState
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
	running: false,
    setState: setNewState,
  };

  const [state, setState] = useState(defaultState);

  const {width} = useWindowDimensions();
  let popupElement = null;
  if (width <= 600) {
    popupElement = <Popup width="100%" height="100%" />;
  }

  // Save application state
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  }, [state.userInfo]);

  // Apply darkMode
  let bodyElement = document.body;
  if (bodyElement != null) {
    if (state.userInfo.settings.app_style === 1) {
      bodyElement.classList.add("darkMode");
    }
    else {
      bodyElement.classList.remove("darkMode");
    }
  }

  return (
    <InfoContext.Provider value={state}>
      <Map />
      <InfoTabContainer />
      {popupElement}
    </InfoContext.Provider>
  );
}

export default App;