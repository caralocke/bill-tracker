import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBill, getBills } from '../features/billSlice';
import { useNavigate } from 'react-router-dom';

const Billform = () => {
    const dispatch = useDispatch();
    const initialFormValues = {billName: '', billAmount: '', dueDate: '' }
    const [inputValue, setInputValue] = useState(initialFormValues);
    const bills = useSelector((state) => state.bill.bills)
    const navigate = useNavigate();

    const [newData, setNewData] = useState(bills)

    useEffect(() => {
      setNewData(bills)
      console.log('newData', newData)
    },[bills])

    const handleChange = (e) => {
      setInputValue({...inputValue, [e.target.name]: e.target.value})
    }

    const handleSubmit  = async (e) => {
      e.preventDefault();
      let result = 
      await  dispatch(addBill(inputValue))
      setInputValue(initialFormValues)
      dispatch(getBills())
      .unwrap()
      .then((res) => {
        console.log('handleSubmit res', res)
        setNewData(res.data)
        console.log('handleSubmit newData', newData)
      })
      navigate('/bills')
    }
  

  return (
    <div>
      <div className='form-container'>
        <div>
          <h3>Add a New Bill</h3>
          <form onSubmit={handleSubmit}>
            <div>              
                <input type='text' value={inputValue.billName} onChange={handleChange} name='billName' id='billName' placeholder='Enter bill name'/>
            </div>
            <div>
                <input type='text' value={inputValue.billAmount} onChange={handleChange} name='billAmount' id='billAmount' data-type='currency' placeholder='$0.00'/>
            </div>
            <div>
                <input type='date' value={inputValue.dueDate} onChange={handleChange} name="dueDate" id='dueDate'/>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default Billform;