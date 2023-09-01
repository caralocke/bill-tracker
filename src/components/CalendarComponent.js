import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import EventModal from './EventModal';
import CreateEventModal from './CreateEventModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

let today = new Date();
let firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
let lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

export default function CalendarComponent() {
  const bills = useSelector((state)=>state.bill.bills);
  const [ myEvents, setMyEvents ] = useState([]);
  const [ modalState, setModalState ] = useState(false);
  const [ createEventModalState, setCreateEventModalState ] = useState(false);
  const [ selectedEvent, setSelectedEvent ] = useState(undefined);
  const [ createModalDay, setCreateModalDay ] = useState('');


  useEffect(() => {
  setMyEvents(bills)
  let total = 0;
  bills.forEach((bill) => {
    let {  start, bill_amount } = bill;
    let date = new Date(start)
    if (date >= firstDay && date <= lastDay) {
      total += Number(bill_amount)
    }
  })
  let weeklyEvent = {
    title: `Total due this week: $${total}`,
    bill_amount: total,
    start: firstDay,
    end: lastDay,
    hex_color: '50C878'
  }
  setMyEvents(prevEvents => [...prevEvents, weeklyEvent])
},[bills])

 const eventStyleGetter = (event, start, end, isSelected) => {
  var backgroundColor = '#' + event.hex_color;
  var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
  };
  return {
      style: style
  };
};

const handleSelectEvent = (event) => {
  setSelectedEvent(event)
  setModalState(true)
}

const handleSelectSlot = (day) => {
    setCreateEventModalState(true)
    setCreateModalDay(day)
  }

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  
   if (bills.length === 0) {
    return (
      <div>Please add a bill</div>
    );
   } else {
    return (
      <div className='calendar-container' >
      <Calendar 
         defaultDate={defaultDate}
         defaultView={Views.MONTH}
         events={myEvents}
         localizer={localizer}
         onSelectEvent={handleSelectEvent}
         onSelectSlot={handleSelectSlot}
         selectable
         eventPropGetter={eventStyleGetter}
         scrollToTime={scrollToTime}
         />
         <EventModal trigger={modalState} billData={bills} events={bills} event={selectedEvent} setTrigger ={setModalState}/>
       <CreateEventModal trigger={createEventModalState} billData={bills} day={createModalDay} events={bills} setTrigger={setCreateEventModalState}/>
    </div>
    );
   };
};