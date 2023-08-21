import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill, getBills } from '../features/billSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Billform.css'

const Billform = () => {
    const dispatch = useDispatch();
    const initialFormValues = {billName: '', billAmount: '', dueDate: '' };
    const [inputValue, setInputValue] = useState(initialFormValues);
    const bills = useSelector((state) => state.bill.bills);
    const navigate = useNavigate();
    const [newData, setNewData] = useState(bills)

    useEffect(() => {
      setNewData(bills)
    },[bills])

    const handleChange = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      let result = await dispatch(addBill(inputValue))
      setInputValue(initialFormValues)
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
              <div>
                <input type='text' className='billname-input' value={inputValue.billName} onChange={handleChange} name='billName' id='billName' placeholder='Enter bill name'/>
              </div>
              <div>
                <input type='text' className='billamount-input' value={inputValue.billAmount} onChange={handleChange} name='billAmount' id='billAmount' data-type='currency' placeholder='$0.00'/>
              </div>
              <div>
                <input type='date' className='date-input' value={inputValue.dueDate} onChange={handleChange} name="dueDate" id='dueDate'/>
              </div>
              <button>Submit</button>
            </label> 
          </form>
          <div className='added-message'></div>
        </div>
      </div>
      
    </div>
  )
}

export default Billform;