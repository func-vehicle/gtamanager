import { createSlice } from '@reduxjs/toolkit';
import { defaultUserInfo } from '../InfoContext';

export const slice = createSlice({
  name: 'userInfo',
  initialState: defaultUserInfo,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setResourceValue: (state, action) => {
      state[action.payload.business][action.payload.resource] = action.payload.value;
    },
    setWheelTimestamp: (state, action) => {
      state.wheel.timestamp = action.payload;
    },
    setImportExportCooldown: (state, action) => {
      state.importExport.cooldown = action.payload;
    },
  },
});

export const { setResourceValue, setWheelTimestamp, setImportExportCooldown } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

//export const selectCount = state => state.counter.value;

export default slice.reducer;
