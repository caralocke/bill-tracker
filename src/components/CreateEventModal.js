import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBill, getBills } from '../features/billSlice';
import '../styles/CreateEventModal.css'
import moment from 'moment';

export default function CreateEventModal(props) {
    const initialFormValues = {bill_name: '', bill_amount:''}
    const [inputValue, setInputValue] = useState(initialFormValues);
    const dispatch = useDispatch();

    let newBill = {
      bill_name: inputValue.bill_name,
      bill_amount: inputValue.bill_amount,
      due_date: moment(new Date(props.day.start)).format('YYYY-MM-DD')
    }

    const handleChange = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
      e.preventDefault()
      await dispatch(addBill(newBill));
      dispatch(getBills())
      props.setTrigger(false)
    }


  return (props.trigger) ? (
    <div id='create-event-modal' className='create-event-modal'style={{zIndex: 1000}}>
        <div className='create-event-modal-inner'>
          <form onSubmit={onSubmit}>
            <label>Add a New Bill that's due on {moment(new Date(props.start)).format('MM/DD/YYYY')}   
              <div className='bill-info-box'>
              <div className='billname-box'>
                <label className='input-label'> Bill Name: </label>
                  <input type='text' className='billname-input required' onChange={handleChange} name='bill_name' id='billName' placeholder='Enter bill name'/>                
              </div>

              <div className='billamount-box'>
                <label className='input-label'> Amount: </label>
                  <input type='text' className='billamount-input required' onChange={handleChange} name='bill_amount' id='billAmount' data-type='currency' placeholder='$0.00'/>
              </div>

              <div>
                <label className='date-input-label'>Date</label>
                <input type='date' onChange={handleChange} value={moment(new Date(props.day.start)).format('YYYY-MM-DD') ||''}/>
              </div>

              <button className='submit-button'>Submit</button>
              </div>
            </label> 
          </form>
          <button id='closeModal' className='create-modal-close-button' onClick={() => props.setTrigger(false)}>Close</button> 
        </div>
      </div>
  ) : ''
}

