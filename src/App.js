import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';

import './html5reset.css';
import './style.css';
import Map from './Map';
import InfoTabContainer from './InfoTabContainer';
import { useWindowDimensions } from './Utility';
import Popup from './Popup';
import {
  runTick,
} from './redux/userInfoSlice';
import {
  toggleUpdateState,
} from './redux/sessionSlice';

const mapStateToProps = (state) => {
  let newProps = {
    appStyle: state.userInfo.settings.app_style,
    running: state.session.running,
    updateState: state.session.running && state.session.updateState,
  }
  return newProps;
}

const App = (props) => {

  const dispatch = useDispatch();

  // Global update interval
  useEffect(() => {
    setInterval(() => {
      dispatch(toggleUpdateState());
    }, 1000);
  }, [dispatch]);

  // Run tick while running
  useEffect(() => {
    if (!props.running) return;
    dispatch(runTick());
  }, [dispatch, props.running, props.updateState]);

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