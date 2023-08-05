import { configureStore } from "@reduxjs/toolkit";
import billReducer from '../features/billSlice'

const store = configureStore({
  reducer: {
    bill: billReducer,
  },
})

export default store;