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
  console.log('myEvents', myEvents);
  // console.log('weekly events', weeklyEvents);
  // console.log('billData', billData)
  console.log('totalDue', totalDue);

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
      end: moment().format(bill.dueDate)
    }
    addEvent(newData);
  })
 },[billData]);


 useEffect(() => {
   billData.forEach((bill) => {
    let date = moment().format(bill.dueDate)
    const start = moment().format('2023-08-27')
    const end = moment().format('2023-09-02')
    if (date >= start && date <= end){
      addWeeklyEvent(bill)
    }
   })
 }, [billData])

 useEffect(() => {
  let total = 0;
  // let events = weeklyEvents;
  // for (const event of events) {
  //   total += Number(event.billAmount);
  //   let totalOfEvents = {
  //     id: event.id,
  //     title: `Total: $${total}`,
  //     start: new Date(2023, 7, 27),
  //     end: new Date(2023, 7, 27)
  //   }
  //   addEvent(totalDue)
  // }
  weeklyEvents.forEach((event)  => {
   console.log('event', event)
   total += Number(event.billAmount);
   console.log('total:', total)
   let totalOfEvents ={
    id: event.id,
    title: `$${total}`,
    start: new Date(2023, 7, 27),
    end: new Date(2023, 7, 27)
   }
   addTotalDue(totalOfEvents)
  })
 },[weeklyEvents])
 

 useEffect(() => {
  addEvent(totalDue)
 }, [totalDue])
 

 



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
