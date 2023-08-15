import React from 'react';
import Calendar from 'react-calendar';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComponent() {

  const bills = useSelector((state)=>state.bill.bills)
  console.log('calendar bills', bills)

  // bills.forEach(bill =>{
  //   if (bill.dueDate == date)
  // })

  const [date, setDate] = useState(new Date());

  return (
    <div>
      <div className='calendar-container'>
        <Calendar onChange={setDate} value={date}/>
      </div>
    </div>
  )
}
