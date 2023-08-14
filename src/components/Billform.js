import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill } from '../features/billSlice';
import { v4 as uuid} from 'uuid';

const Billform = () => {
    const dispatch = useDispatch();
    const { isSuccess } = useSelector((state) => state.bill.bills);
    const [inputValue, setInputValue] = useState({billName: '', billAmount: '', dueDate: '' });

    const handleChange = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addBill(inputValue))
    }
  

  return (
    <div>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Bill Name:
              <input type='text' value={inputValue.billName} onChange={handleChange} name='billName' id='billName' placeholder='Enter bill name'/>
            </label>
          </div>
          <div>
            <label>Amount:
              <input type='text' value={inputValue.billAmount} onChange={handleChange} name='billAmount' id='billAmount' data-type='currency' placeholder='$0.00'/>
            </label>
          </div>
          <div>
            <label>Due Date:
              <input type='date' value={inputValue.dueDate} onChange={handleChange} name="dueDate" id='dueDate'/>
            </label>
          </div>
          <button>Submit</button>
        </form>
      </div>
      
    </div>
  )
}

export default Billform;