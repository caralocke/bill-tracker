import React from 'react';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {

  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date}/>
      </div>
    </div>
  )
}
