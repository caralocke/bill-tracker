import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";


const initialState = {
   bills: [],
   loading: false
} 

export const getBills = createAsyncThunk(
  'bills/getBills',
  async (thunkAPI) => {
    const response = await fetch('https://api-for-bills.onrender.com/api/v1/bills')
      .then((data) => {
        return data.json()
      })
    return response
    })






export const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.bills.push(action.payload)
    },
    deleteBill: (state, action) => {
      state.bills.splice(action.payload, 1)
    },
  },
  extraReducers: {
    [getBills.pending]: (state) => {
      state.loading = true
    },
    [getBills.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.bills = payload
    },
    [getBills.rejected]: (state) => {
      state.loading = false
    }
  }
})

export const { addBill, deleteBill, selectAllBills, retreiveBills } = billSlice.actions;
export default billSlice.reducer;