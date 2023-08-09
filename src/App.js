import './App.css';
import Billform from './components/Billform';
import CalendarComponent from './components/CalendarComponent';
import Bills from './components/Bills';
import { connect } from 'react-redux';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

const  App = () => {
  const bills = useSelector((state) => state.bill.bills)
  console.log('App.js state', bills)
  return (
    <div className="App">
      <Billform/>
      <Bills/>
      <CalendarComponent/>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   console.log('App.js state', state)
//   return {
//     state
//   }
// }

// const connectedApp = connect(mapStateToProps)(App)

// export default connectedApp;
export default App;