import React from 'react';
import { Link } from 'react-router-dom';
import ToggleSwitch from './ToggleSwitch';
import billing from '../styles/icons/billing.png';
import home from '../styles/icons/Home.png';

export default function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo'>
        <h3>Bill Tracker</h3>
      </div>
      <div className='links'>
        <ToggleSwitch label="Darkmode:" className='toggle-btn'/>
        <Link to='/' className='home-button'>
          <img src={home} alt='Home'></img>
        </Link>
         <Link to='/bills' className='bills-button'> 
          <img src={billing} alt="Bills"/>
        </Link> 
      </div>
    </div>
  )
}
