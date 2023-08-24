import React from 'react';
import '../styles/EventModal.css';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deleteBill, getBills } from '../features/billSlice';

export default function EventModal(props) {
  // console.log('event modal props', props)

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    let result = await dispatch(deleteBill(id));
    dispatch(getBills())
    props.setTrigger(false)
    props.myEvents.filter((event) => {
      return event !== event.id
    })
    // console.log('myEvents after delete', props.myEvents)
  }
    return (props.trigger) ? (
      <div id='event-modal' className='event-modal' style={{zIndex: 1000}}>
        <div className='event-modal-inner'>
          <p>{props.event.title}</p>
          <p>Due: {moment(props.event.start).format('MM/DD/YYYY')}</p>
          <button id='closeModal' className='modal-close-button' onClick={() => props.setTrigger(false)}>Close</button>
          <button onClick={()=>handleDelete(props.event.id)}>Delete</button>
        </div>
      </div>
    ) : '';
}
