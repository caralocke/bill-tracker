import React, { useEffect } from 'react'
import { useSelector, getState, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios';
import { getBills, deleteBill } from '../features/billSlice'


export default function Bills() {

  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bill.bills);

  // useEffect(() => {
  //     dispatch(getBills());
  // }, []);

  const handleClick = async (id) => {
    let result = await dispatch(deleteBill(id));
    dispatch(getBills());
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
