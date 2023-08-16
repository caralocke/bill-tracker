import { ADD_BILL, DELETE_BILL } from "../actions/billActions.js";
import bills from './../data.js'

const initialState = {
  bills: []
}


const reducer = (state = initialState, action) => { 
  console.log('action.payload', action.payload)
  
  switch(action.type) {
    case DELETE_BILL:
      return {
        bills: state.bills.filter(item=>(action.payload !== item.id))
      }   
      case ADD_BILL:
        return {
          ...state,
          bills: {...state.bills, ...action.payload}
        }    
        default:
          return state;
        }
      }
      
      export default reducer;
      
      
