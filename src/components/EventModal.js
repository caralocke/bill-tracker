import React from 'react';
import '../styles/EventModal.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteBill, getBills } from '../features/billSlice';

export default function EventModal(props) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const choice = window.confirm (
      `Are you sure you want to delete ${props.event.title}?`
    )
    if (choice) {
      await dispatch(deleteBill(id));
      props.setTrigger(false)
      dispatch(getBills())
    }
  }
  
      return (props.trigger) ? ( 
        <div id='event-modal' className='event-modal' style={{zIndex: 800}}> 
            <div className='event-modal-inner'>
              <p className='event-title'>{props.event.title}</p>
              <p className='event-amount-due'>Amount: ${props.event.bill_amount}</p>
              <p className='event-due-date'>Due: {moment(new Date(props.event.start)).format('MM/DD/YYYY')}</p>
              <button id='closeModal' className='modal-close-button' onClick={() => props.setTrigger(false)}>Close</button>
              <button onClick={()=>handleDelete(props.event.id)}>Delete</button>
            </div>
          </div>
      ) : '' ;
  }

