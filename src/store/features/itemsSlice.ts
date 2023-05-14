import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    value: [],
  },
  reducers: {
    addItem: (state, action: { payload: { id: number; token: string } }) => {
      console.log("ADDING ITEM FROM REDUX AND THIS IS ITS ACTION", action);
    },
    editItem: (state, action: { payload: { id: number; token: string } }) => {
      console.log("ADDING ITEM FROM REDUX AND THIS IS ITS ACTION", action);
    },
    deleteItem: (state, action: { payload: { id: number; token: string } }) => {
      console.log("ADDING ITEM FROM REDUX AND THIS IS ITS ACTION", action);
    },
  },
});

export const { addItem, deleteItem, editItem } = itemsSlice.actions;
