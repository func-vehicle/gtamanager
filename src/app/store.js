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
if (userInfo == null) {
  userInfo = {...defaultUserInfo};
  store.dispatch(pushPopup("PopupNewUser"));
}
else {
  if (shouldUpdate(userInfo)) {
    userInfo = updateUserInfo(userInfo);
    store.dispatch(unshiftPopup("PopupPatchnotes"));
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
  recentFriday.setUTCHours(10, 0, 0, 0);
  if (recentFriday.toUTCString() !== userInfo.recentFriday) {
    userInfo.recentFriday = recentFriday.toUTCString();
    store.dispatch(unshiftPopup("PopupNewWeek"));
  }
  store.dispatch(unshiftPopup("PopupPaused"));
}
store.dispatch(setUserInfo(userInfo));

export default store;