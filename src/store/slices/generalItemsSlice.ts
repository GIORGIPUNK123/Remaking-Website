import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GeneralItemType } from "../../types";
import { useDispatch } from "react-redux";

export const getItems = createAsyncThunk("getItems/get", async () => {
  const { data } = await axios.get("http://localhost:3006/generalItems");
  console.log("data: ", data);
  return data;
});
export const generalItemsSlice = createSlice({
  name: "generalItems",
  initialState: {
    generalItems: [] as GeneralItemType[],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.generalItems = action.payload;
    });
  },
});
