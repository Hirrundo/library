import { configureStore } from "@reduxjs/toolkit";
import { ReaderSlice } from "./rider-slice";
import { BookSlice } from "./book-slice";



export const store=configureStore({
reducer:{
    readers:ReaderSlice.reducer,
    books:BookSlice.reducer
}
});