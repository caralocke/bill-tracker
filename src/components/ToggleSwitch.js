import React, { useState, useEffect } from 'react';
import '../styles/DarkMode.css';
import '../styles/LightMode.css';

export default function ToggleSwitch({ label }) {

  const [ theme, setTheme ] = useState('light');
  const  toggleTheme = () => {
  if (theme === 'dark') {
    setTheme('light')
    setThemeInStorage('light')
    } else {
    setTheme('dark')
    setThemeInStorage('dark')
    }
  };

  const setThemeInStorage = (theme) => {
    localStorage.setItem('theme', theme)
  }

  useEffect(() => {
    let theme = localStorage.getItem('theme')
    setTheme(theme)
  },[])

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className='toggle-container'>
      {label} {''}
      <div className='toggle-switch'>
        <input type='checkbox' className='checkbox' name={label} id={label} onClick={toggleTheme}/>
        <label className='label' htmlFor={label}>
          <span className='inner'/>
          <span className='switch'/>
        </label>
      </div>
    </div>
  )
}
