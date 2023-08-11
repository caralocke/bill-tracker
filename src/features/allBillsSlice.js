import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBills: []
};

export const allBillsSlice = createSlice({
  name: 'allBills',
  initialState,
  reducers: {
    addtoBills: (state, action) => {
      console.log('state.value', state.value)
    }
  }
});

export const { addtoBills } = allBillsSlice.actions;
export default allBillsSlice.reducer;