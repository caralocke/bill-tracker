import { createSlice } from "@reduxjs/toolkit";
import events from "../data";

const initialState = events;

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {}
});

export default eventSlice.reducer;
