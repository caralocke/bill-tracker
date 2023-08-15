import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";
import {v4 as uuid} from 'uuid';

const  headers = {
  "Content-Type": "application/json", 
  "Accept": "application/json"
 }
 

export const getBills = createAsyncThunk('bills/getBills', async (thunkAPI) => {
    return axios.get('https://api-for-bills.onrender.com/api/v1/bills', {
      headers
    })
      .then(res=> {
        console.log('getting bills')
        return res.data
      })
      .catch(err=>err)
    })


export const addBill = createAsyncThunk('bills/addBills', async(values) => {
     return await fetch('https://api-for-bills.onrender.com/api/v1/bills', { method:"POST",
     headers,
     body: JSON.stringify({
      id: Math.random(),
      billName: values.billName,
      billAmount: values.billAmount,
      dueDate: values.dueDate
     })
    }).then((res) => {
      console.log('res', res)
      // res.json()
    }).catch((err) => {
      console.log('err', err)
    })
    }
)

export const deleteBill = createAsyncThunk('bills/deleteBill', async(id, thunkAPI) => {
  console.log(`deleting bill with id:`, id);
    await axios.delete(`https://api-for-bills.onrender.com/api/v1/bills/${id}`, {
      headers,
     body: {
      id
     }
    })
    .then((res) => {
      console.log('deleteBill res', res)
    })
})

export const editBill = createAsyncThunk('bills/editBill', async({id, data}) => {
  console.log(`editing bill with id:`, id);
  await axios.put(`https://api-for-bills.onrender.com/api/v1/bills/${id}`, {
    headers, 
    data
  })
  .then (res => {
    console.log('editBill res.data', res.data)
    return res.data
  })
})





export const billSlice = createSlice({
  name: 'bills',
  initialState: {
    loading: false,
    bills:[],
    error: '',
    isSuccess: ''
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getBills.pending, state => {
      state.loading = true
    });

    builder.addCase(getBills.fulfilled, (state, action) => {
      state.loading = false
      state.bills = [...state.bills, action.payload]
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
    });

    builder.addCase(deleteBill.pending, state => {
      state.loading = true
    });

    builder.addCase(deleteBill.fulfilled, (state, action) => {
      const billId = action.payload
      state.bills = state.bills.filter(bill => bill.id !== billId)
      state.loading = false
      state.isSuccess = action.payload
    });

    builder.addCase(deleteBill.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    });

    builder.addCase(editBill.pending, state => {
      state.loading = true
    });

    builder.addCase(editBill.fulfilled, (state, action) => {
      state.loading = false
      state.isSuccess = action.payload
    });

    builder.addCase(editBill.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  }
})

export const { selectAllBills, retreiveBills } = billSlice.actions;
export default billSlice.reducer;
