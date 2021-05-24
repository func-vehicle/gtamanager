import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'location',
    initialState: {
        business: null,
        mode: null,
        index: null,
        x: null,
        y: null,
    },
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        // func_vehicle: Can reassign state by returning new state
        resetLocationSetter: (state, action) => {
            return {
                business: null,
                mode: null,
                index: null,
                x: null,
                y: null,
            }
        },
        configureLocationSetter: (state, action) => {
            return {
                business: action.payload,
                mode: 0,
                index: 0,
                x: null,
                y: null,
            }
        },
        toggleMode: (state) => {
            state.mode = state.mode === 0 ? 1 : 0;
        },
        setSelectedIndex: (state, action) => {
            state.index = action.payload;
        },
        setCoordinates: (state, action) => {
            state.x = action.payload[0];
            state.y = action.payload[1];
        },
    },
});

export const {
        resetLocationSetter, clearLocationSetter, configureLocationSetter, toggleMode,
        setSelectedIndex, setCoordinates,
} = slice.actions;

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
