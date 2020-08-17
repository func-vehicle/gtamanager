import { createSlice } from '@reduxjs/toolkit';
import { convertPopup } from '../Popup';

export const slice = createSlice({
  name: 'popupStack',
  initialState: [],
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    pushPopup: (state, action) => {
      let str = convertPopup(action.payload);
      state.push(str);
    },
    unshiftPopup: (state, action) => {
      let str = convertPopup(action.payload);
      state.unshift(str);
    },
    popPopup: (state) => {
      state.pop();
    },
    clearStack: (state) => {
      state = [];
    },
  },
});

export const { pushPopup, unshiftPopup, popPopup, clearStack } = slice.actions;

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
