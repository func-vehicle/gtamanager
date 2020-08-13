import React, {useState, useEffect} from 'react';

import { InfoContext, defaultUserInfo, staticInfo } from './infoContext';
import Map from './Map';
import InfoTabContainer from './InfoTabContainer';
import { useWindowDimensions } from './Utility';
import Popup, {PopupSetupMain} from './Popup'

function loadUserInfo() {
  let storedInfo = localStorage.getItem("userInfo");
  if (storedInfo == null) {
    return defaultUserInfo;
  }
  let userInfo = JSON.parse(storedInfo);
  if (userInfo.version !== staticInfo.version) {
    userInfo = update(userInfo);
  }
  return userInfo;
}

function update(userInfo) {
  if (userInfo.version === "1.0.0") {
		userInfo.audio = {enabled: true};
		userInfo.bunker.name = "Bunker";
		userInfo.coke.name = "Cocaine";
		userInfo.meth.name = "Meth";
		userInfo.cash.name = "Counterfeit Cash";
		userInfo.weed = Object.assign({}, defaultUserInfo.weed);  // This is bad, as defaultUserInfo has changed with updates
		userInfo.forgery = Object.assign({}, defaultUserInfo.forgery);  // Nobody should be on this version though
		userInfo.nightclub.name = "Nightclub";
		userInfo.importExport.name = "Import / Export";
		userInfo.wheel.name = "Lucky Wheel";
		userInfo.bunker.research /= 60000;
		var toUpdate = ["bunker", "coke", "meth", "cash"];
		for (var i = 0; i < toUpdate.length; i++) {
			var business = toUpdate[i];
			userInfo[business].product /= 60000;
			userInfo[business].supplies /= 60000;
		}
		userInfo.version = "1.1.0";
	}
	if (userInfo.version === "1.1.0") {
		userInfo.settings = Object.assign({}, defaultUserInfo.settings);
		userInfo.settings.audio.enabled = userInfo.audio.enabled;
		delete userInfo.audio;
		userInfo.nightclub.sidebar = true;
		userInfo.nightclub.organic = 0;
		userInfo.nightclub.copying = 0;
		userInfo.nightclub.producing.organic = false;
		userInfo.nightclub.producing.copying = false;
		userInfo.version = "1.2.0";
	}
	if (userInfo.version === "1.2.0") {
		userInfo.settings.progress_bar_style = 0;
		userInfo.version = "1.3.0";
	}
	if (userInfo.version === "1.3.0") {
		userInfo.bunker.muted = false;
		userInfo.coke.muted = false;
		userInfo.meth.muted = false;
		userInfo.cash.muted = false;
		userInfo.weed.muted = false;
		userInfo.forgery.muted = false;
		userInfo.nightclub.muted = false;
		userInfo.wheel.muted = false;
		userInfo.wheel.owned = true;
		userInfo.version = "1.4.0";
	}
	if (userInfo.version === "1.4.0") {
		userInfo.version = "1.5.0";
	}
	if (userInfo.version === "1.5.0") {
		if (userInfo.settings.progress_bar_style === 0) {
			userInfo.settings.progress_bar_style = 1;
		}
		userInfo.version = "1.5.3";
	}
	if (userInfo.version === "1.5.3") {
		userInfo.recentFriday = 0;
		userInfo.settings.push_notifications = false;
		userInfo.wheel.notify_while_paused = false;
		userInfo.version = "1.6.0";
	}
	if (userInfo.version === "1.6.0") {
		userInfo.app_style = 0;  // This is incorrect. Remedied in 2.0.0
		userInfo.version = "1.7.0";
	}
	if (userInfo.version === "1.7.0") {
		userInfo.version = "1.7.1";
	}
	if (userInfo.version === "1.7.1") {
		userInfo.version = "1.7.2";
	}
	if (userInfo.version === "1.7.2") {
		userInfo.version = "1.7.3";
	}
	if (userInfo.version === "1.7.3") {
		userInfo.version = "1.8.0";
	}
	if (userInfo.version === "1.8.0") {
		let toUpdate = ["bunker", "coke", "meth", "cash", "weed", "forgery", "nightclub", "importExport", "wheel"];
		for (let i = 0; i < toUpdate.length; i++) {
			let business = toUpdate[i];
			delete userInfo[business].name;
		}
		userInfo.version = "1.9.0";
	}
	if (userInfo.version === "1.9.0") {
		let toUpdate = ["bunker", "coke", "meth", "cash", "weed", "forgery", "nightclub"];
		for (let i = 0; i < toUpdate.length; i++) {
			let business = toUpdate[i];
			userInfo[business].upgrades = {
				equipment: true,
				staff: true,
				security: true
			};
		}
		userInfo.bunker.product = Math.min(userInfo.bunker.product, staticInfo.bunker.maxProduct[2]);
		userInfo.bunker.supplies = Math.min(userInfo.bunker.supplies, staticInfo.bunker.maxSupplies[2]);
		
		userInfo.nightclub.storage_floors = 5;
		userInfo.version = "1.10.0";
	}
	if (userInfo.version === "1.10.0") {
		userInfo.version = "1.10.1";
	}
	if (userInfo.version === "1.10.1") {
		userInfo.version = "1.10.2";
  }
  if (userInfo.version === "1.10.2") {
    if (typeof userInfo.app_style !== undefined) {
      userInfo.settings.app_style = 0;
      delete userInfo.app_style;
    }
    userInfo.version = "2.0.0";
  }
  return userInfo;
}

const App = () => {
  // Hack solution to allow children to arbitrarily use setState
  let setNewState = (func) => {
    setState(func);
  }

  // State also contains the updater function so it will be passed down into the context provider
  let defaultState = {
    userInfo: loadUserInfo(),
    popupStack: [<PopupSetupMain />],
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