import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

let today = new Date();
let firstDayWeek = new Date(today.setDate(today.getDate() - today.getDay()));
let lastDayWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

export default function CalendarComponent() {
  const bills = useSelector((state)=>state.bill.bills);
  const events = useSelector((state) => state.event.events)
  const [ billData, setBillData ] = useState(bills);
  const [ myEvents, setEvents ] = useState(events);
  const [ weeklyEvents, setWeeklyEvents ] = useState([]);
  const [ totalDue, setTotalDue ] = useState([]);
  

  const addEvent = (event) => {
    setEvents((prevData) => [...prevData, event]);
  };

  const addWeeklyEvent = (bill) => {
    setWeeklyEvents((prevData) => [...prevData, bill]);
  };

  const addTotalDue = (event) => {
    setTotalDue(event);
  };

  useEffect(() => {
    setBillData(bills);
  }, [bills]);

 useEffect(() => {
  billData.forEach((bill) => {
    let date = bill.dueDate;
    const hours = 12;
    const minutes1 = 0;
    const minutes2 = 30;
    let newData = {
      id: bill.id,
      title: `${bill.billName}: $${bill.billAmount}`,
      start: moment(date).set('hour', hours).set('minute', minutes1).toDate(),
      end: moment(date).set('hour', hours).set('minute', minutes2).toDate(),
      hexColor: '00FFFF',
    };
    addEvent(newData);
    console.log('events', events)
  })
 },[billData]);


 useEffect(() => {
   billData.forEach((bill) => {
    let date = moment(bill.dueDate).toDate();
    console.log('bill name:', bill.billName, "due date:", date)
    const start = firstDayWeek;
    const end = lastDayWeek;
    if (date >= start && date <= end){
      addWeeklyEvent(bill)
    } 
   })
 }, [billData])

 useEffect(() => {
  let total = 0;
  weeklyEvents.forEach((event)  => {
   total += Number(event.billAmount);
   let date = new Date();
   
   const start = moment(date.setDate(date.getDate() - date.getDay()));
   const end = moment(date.setDate(date.getDate() - date.getDay() + 6));
   console.log('end', end)
   let totalOfEvents ={
    id: event.id,
    title: `Total for this week: $${total}`,
    allDay: true,
    start: start,
    end: end,
    hexColor: '50C878'
  }
   addTotalDue(totalOfEvents);
  })
 },[weeklyEvents]);
 

 useEffect(() => {
  addEvent(totalDue);
 }, [totalDue]);

 const eventStyleGetter = (event, start, end, isSelected) => {
  var backgroundColor = '#' + event.hexColor;
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
 

 



  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name');
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

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
  );

  
   if (myEvents.length === 0) {
    return (
      <div>Please add a bill</div>
    );
   } else {
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
         eventPropGetter={eventStyleGetter}
         scrollToTime={scrollToTime}
        />
    </div>
    );
   };
};
