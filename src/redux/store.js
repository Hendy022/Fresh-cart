import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice.js";
import productsReducer from './productsSlice'



export let store = configureStore({
    reducer:{
        // waiting for reducers
        counterReducer,
        productsReducer

    }
});

