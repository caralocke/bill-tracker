import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bills from "../data";

const fetchBills = createAsyncThunk(
  'bills/fetchBills',
  async () => {
     return fetch(`https://api-for-bills.onrender.com/api/v1/bills`)
      .then((res) => {
        let response = res.json()
        return response
      })
      .catch((error) => {
        return error
      })
  }
)

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