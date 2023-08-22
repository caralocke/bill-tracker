import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: []
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {}
});

export default eventSlice.reducer;
