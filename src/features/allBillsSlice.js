import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allBills: [],
  loading: false
};

const getBills = createAsyncThunk(
  'bills/getBills',
  async (thunkAPI) => {
    const response = await fetch(process.env.BASE_URL)
      .then((data) => {
        return data.json()
      })
    return response
})

export const allBillsSlice = createSlice({
  name: 'allBills',
  initialState,
  reducers: {
    addtoBills: (state, action) => {
      console.log('state.value', state.value)
    }
  },
  extraReducers: {
    [getBills.pending]: (state) => {
      state.loading = true
    },
    [getBills.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.bills = payload
      console.log('state.bills', state.bills)
    },
    [getBills.rejected]: (state) => {
      state.loading = false
    }
  }
});

export const { addtoBills } = allBillsSlice.actions;
export default allBillsSlice.reducer;