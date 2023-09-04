import './App.css';
import Billform from './components/Billform.js';
import CalendarComponent from './components/CalendarComponent';
import Navbar from './components/Navbar';
import Bills from './components/Bills';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBills } from './features/billSlice';
import EditBillForm from './components/EditBillForm';

const  App = () => {
  const bills = useSelector(state => state.bill.bills);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBills())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<><Billform/> {bills.length === 0 ? (<div>Start by adding a bill</div>) : (<CalendarComponent/>)}</>}/>          
        <Route exact path='/bills' element={<Bills/>}/>        
        <Route path='/bills/edit/:id' Component={props => <EditBillForm {...props}/>}></Route>
      </Routes> 
      
      
    </div>
  );
}

export default App;

