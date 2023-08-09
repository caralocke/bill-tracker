import React from 'react'
import { useSelector } from 'react-redux'


export default function Bills() {

  const bills = useSelector(state => state.bill.bills);
  
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
