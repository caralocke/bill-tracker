import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getBill, updateBill, getBills } from '../features/billSlice';

export default function EditBillForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFormValues = {bill_name: '', bill_amount: '', due_date: '' };
  const [ bill, setBill ] = useState(initialFormValues);

  useEffect(() => {
    dispatch(getBill(id))
    .then((res) => {
      setBill(res.payload)
    })
  }, [dispatch, id]);
  const handleChange = (e) => {
    setBill({
      ...bill,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateBill(bill))
    await dispatch(getBills())
      navigate('/')
  };

  const { bill_name, bill_amount, due_date } = bill;
  return (
    <div>
      <label>Edit Bill</label>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bill Name:</label>
          <input type='text' name='bill_name' value={bill_name} onChange={handleChange}/>
        </div>
        <div>
          <label>Amount:</label>
          <input type='text' name='bill_amount' value={bill_amount} onChange={handleChange}/>
        </div>        
        <div>
          <label>Due Date:</label>
          <input type='date' name='due_date' placeholder={due_date} value={due_date} onChange={handleChange}/>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}
