import './App.css';
import Billform from './components/Billform.js';
import CalendarComponent from './components/CalendarComponent';
import Navbar from './components/Navbar';
import Bills from './components/Bills';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBills } from './features/billSlice';

const  App = () => {

  const bills = useSelector((state) => state.bill.bills);
  const [billData, setBillData] = useState(bills);
  const dispatch = useDispatch()
  useEffect(() => {
    setBillData(dispatch(getBills()));
  }, []);

  const events = useSelector((state) => state.event.events);
  const [eventsData, setEventsData] = useState([]);
  useEffect(() => {
    setEventsData(events)
  }, []);



  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<><Billform/><CalendarComponent/></>}/>          
        <Route exact path='/bills' element={<Bills/>}/>        
      </Routes> 
    </div>
  );
}

export default App;

