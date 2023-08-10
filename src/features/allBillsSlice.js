import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBills: []
};

export const allBillsSlice = createSlice({
  name: 'allBills',
  initialState,
  reducers: {
    addBilltoBills: (state, action) => {
      console.log('state.value', state.value)
    }
  }
});

export const { addBilltoBills } = allBillsSlice.actions;
export default allBillsSlice.reducer;