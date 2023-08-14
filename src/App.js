import './App.css';
import Billform from './components/Billform';
import CalendarComponent from './components/CalendarComponent';
import Bills from './components/Bills';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const  App = () => {
  const bills = useSelector((state) => state.bill.bills)
  console.log('App.js state', bills)
  return (
    <div className="App">
      <Billform/>
      <CalendarComponent/>
      <Bills/>
    </div>
  );
}

export default App;