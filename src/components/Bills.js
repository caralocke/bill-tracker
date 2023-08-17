import React, { useEffect } from 'react'
import { useSelector, getState, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios';
import { getBills, deleteBill } from '../features/billSlice'


export default function Bills() {

  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bill.bills);
  const [newBills, setNewBills] = useState(bills)
  console.log('Bills.js bills',Date.now(), bills);
  const waitTime = 5000;
  const { REACT_APP_BASE_URL } = process.env

  useEffect(() => {
      dispatch(getBills());
  }, []);

  const handleClick = (id) => {
    dispatch(deleteBill(id))
  }


  return (
    <div className='bills-container'>
        <h3>Bills</h3>
        {bills.map(bill => {
          return (
            <div className='bill-container' key={bill.id}>
              <div>
                <div>Name: {bill.billName}</div>
                <div>Amount: ${bill.billAmount}</div>
                <div>Due Date: {bill.dueDate}</div>
              </div>
              <button onClick={()=>handleClick(bill.id)} className='delete-button'>Delete</button>
            </div>
          )
        })}
      </div>
  )
}
