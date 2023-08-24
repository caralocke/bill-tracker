import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { addBill } from '../features/billSlice';
import moment from 'moment';
import EventModal from './EventModal';
import CreateEventModal from './CreateEventModal';
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
  const [ modalState, setModalState ] = useState(false);
  const [ createEventModalState, setCreateEventModalState ] = useState(false);
  const [selectedEvent, setSelectedEvent ] = useState(undefined);
  const [ childData, setChildData ] = useState('');
  const [ createModalDay, setCreateModalDay ] = useState('')
  // console.log('childData', childData)
  // console.log('myEvents', myEvents)
  // console.log('weekly events', weeklyEvents)
  // console.log('billData', billData)

  const dispatch = useDispatch();
  

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
  })
 },[billData]);


 useEffect(() => {
   billData.forEach((bill) => {
    console.log('bill billDataUE', bill)        //////////////////////////////////////////////////////////////
    let date = moment(bill.dueDate).toDate();
    const start = firstDayWeek;
    const end = lastDayWeek;
    if (date >= start && date <= end){
      addWeeklyEvent(bill)
    } 
   })
 }, [billData])

useEffect(() => {
  myEvents.forEach((event) => {
    console.log('event myEvents UE', event)       ////////////////////////////////////////////////////////////
    let start = firstDayWeek;
    let end = lastDayWeek;
    if ((event.start && event.end >= start) && (event.start && event.end <= end)) {
      addWeeklyEvent(event)
    }
  })
}, [billData])

 useEffect(() => {
  let total = 0;
  weeklyEvents.forEach((event)  => {
    console.log('event weeklyEvents UE', event)     //////////////////////////////////////////////////////////
   total += Number(event.billAmount);
   let date = new Date();
   
   const start = moment(date.setDate(date.getDate() - date.getDay()));
   const end = moment(date.setDate(date.getDate() - date.getDay() + 6));
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

const handleSelectEvent = (event) => {
  setSelectedEvent(event)
  setModalState(true)
}


const childToParent = (childData) => {
  // setChildData(childData)
  // console.log('childData', childData)
}

const handleSelectSlot = (day) => {
  // console.log('day', day)
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

  
   if (myEvents.length === 0) {
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
         <EventModal trigger={modalState} billData={billData} setBillData={setBillData} myEvents={myEvents} event={selectedEvent} setTrigger ={setModalState}/>
      {/* {selectedEvent && <EventModal trigger={modalState} event={selectedEvent} setTrigger ={setModalState}/>} */}
       <CreateEventModal trigger={createEventModalState} billData={billData} setBillData={setBillData} day={createModalDay} myEvents={myEvents} setEvents={setEvents} childToParent={childToParent} setTrigger={setCreateEventModalState}/>
    </div>
    );
   };
};
