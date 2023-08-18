import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../data'

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const [myEvents, setEvents] = useState(events);
  console.log('myEvents', myEvents);

  const bills = useSelector((state)=>state.bill.bills);
  console.log('calendar bills', bills);
  const [billData, setBillData] = useState(bills);
  console.log('billData calendar', billData);
  useEffect(() => {
    setBillData(bills)
  }, [bills]);

 useEffect(() => {
  billData.forEach((bill) => {
    let newData = {
      id: bill.id,
      title: `${bill.billName} is $${bill.billAmount}`,
      start: new Date(bill.dueDate),
      end: new Date(bill.dueDate)
    }
    setEvents((prevData) => [...prevData, newData]);
  })
 },[billData])



  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  return (
      <div className='calendar-container'>
        <Calendar 
           defaultDate={defaultDate}
           defaultView={Views.MONTH}
           events={myEvents}
           localizer={localizer}
           onSelectEvent={handleSelectEvent}
           onSelectSlot={handleSelectSlot}
           selectable
           scrollToTime={scrollToTime}
          />
      </div>
  )
}
