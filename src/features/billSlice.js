import { createSlice } from "@reduxjs/toolkit";
import bills from "../data";

// const initialState = [{
//   billName: '',
//   billAmount: '',
//   dueDate: ''
// }]
const initialState = {
  bills: bills
}


export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload)
      console.log('billSlice action.payload', action.payload)
    },
    deleteBill: (state, action) => {
      state.bills.splice(action.payload, 1)
    }
  }
})

export const { addBill, deleteBill } = billSlice.actions;
export default billSlice.reducer;