import './App.css';
import Billform from './components/Billform.js';
import CalendarComponent from './components/CalendarComponent';
import Navbar from './components/Navbar';
import Bills from './components/Bills';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getBills } from './features/billSlice';
import EditBillForm from './components/EditBillForm';
import demo from './styles/icons/demo.gif';
import Loader from './components/Loader';

const  App = () => {
  const bills = useSelector(state => state.bill.bills);
  const state = useSelector(state => state.bill);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getBills())
  },[dispatch]);
 

  return ( state.loading ? (
    <Loader/>
  ) :
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<><Billform/> {!state.loading && bills.length === 0 ? (
        <div className='gif-container'>
          <h1>Start by adding a bill</h1>
          <img src={demo} alt='demo'/>
        </div>) : (<CalendarComponent/>)}</>}/>          
        <Route exact path='/bills' element={<Bills/>}/>        
        <Route path='/bills/edit/:id' Component={props => <EditBillForm {...props}/>}></Route>
      </Routes> 
      
      
    </div>
  )  
}

export default App;

