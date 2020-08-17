import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userInfoReducer from '../redux/userInfoSlice';
import popupReducer from '../redux/popupSlice';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    popupStack: popupReducer,
  },
  // Prevent error when storing a React element string equivalent
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
