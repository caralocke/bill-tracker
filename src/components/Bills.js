import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBill, getBills } from '../features/billSlice';
import moment from 'moment/moment';


export default function Bills() {

  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bill.bills);

  const handleClick = async (id) => {
    await dispatch(deleteBill(id));
    dispatch(getBills());
  }


  return (
    <div className='bills-container'>
        <h3>Bills</h3>
        {bills.length > 0 ? bills.map(data => {
          const { bill_name, bill_amount, id } = data
          const date = moment(data.due_date).format('MM/DD/YYYY')
          return (
            <div className='bill-container' key={id}>
              <div>
                <div>Name: {bill_name}</div>
                <div>Amount: {bill_amount}</div>
                <div>Due Date: {date}</div>
              </div>
              <button onClick={()=>handleClick(data.id)} className='delete-button'>Delete</button>
            </div>
          ) 
        }): <div>Please add a bill</div>}
      </div>
  )
}
