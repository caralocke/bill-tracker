import './App.css';
import Billform from './components/Billform.js';
import CalendarComponent from './components/CalendarComponent';
import Navbar from './components/Navbar';
import Bills from './components/Bills';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBills } from './features/billSlice';
import EditBillForm from './components/EditBillForm';

const  App = () => {

  const [ bills, setBills ] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBills())
    .then(res => {
      setBills(res.payload)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<><Billform/> {bills.length === 0 ? (<div>Start by adding a bill</div>) : (<CalendarComponent/>)}</>}/>          
        <Route exact path='/bills' element={<Bills/>}/>        
        <Route path='/bills/edit/:id' Component={props => <EditBillForm {...props} setBills={setBills}/>}></Route>
      </Routes> 
      
      
    </div>
  );
}

export default App;

