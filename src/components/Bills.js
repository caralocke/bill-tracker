import React, { useEffect } from 'react'
import { useSelector, getState, useDispatch } from 'react-redux'
import { useState } from 'react'
import axios from 'axios';
import { getBills, deleteBill } from '../features/billSlice'


export default function Bills() {

  const dispatch = useDispatch();
  const bills = useSelector((state) => state.bill.bills);
  const [data, setData] = useState(bills);
  console.log('bills.js bills', bills)
  console.log('bills.js data', data)

  useEffect(() => {
    setData(bills)
  }, [bills])

  const handleClick = async (id) => {
    let result = await dispatch(deleteBill(id));
    dispatch(getBills())
  }


  return (
    <div className='bills-container'>
        <h3>Bills</h3>
        {data.map(data => {
          return (
            <div className='bill-container' key={data.id}>
              <div>
                <div>Name: {data.billName}</div>
                <div>Amount: ${data.billAmount}</div>
                <div>Due Date: {data.dueDate}</div>
              </div>
              <button onClick={()=>handleClick(data.id)} className='delete-button'>Delete</button>
            </div>
          )
        })}
      </div>
  )
}
