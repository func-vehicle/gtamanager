import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from '../redux/userInfoSlice';
import popupReducer from '../redux/popupSlice';
import sessionReducer from '../redux/sessionSlice';
import locationReducer from '../redux/locationSlice';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    popupStack: popupReducer,
    session: sessionReducer,
    location: locationReducer,
  },
});
