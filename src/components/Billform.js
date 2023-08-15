import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill, getBills } from '../features/billSlice';
import { v4 as uuid} from 'uuid';

const Billform = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState({billName: '', billAmount: '', dueDate: '' });
    const bills = useSelector((state) => state.bill.bills)
    console.log('Billform.js bills', bills)

    const [newData, setNewData] = useState(bills)

    useEffect(() => {
      setNewData(bills)
      console.log('newData', newData)
    },[bills])

    const handleChange = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addBill(inputValue))
      console.log('handleSubmit inputValue', inputValue)
    }
  

  return (
    <div>
      <div className='form-container'>
        <div>
          <h3>Add a New Bill</h3>
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
      
    </div>
  )
}

export default Billform;