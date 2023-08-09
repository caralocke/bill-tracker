import { configureStore } from "@reduxjs/toolkit";
import billReducer from '../features/billSlice';

export default configureStore({
  devTools: true,
  reducer: {
    bill: billReducer,
  },
})

