
import { mockBooks } from "../moks/books";
import { createSlice } from "@reduxjs/toolkit";
import type { IBook } from "../types/book.types";

type TInitStateBooks={
    books:IBook[]
    errors:string
};

const initStateBooks:TInitStateBooks={
        books:mockBooks,
        errors:''
};

export const BookSlice=createSlice({
    name:'book',
    initialState: initStateBooks,
    reducers:{
        addBook:(state,data)=>{
            data.payload.isAvailable=true;
            data.payload.readsCount=0;
            data.payload.likesCount=0;
            state.books.push(data.payload)

        },
        updateBook:(state,data)=>{
            const index=state.books.findIndex(book=>book.id==data.payload.id)
            if(index!==-1){
                state.books[index]=data.payload
            }
        }
    }

});
export const getAllBooks=(state)=>state.books.books
export const  getCountBooks=(state)=>state.books.books.length
export const getBookId=(state,id)=>state.books.books.find((book)=>book.id===id)
export const {addBook, updateBook}=BookSlice.actions