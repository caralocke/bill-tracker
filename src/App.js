import './App.css';
import Billform from './components/Billform';
import CalendarComponent from './components/CalendarComponent';

function App(props) {
  console.log('App.js props', props)
  return (
    <div className="App">
      <Billform/>
      <CalendarComponent/>
    </div>
  );
}

export default App;
