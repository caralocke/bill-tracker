export const ADD_TO_BILLS = "ADD_TO_BILLS";

export const addToBills = (bill) => {
  return ({type: ADD_TO_BILLS, payload: bill})
}