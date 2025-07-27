import { createSlice } from "@reduxjs/toolkit";

let initialState = { count: 0, userName: 'ahmed ali' }

let counterSlice = createSlice({

    name: 'couterSlice',
    initialState,
    reducers: {
        increase: (state, action) => {
            state.count += 1;
        },
        decrease: (state, action) => {
            state.count -= 1;

        },
        increaseByAmount: (state, action) => {

            state.count += action.payload;
        },
    }
});

export let counterReducer = counterSlice.reducer;

export let { increase, decrease, increaseByAmount } = counterSlice.actions;