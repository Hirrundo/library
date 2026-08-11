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
                data.payload.registrationDate='2020-08-02';
                data.payload.booksHistory=[];
                data.payload.activeBooks=[];
                state.readers.push(data.payload)
            },
             updateReader:(state,data)=>{
            const index=state.readers.findIndex(reader=>reader.id==data.payload.id)
            if(index!==-1){
                state.readers[index]=data.payload
            }
        }

        }
});
export const getAllReaders= (state)=>state.readers.readers
export const getCountReaders= (state)=>state.readers.readers.length

export const {addReader,updateReader}=ReaderSlice.actions