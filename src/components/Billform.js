import React, { useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { addBill } from '../features/billSlice';
import { v4 as uuid} from 'uuid';


const Billform = (props) => {
  console.log('Billform props', props)
  const [bill, setBill] = useState({
    billName: '',
    billAmount: '',
    dueDate:''
  });

  const dispatch = useDispatch();
  const bills = useSelector((state) => state.value);
  

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === 'checkbox' ? e.target.checked : e.target.value

    setBill(prevData => ({...prevData, [name]: value}));
    // setBill({
    //   ...bill,
    //   [e.target.name]: e.target.value
    // })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('bill', JSON.stringify(bill)); /*-----------------console.log here----------------- */
    console.log('bills', JSON.stringify(bills)); /*-----------------console.log here----------------- */
    dispatch(addBill({
      ...bill,
      id: uuid
    }))
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
              <input type='text' value={billAmount }onChange={(e) => handleChange(e)} name='billAmount' id='billAmount' data-type='currency' placeholder='$0.00'/>
            </label>
          </div>
          <div>
            <label>Due Date:
              <input type='date' value={dueDate} onChange={(e) => handleChange(e)} name="dueDate" id='dueDate'/>
            </label>
          </div>
          <button>Submit</button>
        </form>
      </div>
      <div className='bills-container'>
        <h3>Bills</h3>
        <ul>
        </ul>
      </div>
    </div>
  )
}

export default Billform;