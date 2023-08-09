import { configureStore } from "@reduxjs/toolkit";
import billReducer from '../features/billSlice'

export default configureStore({
  reducer: {
    bill: billReducer,
  },
})

