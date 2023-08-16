import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";
import {v4 as uuid} from 'uuid';
const { REACT_APP_BASE_URL } = process.env;

export const getBills = createAsyncThunk('bills/getBills', async (thunkAPI) => {
    return axios.get(`${REACT_APP_BASE_URL}`, {
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
    })
      .then(res=> {
        console.log('getting data!', res.data)
        return res.data;
      })
      .catch(err=>err)
    })


export const addBill = createAsyncThunk('bills/addBills', async(values) => {
     return await fetch(`${REACT_APP_BASE_URL}`, { method:"POST",
     headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
     },
     body: JSON.stringify({
      id: Math.random(),
      billName: values.billName,
      billAmount: values.billAmount,
      dueDate: values.dueDate
     })
    }).then((res) => {
      res.json();
    }).catch((err) => {
      console.log('err', err)
    })
    }
)

export const deleteBill = createAsyncThunk('bills/deleteBill', async(id, thunkAPI) => {
  console.log(`deleting bill with id:`, id);
    await axios.delete(`${REACT_APP_BASE_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
     },
     body: {
      id
     }
    })
    .then((res) => {
      console.log('deleteBill res', res)
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
    })
  }
})

export const { selectAllBills, retreiveBills } = billSlice.actions;
export default billSlice.reducer;
