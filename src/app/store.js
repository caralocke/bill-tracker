import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import billReducer from '../features/billSlice';
import eventReducer from '../features/eventSlice'
import { devToolsEnhancer } from "redux-devtools-extension";

export default configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
  reducer: {
    bill: billReducer,
    event: eventReducer
  },
  devTools: [devToolsEnhancer({ realtime: true })],
  // enhancers: 
})

