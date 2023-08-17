import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar'>
      <div>
        <h3>Bill Tracker</h3>
      </div>
      <div className='links'>
        <Link to='/' className='home-button'>Home</Link>
        <Link to='/bills' className='bills-button'>View Bills</Link>
      </div>
    </div>
  )
}
