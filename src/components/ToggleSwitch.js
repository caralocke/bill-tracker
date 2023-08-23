import React, { useState, useEffect } from 'react';
import '../styles/DarkMode.css';
import '../styles/LightMode.css';

export default function ToggleSwitch({ label }) {
  let themeData = localStorage.getItem('theme')
  const [ theme, setTheme ] = useState(themeData);
  console.log('theme', theme)

  const  toggleTheme = () => {
  if (theme === 'light') {
    setTheme('dark')
    setThemeInStorage('dark')
    } else {
    setTheme('light')
    setThemeInStorage('light')
    }
  console.log('label', label)
  console.log('localStorage', localStorage)
  };

  const setThemeInStorage = (theme) => {
    localStorage.setItem('theme', theme)
  };

  useEffect(() => {
    let theme = localStorage.getItem('theme')
    setTheme(theme)
  },[]);

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme]);


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  

  return (
    <div className='toggle-container'>
      {label} {''}
      <div className='toggle-switch'>
        <input type='checkbox' className='checkbox' name={label} id={label} onClick={toggleTheme} />
        <label className='label' htmlFor={label}>
          <span className='inner'/>
          <span className='switch'/>
        </label>
      </div>
    </div>
  )
}
