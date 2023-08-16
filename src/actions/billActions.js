export const DELETE_BILL = "DELETE_BILL";
export const ADD_BILL = "ADD_BILL";

export const deleteBill = (id) => {
  return({type: DELETE_BILL, payload:id});
}

export const addBill = (bill) => {
  return({type: ADD_BILL, payload: bill})
}