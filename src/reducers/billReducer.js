import { ADD_BILL, DELETE_BILL } from "../actions/billActions";
import bills from './../data.js'

const initialState = {
  bills: bills,
}

let state;

const reducer = (state = initialState, action => {
  console.log('action', action);
  switch(action) {
    case DELETE_BILL:
      return {
        bills: state.bills.filter(item=>(action.payload !== item.id))
      }
    case ADD_BILL:
      return {
        ...state, bills: [...state.bills, action.payload]
      }
    default:
      return state
  }
})

export default reducer;