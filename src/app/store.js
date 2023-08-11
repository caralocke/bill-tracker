import { configureStore } from "@reduxjs/toolkit";
import billReducer from '../features/billSlice';
import { devToolsEnhancer } from "redux-devtools-extension";

export default configureStore({
  reducer: {
    bill: billReducer,
  },
  devTools: [devToolsEnhancer({ realtime: true })],
  // enhancers: 
})

