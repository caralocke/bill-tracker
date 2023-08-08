import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { addBill } from '../features/billSlice';
import { v4 as uuid} from 'uuid';
import bills from '../data';

const Billform = (props) => {
  useEffect(() => {
    if (props) {
      console.log('Billform props:', props)
    }
  }, [props]);

  const [bill, setBill] = useState({
    billName: '',
    billAmount: '',
    dueDate:'',
    id: ''
  });
 
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === 'checkbox' ? e.target.checked : e.target.value
    

    setBill(bill => ({...bill, [name]: value}));
    // setBill({
    //   ...bill,
    //   [e.target.name]: e.target.value
    // })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('bill to be added:', JSON.stringify(bill)); /*-----------------console.log here----------------- */
    // props.addBill({
    //   ...bills,
    //   id: Date.now(),
    // })
    dispatch(addBill(bill));
    console.log('all bills:', JSON.stringify(bills)); /*-----------------console.log here----------------- */
    // console.log('Billform.js bills', bills)
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
      <div className='bills-container'>
        <h3>Bills</h3>
        {bills.forEach(bill => {
          return (
            <div className='bill'>
              Name: {billName}
              Amount: {billAmount}
              Due Date: {dueDate}
            </div>
          )
        })}
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  console.log('App.js state', state)
  return {
    bills: state.bills
  }
}


export default connect(mapStateToProps, {addBill})(Billform);