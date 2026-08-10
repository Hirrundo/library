
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
            data.isAvailable=true;
            data.description='';
            data.shortDescription='';
            data.readsCount=0;
            data.likesCount=0;
            state.books.push(data)

        }
    }

});
export const getAllBooks=(state)=>state.books.books
export const  getCountBooks=(state)=>state.books.books.lenght
export const {addBook}=BookSlice.actions