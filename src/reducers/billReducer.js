import { ADD_BILL, DELETE_BILL } from "../actions/billActions.js";
import bills from './../data.js'

const initialState = {
  bills: bills,
}

// const initialState = {
//   bills: [
//     {id: 0, billName: 'truck', billAmount: '500.00', dueDate: '2023-08-17'},
//     {id: 1, billName: 'mortgage', billAmount: '1200.00', dueDate: '2023-08-01'},
//     {id: 2, billName: 'cell phone', billAmount: '600.00', dueDate: '2023-08-28'},
//   ]
// }

export default function  billReducer(state = initialState, action) {
  console.log('action', action);
  switch(action.type) {
    case DELETE_BILL:
      return {
        bills: state.bills.filter(item=>(action.payload !== item.id))
      }
    case ADD_BILL:
      return {
        bills: state.bills.push(action.payload)
      }
      default:
        return state;
      }
    }
    console.log('ADD_BILL bills', bills)
