import './App.css';
import Billform from './components/Billform';
import CalendarComponent from './components/CalendarComponent';
import Bills from './components/Bills';

const  App = () => {
  return (
    <div className="App">
      <Billform/>
      <CalendarComponent/>
      <Bills/>
    </div>
  );
}

export default App;