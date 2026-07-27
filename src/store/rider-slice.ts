
import type { IReader } from "../types/reader.types";
import { mockReaders } from "../moks/readers";
import { createSlice } from "@reduxjs/toolkit";
type TInitState={
    readers:IReader[],
    errors:string
}
const initState:TInitState={
    readers:mockReaders,
    errors:''
}
export const ReaderSlice=createSlice({
        name:'reader',
        initialState: initState,
        reducers:{
            addReader:(state,data)=>{
                data.registrationDate='';
                data.booksHistory=[];
                data.activeBooks=[];
                state.readers.push(data)
            }

        }
});
export const getAllReaders= (state)=>state.readers.readers
export const getCountReaders= (state)=>state.readers.readers.length

