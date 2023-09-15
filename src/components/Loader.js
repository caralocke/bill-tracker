import React from 'react';
import '../styles/Loader.css'

export default function Loader() {
  return (
    <div className="bouncing-loader">
        <div className='loader-dots'></div>
        <div className='loader-dots'></div>
        <div className='loader-dots'></div>
      </div>
  )
}