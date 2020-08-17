import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
    pushPopup,
    unshiftPopup
} from './redux/popupSlice.js';

import './html5reset.css';
import './style.css';
import { defaultUserInfo, shouldUpdate, updateUserInfo } from './InfoContext';
import Map from './Map';
import InfoTabContainer from './InfoTabContainer';
import { useWindowDimensions } from './Utility';
import Popup from './Popup';
import { runTick } from './redux/userInfoSlice.js';

const mapStateToProps = (state) => {
  let newProps = {
    appStyle: state.userInfo.settings.app_style,
    running: state.session.running,
  }
  return newProps;
}

const App = (props) => {

  const dispatch = useDispatch();
  
  // Initial setup
  useEffect(() => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo == null) {
      userInfo = {...defaultUserInfo};
      dispatch(pushPopup("PopupNewUser"));
    }
    else {
      if (shouldUpdate(userInfo)) {
        userInfo = updateUserInfo(userInfo);
        dispatch(unshiftPopup("PopupPatchnotes"));
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
        dispatch(unshiftPopup("PopupNewWeek"));
      }
      dispatch(unshiftPopup("PopupPaused"));
    }
  }, [dispatch]);

  // Run tick while running
  useEffect(() => {
    let interval = setInterval(() => {
      if (props.running) {
        dispatch(runTick());
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    }
  }, [dispatch, props.running]);

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
  if (props.appStyle === 1) {
    bodyElement.classList.add("darkMode");
  }
  else {
    bodyElement.classList.remove("darkMode");
  }

  return (
    <React.Fragment>
      <Map />
      <InfoTabContainer />
      {popupElement}
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(App);