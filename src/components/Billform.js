import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill, getBills } from '../features/billSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Billform.css'

const Billform = () => {
    const dispatch = useDispatch();
    const bills = useSelector((state) => state.bill.bills);
    const initialFormValues = {billName: '', billAmount: '', dueDate: '' };
    const [inputValue, setInputValue] = useState(initialFormValues);
    const [newData, setNewData] = useState(bills);
    const [isDisabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      setNewData(bills);
    },[bills]);


   let button = document.querySelector('.submit-button')

   const disable = () => {
    setDisabled(true)
    button.classList.remove('enabled')
    button.classList.add('disabled')
   }

   const enable = () => {
    setDisabled(false)
    button.classList.remove('disabled')
    button.classList.add('enabled')
   }

   

    const enableSubmit = () => {
      if (inputValue.billName === '' || inputValue.billName === null) {
        disable()
      } else if (inputValue.billAmount === '' || inputValue.billAmount === null) {
        disable()
      } else if (inputValue.dueDate === '' || inputValue.dueDate === null) {
        disable()
      } else {
        enable()
      }
    }

  

    const handleChange = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value});
    }

    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      let result = await dispatch(addBill(inputValue));
      setInputValue(initialFormValues);
      dispatch(getBills())
      .unwrap()
      .then((res) => {
        setNewData(res.data);
      })
      navigate('/bills');
    }
  

  return (
    <div>
      <div className='form-container'>
        <div>
          <form onSubmit={handleSubmit}>
            <label>Add a New Bill    
              <div className='bill-info-box'>
              <div className='billname-box'>
                <label className='input-label'> Bill Name: </label>
                  <input type='text' className='billname-input required' onKeyUp={enableSubmit} value={inputValue.billName} onChange={handleChange} name='billName' id='billName' placeholder='Enter bill name'/>                
              </div>

              <div className='duedate-box'>
                <label className='input-label'> Due date: </label>
                  <input type='date' className='date-input required' onKeyUp={enableSubmit} value={inputValue.dueDate} selected={inputValue.dueDate} onChange={handleChange} name="dueDate" id='dueDate'/>
              </div>

              <div className='billamount-box'>
                <label className='input-label'> Amount: </label>
                  <input type='text' className='billamount-input required' onKeyUp={enableSubmit} value={inputValue.billAmount} onChange={handleChange} name='billAmount' id='billAmount' data-type='currency' placeholder='$0.00'/>
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