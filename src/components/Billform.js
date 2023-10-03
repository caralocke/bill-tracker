import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBill, getBills } from '../features/billSlice';
import '../styles/Billform.css'

const Billform = () => {
    const dispatch = useDispatch();
    const initialFormValues = {bill_name: '', bill_amount: '', due_date: '' };
    const [inputValue, setInputValue] = useState(initialFormValues);
    const [isDisabled, setDisabled] = useState(true);


   let button = document.querySelector('.submit-button');

   const disable = () => {
    setDisabled(true)
    button.classList.remove('enabled')
    button.classList.add('disabled')
   };

   const enable = () => {
    setDisabled(false)
    button.classList.remove('disabled')
    button.classList.add('enabled')
   };

   

    const enableSubmit = () => {
      if (inputValue.bill_name === '' || inputValue.bill_name === null) {
        disable()
      } else if (inputValue.bill_amount === '' || inputValue.bill_amount === null) {
        disable()
      } else if (inputValue.due_date === '' || inputValue.due_date === null) {
        disable()
      } else {
        enable()
      }
    }

  

  const handleChange = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value});
    };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    let bill = inputValue
    await dispatch(addBill(bill));
    await dispatch(getBills());
    setInputValue(initialFormValues);
  };

  return (
    <div>
      <div className='form-container'>
        <div>
          <form onSubmit={handleSubmit}>
            <label>Add a New Bill    
              <div className='bill-info-box'>
              <div className='billname-box'>
                <label className='input-label'> Bill Name: </label>
                  <input type='text' className='billname-input required' onKeyUp={enableSubmit} value={inputValue.bill_name} onChange={handleChange} name='bill_name' id='billName' placeholder='Enter bill name'/>                
              </div>

              <div className='duedate-box'>
                <label className='input-label'> Due date: </label>
                  <input type='date' className='date-input required' min={new Date().toISOString().split('T')[0]} onKeyUp={enableSubmit} value={inputValue.due_date} selected={inputValue.due_date} onChange={handleChange} name="due_date" id='dueDate'/>
              </div>

              <div className='billamount-box'>
                <label className='input-label'> Amount: </label>
                  <input type='text' className='billamount-input required' onKeyUp={enableSubmit} value={inputValue.bill_amount} onChange={handleChange} name='bill_amount' id='billAmount' data-type='currency' placeholder='$0.00'/>
              </div>

              <button className='submit-button disabled' disabled={isDisabled}>Submit</button>
              </div>
            </label> 
          </form>
          <div className='added-message'></div>
        </div>
      </div>
      
    </div>
  )
}

export default Billform;