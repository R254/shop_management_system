import axios from "axios"
import { useState } from "react"

const Sell = () => {
  const [values, setValues] = useState([]);
  const [message, setMessage] = useState('');
  const [state, setState] = useState('');

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
  }

  const sell = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/api/sell', values)
    .then((res) => {
      if (res.data.Status === 'Success') {
        setMessage(res.data.message)
        setState('Success');
        setValues(e.target.reset())
      }else if (res.data.Status === 'Updated') {
        setMessage(res.data.message)
        setState('Success');
        setValues(e.target.reset())
      }
      else{
        setMessage(res.data.error)
        setState('error');
      }
    })
  }
  return (
      <form className="mt-3" onSubmit={sell}>
        {message && (<p className={state === 'Success' ? 'text-center text-success' : 'text-center text-danger'}>{message}</p>)}
        <div className="row mb-3">
          <div className="form-group col-md-6">
            <input name="category" type="text" className="form-control" placeholder="Enter Category" onChange={handleInput} required/>
          </div>
          <div className="form-group col-md-6">
            <input name="name" type="text" className="form-control" placeholder="Product Name" onChange={handleInput} required/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-md-6">
            <input name="description" type="text" className="form-control" placeholder="Description" onChange={handleInput} required/>
          </div>
          <div className="form-group col-md-6">
            <input name="quantity" type="text" className="form-control" placeholder="Quantity" onChange={handleInput} required/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="form-group col-md-6">
            <input name="buying" type="text" className="form-control" placeholder="Buying" onChange={handleInput} required/>
          </div>
          <div className="form-group col-md-6">
            <input name="selling" type="text" className="form-control" placeholder="Selling" onChange={handleInput} required/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
  )
}

export default Sell