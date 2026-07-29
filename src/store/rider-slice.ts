
import type { IReader } from "../types/reader.types";
import { mockReaders } from "../moks/readers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllReaders } from "../services/api";
type TInitState={
    readers:IReader[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    errors:string|null

}
const initState:TInitState={
    readers:[],
    status:'idle',
    errors:''
}
export const getReaders = createAsyncThunk(
  'readers/getAll',
  async () => {
    const data = await fetchAllReaders();
    return data;
  }
);
export const ReaderSlice=createSlice({
        name:'reader',
        initialState: initState,
        reducers:{
          //  addReader:(state,data)=>{
           //     const newReader=data.payload
                
           //     newReader.registrationDate='';
          //      newReader.booksHistory=[];
           //     newReader.activeBooks=[];
           //    state.readers.push(newReader)
          //  },
          //  updateReader:(state)=>{
           //     console.log('jfjfjfjf');
                
            },
            extraReducers:(builder)=>{
                builder
                .addCase(getReaders.pending,(state)=>{state.status='loading'})
                .addCase(getReaders.fulfilled,(state)=>{state.status='succeeded'
                    state.readers=action.payload;
                })
                .addCase(getReaders.rejected,(state)=>{state.status='failed'
                    state.errors=action.error.message|| 'Ошибка загрузки';
                })

            }
        }
});
export const getAllReaders= (state)=>state.readers.readers
export const getCountReaders= (state)=>state.readers.readers.length

// export const {addReader,updateReader}= ReaderSlice.actions


