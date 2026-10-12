import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { IReader } from "../types/reader.types";
import type { RootState } from "./store";

const API_URL = "http://localhost:3001/readers";

type TReaderInput = Omit<
  IReader,
  "id" | "registrationDate" | "booksHistory" | "activeBooks"
>;

type TInitState = {
  readers: IReader[];
  errors: string;
  loading: boolean;
};

const initState: TInitState = {
  readers: [],
  errors: "",
  loading: false,
};

export const fetchReaders = createAsyncThunk<
  IReader[],
  void,
  { rejectValue: string }
>("readers/fetchReaders", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<IReader[]>(API_URL);
    return response.data;
  } catch {
    return rejectWithValue("Не удалось загрузить читателей");
  }
});

export const addReaderAsync = createAsyncThunk<
  IReader,
  TReaderInput,
  { rejectValue: string }
>("readers/addReader", async (reader, { rejectWithValue }) => {
  try {
    const response = await axios.post<IReader>(API_URL, {
      ...reader,
      registrationDate: new Date().toISOString(),
      booksHistory: [],
      activeBooks: [],
    });

    return response.data;
  } catch {
    return rejectWithValue("Не удалось добавить читателя");
  }
});

export const updateReaderAsync = createAsyncThunk<
  IReader,
  IReader,
  { rejectValue: string }
>("readers/updateReader", async (reader, { rejectWithValue }) => {
  try {
    const response = await axios.put<IReader>(
      `${API_URL}/${reader.id}`,
      reader
    );

    return response.data;
  } catch {
    return rejectWithValue("Не удалось сохранить изменения читателя");
  }
});

export const ReaderSlice = createSlice({
  name: "reader",
  initialState: initState,
  reducers: {
    updateReader: (state, action) => {
      const index = state.readers.findIndex(
        (reader) => reader.id === action.payload.id
      );

      if (index !== -1) {
        state.readers[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReaders.pending, (state) => {
        state.loading = true;
        state.errors = "";
      })
      .addCase(fetchReaders.fulfilled, (state, action) => {
        state.loading = false;
        state.readers = action.payload;
      })
      .addCase(fetchReaders.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload ?? "Ошибка загрузки читателей";
      })
      .addCase(addReaderAsync.pending, (state) => {
        state.loading = true;
        state.errors = "";
      })
      .addCase(addReaderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.readers.push(action.payload);
      })
      .addCase(addReaderAsync.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload ?? "Ошибка добавления читателя";
      })
      .addCase(updateReaderAsync.pending, (state) => {
        state.errors = "";
      })
      .addCase(updateReaderAsync.fulfilled, (state, action) => {
        const index = state.readers.findIndex(
          (reader) => reader.id === action.payload.id
        );

        if (index !== -1) {
          state.readers[index] = action.payload;
        }
      })
      .addCase(updateReaderAsync.rejected, (state, action) => {
        state.errors =
          action.payload ?? "Ошибка сохранения изменений читателя";
      });
  },
});

export const getAllReaders = (state: RootState) => state.readers.readers;

export const getCountReaders = (state: RootState) =>
  state.readers.readers.length;

export const getReaderId = (state: RootState, id: string) =>
  state.readers.readers.find((reader) => reader.id === id);

export const { updateReader } = ReaderSlice.actions;