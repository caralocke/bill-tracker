import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill } from '../features/billSlice';
import { v4 as uuid} from 'uuid';

const Billform = () => {


  const billData = useSelector((state) => state.bill.bills)
  const [bills, setBills] = useState(billData)
  console.log('bills Billform.js', bills)


  
  const [bill, setBill] = useState({
    billName: '',
    billAmount: '',
    dueDate:'',
  });

  useEffect(() => {
    setBills(billData)
    console.log('bills inside useEffect Billform.js', billData)
  },[])


  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === 'checkbox' ? e.target.checked : e.target.value
    

    setBill(bill => ({...bill, [name]: value}));
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addBill({
      id: uuid(),
      billName,
      billAmount,
      dueDate
    }));
  }

  

  const { billName, billAmount, dueDate } = bill;

  return (
    <div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Bill Name:
              <input type='text' value={billName} onChange={handleChange} name='billName' id='billName' placeholder='Enter bill name'/>
            </label>
          </div>
          <div>
            <label>Amount:
              <input type='text' value={billAmount} onChange={handleChange} name='billAmount' id='billAmount' data-type='currency' placeholder='$0.00'/>
            </label>
          </div>
          <div>
            <label>Due Date:
              <input type='date' value={dueDate} onChange={handleChange} name="dueDate" id='dueDate'/>
            </label>
          </div>
          <button>Submit</button>
        </form>
      </div>
      
    </div>
  )
}

export default Billform;