import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
  billName: '',
  billAmount: '',
  dueDate: ''
}]


export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    addBill: (state, action) => {
      // state.value.push(action.payload)
      console.log('state', state)
      console.log('action.payload', action.payload)
    }
  }
})

export const { addBill } = billSlice.actions;
export default billSlice.reducer;