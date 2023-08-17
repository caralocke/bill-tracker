import './App.css';
import Billform from './components/Billform.js';
import CalendarComponent from './components/CalendarComponent';
import Navbar from './components/Navbar';
import Bills from './components/Bills';
import { Route, Routes, Redirect } from 'react-router-dom';

const  App = () => {
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