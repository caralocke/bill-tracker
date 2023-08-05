import './App.css';
import Billform from './components/Billform';
import CalendarComponent from './components/CalendarComponent';
import { connect } from 'react-redux';

function App(props) {
  console.log('App.js props', props)
  return (
    <div className="App">
      <Billform/>
      <CalendarComponent/>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('app.js state', state)
  return {
    bills: state.bills
  }
}

export default connect(mapStateToProps)(App);
