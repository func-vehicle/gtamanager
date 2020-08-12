import React, {useState, useEffect} from 'react';

import { InfoContext, defaultUserInfo } from './infoContext';
import Map from './Map';
import InfoTabContainer from './InfoTabContainer';
import { useWindowDimensions } from './Utility';
import Popup from './Popup'

function loadUserInfo() {
  let storedInfo = localStorage.getItem("userInfo");
  if (storedInfo == null) {
    return defaultUserInfo;
  }
  return JSON.parse(storedInfo);
}

const App = () => {
  // Hack solution to allow children to arbitrarily use setState
  let setNewState = (func) => {
    setState(func);
  }

  // State also contains the updater function so it will be passed down into the context provider
  let defaultState = {
    userInfo: loadUserInfo(),
    setState: setNewState,
  };

  const [state, setState] = useState(defaultState);

  const {height, width} = useWindowDimensions();
  let popupElement = null;
  if (width <= 600) {
    popupElement = <Popup width="100%" height="100%" />;
  }

  // Save application state
  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  }, [state.userInfo]);

  return (
    <InfoContext.Provider value={state}>
      <Map />
      <InfoTabContainer />
      {popupElement}
    </InfoContext.Provider>
  );
}

export default App;