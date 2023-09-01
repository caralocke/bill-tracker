import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export const getBills = createAsyncThunk('bills/getBills', async (thunkAPI) => {
    return axios.get(`${REACT_APP_BASE_URL}/api/v1/bills`, {
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
    })
      .then(res=> {
        return res.data
      })
      .catch(err=>err)
});


export const addBill = createAsyncThunk('bills/addBill', async(values) => {
  return await fetch(`${REACT_APP_BASE_URL}/api/v1/bills`, { method:"POST",
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id: Math.random(),
      bill_name: values.bill_name,
      bill_amount: values.bill_amount,
      due_date: values.due_date
    })
  }).then((res) => {
    res.json();
  }).catch((err) => {
    console.log('err', err);
  })
});

export const deleteBill = createAsyncThunk('bills/deleteBill', async(id, thunkAPI) => {
    await axios.delete(`${REACT_APP_BASE_URL}/api/v1/bills/${id}`, {
    headers: {
      "Content-Type": "application/json", 
      "Accept": "application/json"
     },
     body: {
      id
     }
    })
    .then((res) => {
      res.json();
    });
});

export const updateBill = createAsyncThunk('bills/updateBill', async(id, values) => {
  await axios.delete(`http://localhost:3000/api/v1/bills/${id}`, {
  headers: {
    "Content-Type": "application/json", 
    "Accept": "application/json"
   },
   body: JSON.stringify({
    id: Math.random(),
    bill_name: values.bill_name,
    bill_amount: values.bill_amount,
    due_date: new Date(values.due_date)
  })
  })
  .then((res) => {
    res.json();
  });
});





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
      const bill_id = action.payload
      state.bills = state.bills.filter(bill => bill.id !== bill_id)
      state.loading = false
      state.isSuccess = action.payload
    });

    builder.addCase(deleteBill.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    });
  }
})

export const { selectAllBills, retreiveBills } = billSlice.actions;
export default billSlice.reducer;
