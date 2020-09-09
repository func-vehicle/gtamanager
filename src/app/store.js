import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userInfoReducer, { setUserInfo } from '../redux/userInfoSlice';
import popupReducer from '../redux/popupSlice';
import sessionReducer from '../redux/sessionSlice';
import locationReducer from '../redux/locationSlice';

import { defaultUserInfo, shouldUpdate, updateUserInfo } from '../InfoContext';
import {
  pushPopup,
  unshiftPopup,
} from '../redux/popupSlice';
import { findRecentWeekly } from '../Utility';

const save = store => next => action => {
  let result = next(action);
  if (action.type.split("/")[0] === "userInfo") {
    let newUserInfo = store.getState().userInfo;
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  }
  return result;
}

const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    popupStack: popupReducer,
    session: sessionReducer,
    location: locationReducer,
  },
  middleware: getDefaultMiddleware().concat(
    save
  ),
});

// Load userInfo, set initial popups
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let recentWeekly = findRecentWeekly();
if (userInfo == null) {
  userInfo = {...defaultUserInfo};
  userInfo.recentFriday = recentWeekly.toUTCString();
  store.dispatch(pushPopup("PopupNewUser"));
}
else {
  if (shouldUpdate(userInfo)) {
    userInfo = updateUserInfo(userInfo);
    store.dispatch(unshiftPopup("PopupPatchnotes"));
  }
  if (recentWeekly.toUTCString() !== userInfo.recentFriday) {
    userInfo.recentFriday = recentWeekly.toUTCString();
    store.dispatch(unshiftPopup("PopupNewWeek"));
  }
  store.dispatch(unshiftPopup("PopupPaused"));
}
store.dispatch(setUserInfo(userInfo));

export default store;