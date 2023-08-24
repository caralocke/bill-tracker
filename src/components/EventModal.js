import React from 'react';
import '../styles/EventModal.css';
import moment from 'moment';

export default function EventModal(props) {
  console.log('modal props', props)
    return (props.trigger) ? (
      <div id='event-modal' className='event-modal'style={{zIndex: 1000}}>
        <div className='event-modal-inner'>
          <p>{props.event.title}</p>
          <p>Due: {moment(props.event.start).format('MM/DD/YYYY')}</p>
          <button id='closeModal' className='modal-close-button' onClick={() => props.setTrigger(false)}>Close</button>
        </div>
      </div>
    ) : '';
}
