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
  console.log('App bills', bills)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBills())
  },[])


  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<><Billform/> {bills.length === 0 ? (<div>Start by adding a bill</div>) : (<CalendarComponent/>)}</>}/>          
        <Route exact path='/bills' element={<Bills/>}/>        
      </Routes> 
    </div>
  );
}

export default App;

