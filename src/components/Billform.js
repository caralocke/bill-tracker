import React from 'react'

export default function Billform() {

  const initialFormValues = {
    billName: '',
    billAmount: '',
    dueDate:''
  }

  return (
    <form>
      <div>
        <label>Bill Name:
          <input type='text' name='bill-name-input' placeholder='Enter bill name'/>
        </label>
      </div>
      <div>
        <label>Amount:
          <input type='text' name='bill-amount-input' data-type='currency' placeholder='$0.00'/>
        </label>
      </div>
      <div>
        <label>Due Date:
          <input type='date'/>
        </label>
      </div>
      <button>Submit</button>
    </form>
  )
}
