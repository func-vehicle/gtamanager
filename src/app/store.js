import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from '../redux/userInfoSlice';
import popupReducer from '../redux/popupSlice';
import sessionReducer from '../redux/sessionSlice';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    popupStack: popupReducer,
    session: sessionReducer,
  },
});
