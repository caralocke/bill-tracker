import './App.css';
import Billform from './components/Billform';
import CalendarComponent from './components/CalendarComponent';
import { connect } from 'react-redux';

const  App = props => {
  console.log('App.js props', props)
  console.log('App.js bills', props.state.bills)
  return (
    <div className="App">
      <Billform/>
      <CalendarComponent/>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log('App.js state', state)
  return {
    state
  }
}

const connectedApp = connect(mapStateToProps)(App)

export default connectedApp;
