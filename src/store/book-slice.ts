import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IBook } from "../types/book.types";
import type { RootState } from "./store";

const API_URL = "http://localhost:3001/books";

type TInitStateBooks = {
  books: IBook[];
  errors: string;
  loading:boolean;
};

type TBookInput = Omit<IBook, "year"> & {
  year: number | string;
};

type TNewBookInput = Omit<
  TBookInput,
  "id" | "isAvailable" | "readsCount" | "likesCount"
>;

const initStateBooks: TInitStateBooks = {
  books: [],
  errors: "",
  loading:false
};

// Получение списка книг
export const fetchBooks = createAsyncThunk<
  IBook[],
  void,
  { rejectValue: string }
>("books/fetchBooks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IBook[]>(API_URL);
    return response.data;
  } catch {
    return rejectWithValue("Не удалось загрузить книги");
  }
});

// Добавление книги
export const addBookAsync = createAsyncThunk<
  IBook,
  TNewBookInput,
  { rejectValue: string }
>("books/addBook", async (book, { rejectWithValue }) => {
  try {
    const response = await axios.post<IBook>(API_URL, {
      ...book,
      year: Number(book.year),
      isAvailable: true,
      readsCount: 0,
      likesCount: 0,
    });

    return response.data;
  } catch {
    return rejectWithValue("Не удалось добавить книгу");
  }
});

// Редактирование книги
export const updateBookAsync = createAsyncThunk<
  IBook,
  TBookInput,
  { rejectValue: string }
>("books/updateBook", async (book, { rejectWithValue }) => {
  try {
    const response = await axios.put<IBook>(
      `${API_URL}/${book.id}`,
      {
        ...book,
        year: Number(book.year),
      }
    );

    return response.data;
  } catch {
    return rejectWithValue("Не удалось изменить книгу");
  }
});

export const BookSlice = createSlice({
  name: "book",
  initialState: initStateBooks,
  reducers: {},
 extraReducers: (builder) => {
  builder
    .addCase(fetchBooks.pending, (state) => {
      state.loading = true;
      state.errors = "";
    })
    .addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.books = action.payload;
    })
    .addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload ?? "Ошибка загрузки книг";
    })
    .addCase(addBookAsync.pending, (state) => {
      state.loading = true;
      state.errors = "";
    })
    .addCase(addBookAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.books.push(action.payload);
    })
    .addCase(addBookAsync.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload ?? "Ошибка добавления книги";
    })
    .addCase(updateBookAsync.pending, (state) => {
      state.loading = true;
      state.errors = "";
    })
    .addCase(updateBookAsync.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );

      if (index !== -1) {
        state.books[index] = action.payload;
      }
    })
    .addCase(updateBookAsync.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload ?? "Ошибка изменения книги";
    });
},
});

// Селекторы
export const getAllBooks = (state: RootState) => state.books.books;

export const getCountBooks = (state: RootState) =>
  state.books.books.length;

export const getBookId = (state: RootState, id: string) =>
  state.books.books.find((book) => book.id === id);