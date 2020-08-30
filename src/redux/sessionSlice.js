import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'session',
  initialState: {
    running: false,
    banner: ["BannerPaused", {}],
    lastNotified: {
      general: 0,
      bunker: 0,
      coke: 0,
      meth: 0,
      cash: 0,
      weed: 0,
      forgery: 0,
      nightclub: 0,
      importExport: 0,
      wheel: 0,
    },
    updateState: false,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    // func_vehicle: Can reassign state by returning new state
    toggleRunning: (state) => {
      state.running = !state.running;
    },
    setBanner: (state, action) => {
      if (!Array.isArray(action.payload)) {
        action.payload = [action.payload, {}];
      }
      state.banner = action.payload;
    },
    setLastNotified: (state, action) => {
      state.lastNotified[action.payload.type] = action.payload.timestamp;
    },
    toggleUpdateState: (state) => {
      state.updateState = !state.updateState;
    },
  },
});

export const { toggleRunning, setBanner, setLastNotified, toggleUpdateState } = slice.actions;

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
// func_vehicle: will cause rerender if anything in state changes. Do not use.

//export const selectCount = state => state.counter.value;

export default slice.reducer;
