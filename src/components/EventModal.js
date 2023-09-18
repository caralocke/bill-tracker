import React from 'react';
import '../styles/EventModal.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteBill, getBills } from '../features/billSlice';

export default function EventModal(props) {
  console.log(props.event)
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const choice = window.confirm (
      `Are you sure you want to delete ${props.event.title}?`
    )
    if (choice) {
      await dispatch(deleteBill(id));
      props.setTrigger(false)
      dispatch(getBills())
    } else {
      props.setTrigger(false)
    }
  }
    
      return (props.trigger) ? ( 
        <div id='event-modal' className='event-modal' onClick={() => props.setTrigger(false)} style={{zIndex: 800}}> 
            <div className='event-modal-inner'>
              <p className='event-title'>Name: {props.event.bill_name}</p>
              <p className='event-amount-due'>Amount: ${props.event.bill_amount}</p>
              <p className='event-due-date'>Due: {moment(new Date(props.event.start)).format('MM/DD/YYYY')}</p>
              <span id='closeModal' className='modal-close-button' onClick={() => props.setTrigger(false)}>x</span>
              <button onClick={()=>handleDelete(props.event.bill_id)}>Delete</button>
              <a href={`/bills/edit/${props.event.bill_id}`}><button>Edit</button></a>
            </div>
          </div>
      ) : '' ;
  }

