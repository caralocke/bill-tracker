import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill, getBills } from '../features/billSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateEventModal.css'
import moment from 'moment';

export default function CreateEventModal(props) {
    // console.log('create event props', props)
    const bills = useSelector((state) => state.bill.bills)
    const initialFormValues = {billName: '', billAmount:''}
    const [inputValue, setInputValue] = useState(initialFormValues);
    const [ newData, setNewData ] = useState(bills);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const data = inputValue

    // let newEvent = {
    //   title: `${inputValue.billName}: $${inputValue.billAmount}`,
    //   start: props.day.start,
    //   end: props.day.end,
    //   hexColor: '00FFFF'
    // }  

    let newBill = {
      id: Math.random(),
      billName: inputValue.billName,
      billAmount: inputValue.billAmount,
      dueDate: moment(props.day.start).format('YYYY/MM/DD')
    }

    console.log('newBill', newBill)

    const handleChange = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
      e.preventDefault()
      // props.childToParent(data)
      // props.setEvents((prev) => [...prev, newEvent])
      // props.setBillData((prev) => [...prev, newBill])
      console.log('billData onsubmit', props.billData)
      let result = await dispatch(addBill(newBill));
      dispatch(getBills())
      .unwrap()
      .then((res) => {
        console.log('res', res)
        setNewData(res)
      })
      props.setTrigger(false)
      // navigate('/bills')
    }


  return (props.trigger) ? (
    <div id='create-event-modal' className='create-event-modal'style={{zIndex: 1000}}>
        <div className='create-event-modal-inner'>
          <form onSubmit={onSubmit}>
            <label>Add a New Bill that's due on {moment(props.start).format('MM/DD/YYYY')}   
              <div className='bill-info-box'>
              <div className='billname-box'>
                <label className='input-label'> Bill Name: </label>
                  <input type='text' className='billname-input required' onChange={handleChange} name='billName' id='billName' placeholder='Enter bill name'/>                
              </div>

              <div className='billamount-box'>
                <label className='input-label'> Amount: </label>
                  <input type='text' className='billamount-input required' onChange={handleChange} name='billAmount' id='billAmount' data-type='currency' placeholder='$0.00'/>
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

