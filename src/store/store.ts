import { configureStore } from "@reduxjs/toolkit";
import { ReaderSlice } from "./rider-slice";


export const store=configureStore({
reducer:{
    readers:ReaderSlice.reducer
}
});