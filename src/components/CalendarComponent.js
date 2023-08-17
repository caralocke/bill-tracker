import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {

  const bills = useSelector((state)=>state.bill.bills);
  console.log('calendar bills', bills);
  
  // const [date, setDate] = useState(new Date());
  
  // bills.forEach(bill =>{
  //   if (bill.dueDate === date) {
  //   }
  // });
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
