import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userInfoReducer from '../redux/userInfoSlice';
import popupReducer from '../redux/popupSlice';
import sessionReducer from '../redux/sessionSlice';
import locationReducer from '../redux/locationSlice';

const save = store => next => action => {
  let result = next(action);
  if (action.type.split("/")[0] === "userInfo") {
    let newUserInfo = store.getState().userInfo;
    localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
  }
  return result;
}

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    popupStack: popupReducer,
    session: sessionReducer,
    location: locationReducer,
  },
  middleware: getDefaultMiddleware().concat(
    save
  )
});
