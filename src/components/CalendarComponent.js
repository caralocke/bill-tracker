import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import events from '../data'

const weeklyEvents = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date('2023-08-27'),
    end: new Date('2023-08-27'),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date('2023-09-01'),
    end: new Date('2023-09-01'),
  },
]

const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
  const bills = useSelector((state)=>state.bill.bills);
  const events = useSelector((state) => state.event.events)
  const [ billData, setBillData ] = useState(bills);
  const [ myEvents, setEvents ] = useState(events);
  const [ weeklyEvents, setWeeklyEvents ] = useState([]);
  const [ totalDue, setTotalDue ] = useState([]);
  console.log('myevents', myEvents)

  const addEvent = (event) => {
    setEvents((prevData) => [...prevData, event])
  }

  const addWeeklyEvent = (bill) => {
    setWeeklyEvents((prevData) => [...prevData, bill])
  }

  const addTotalDue = (event) => {
    setTotalDue(event)
  }

  useEffect(() => {
    setBillData(bills)
  }, [bills]);

 useEffect(() => {
  billData.forEach((bill) => {
    let newData = {
      id: bill.id,
      title: `${bill.billName}: $${bill.billAmount}`,
      start: moment().format(bill.dueDate),
      end: moment().format(bill.dueDate),
      hexColor: '00FFFF',
    }
    addEvent(newData);
  })
 },[billData]);


 useEffect(() => {
   billData.forEach((bill) => {
    let date = moment(bill.dueDate);
    const start = moment().startOf('week')
    const end = moment().endOf('week')
    if (date >= start && date <= end){
      addWeeklyEvent(bill)
    } 
   })
 }, [billData])

 useEffect(() => {
  let total = 0;
  weeklyEvents.forEach((event)  => {
   total += Number(event.billAmount);
   let totalOfEvents ={
    id: event.id,
    title: `This week: $${total}`,
    allDay: true,
    start: moment().startOf('week'),
    end: moment().startOf('week'),
    hexColor: '50C878'
   }
   addTotalDue(totalOfEvents)
  })
 },[weeklyEvents])
 

 useEffect(() => {
  addEvent(totalDue)
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
}
 

 



  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
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

  
   if (myEvents.length === 0) {
    return (
      <div>Please add a bill</div>
    )
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
    )
   }
}
