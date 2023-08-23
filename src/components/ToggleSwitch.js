import React, { useState, useEffect } from 'react';
import '../styles/DarkMode.css';
import '../styles/LightMode.css';

export default function ToggleSwitch({ label }) {
  let themeData = localStorage.getItem('theme')
  let checkedData = JSON.parse(localStorage.getItem('checked'))
  const [ theme, setTheme ] = useState(themeData);
  const [checked, setChecked] = useState(checkedData)
  console.log('theme', theme)
  console.log('checkedData', checkedData)
  console.log('checked', checked)

  const  toggleTheme = () => {
  if (theme === 'light') {
    setTheme('dark')
    setThemeInStorage('dark')
    setChecked(true)
    setCheckedInStorage(checked)
    } else {
    setTheme('light')
    setThemeInStorage('light')
    setChecked(false)
    setCheckedInStorage(checked)
    }
  console.log('label', label)
  console.log('localStorage', localStorage)
  };

  const setThemeInStorage = (theme) => {
    localStorage.setItem('theme', theme)
  };

  const setCheckedInStorage = (checked) => {
    localStorage.setItem('checked', checked)
  }

  useEffect(() => {
    let theme = localStorage.getItem('theme')
    let checked = JSON.parse(localStorage.getItem('checked'))
    setTheme(theme)
    setChecked(checked)
  },[]);

  useEffect(() => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('checked', checked)
  }, [theme, checked]);


  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  

  return (
    <div className='toggle-container'>
      {label} {''}
      <div className='toggle-switch'>
        <input type='checkbox' className='checkbox' checked={checked} onChange={toggleTheme} name={label} id={label} onClick={toggleTheme} />
        <label className='label' htmlFor={label}>
          <span className='inner'/>
          <span className='switch'/>
        </label>
      </div>
    </div>
  )
}
