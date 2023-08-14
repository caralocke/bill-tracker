import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {v4 as uuid} from 'uuid';
 

export const getBills = createAsyncThunk('bills/getBills', async (thunkAPI) => {
    return axios.get('https://api-for-bills.onrender.com/api/v1/bills', {
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
    })
      .then(res=>res.data)
      .catch(err=>err)
    })


export const addBill = createAsyncThunk('bills/addBills', async(values) => {
     return fetch('https://api-for-bills.onrender.com/api/v1/bills', { method:"POST",
     headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
     },
     body: JSON.stringify({
      id: uuid(),
      billName: values.billName,
      billAmount: values.billAmount,
      dueDate: values.dueDate
     })
    }).then((res) => {
      console.log('res', res)
      res.json()
    }).catch((err) => {
      console.log('err', err)
    })
    }
)





export const billSlice = createSlice({
  name: 'bills',
  initialState: {
    loading: false,
    bills:[],
    error: '',
    isSuccess: ''
  },
  reducers: {
    deleteBill: (state, action) => {
      state.bills.splice(action.payload, 1)
    },
  },
  extraReducers: builder => {
    builder.addCase(getBills.pending, state => {
      state.loading = true
    });

    builder.addCase(getBills.fulfilled, (state, action) => {
      state.loading = false
      state.bills = action.payload
      state.error = ''
    });

    builder.addCase(getBills.rejected, (state, action) => {
      state.loading = false
      state.bills = []
      state.error = action.error.message
    });

    builder.addCase(addBill.fulfilled, (state, action) => {
      state.loading = false
      state.isSuccess = action.payload
    });

    builder.addCase(addBill.rejected, (state, action) => {
      state.loading = false
      state.bills = []
      state.error = action.error.message
    })
  }
})

export const {  deleteBill, selectAllBills, retreiveBills } = billSlice.actions;
export default billSlice.reducer;
