import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../data'

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [myEvents, setEvents] = useState()

  const bills = useSelector((state)=>state.bill.bills);
  console.log('calendar bills', bills);
  const [billData, setBillData] = useState(bills);
  console.log('billData calendar', billData);
  useEffect(() => {
    setBillData(bills)
  }, [bills]);

  return (
      <div className='calendar-container'>
        <Calendar 
          localizer={localizer} 
          startAccessor="startDate" 
          endAccessor="endDate" 
          defaultDate={moment().toDate()}
          />
      </div>
  )
}
