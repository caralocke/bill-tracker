import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios';


export default function Bills() {
  
  // const bills = useSelector(state => state.bill.bills);
  const endpoint = 'https://api-for-bills.onrender.com/api/v1/bills'
  const [ bills, setBills ] = useState([]);
  const getBills = async () => {
    try {
      const fetchdData = await axios.get(endpoint)
      console.log('fetchData', fetchdData)
      setBills(fetchdData.data)
      console.log('bills after setBills', bills)
    } catch (error){
      console.log(error)
    }
  }
  useEffect(() => {
    window.addEventListener('load', getBills);
    return () => {
      window.removeEventListener('load', getBills);
    };
  },[bills]);

  console.log('Bills.js bills', bills)

  
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
              <button className='delete-button'>Delete</button>
            </div>
          )
        })}
      </div>
  )
}
