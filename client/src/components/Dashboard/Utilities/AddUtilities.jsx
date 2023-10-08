import axios from "axios";
import { useState } from "react";

const AddUtilities = () => {
    const [values, setValues] = useState([]);
    const [message, setMessage] = useState('');
    const [state, setState] = useState('');

    const handleInput = (e) => {
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}))
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post('http://localhost:3002/api/addutility', values)
        .then((res) => {
            if (res.data.Status === 'Success') {
                setMessage(res.data.message)
                setState('Success');
                setValues(e.target.reset())
              }else{
                setMessage(res.data.error)
                setState('error');
              }
        })
    }
  return (
    <>
        <form className="mt-3" onSubmit={handleSubmit}>
        {message && (<p className={state === 'Success' ? 'text-center text-success' : 'text-center text-danger'}>{message}</p>)}
        <div className="row mb-3">
          <div className="form-group col-md-4">
            <input name="username" type="text" className="form-control" placeholder="Name" onChange={handleInput} required/>
          </div>
          <div className="form-group col-md-4">
            <input name="purpose" type="text" className="form-control" placeholder="Purpose" onChange={handleInput} required/>
          </div>
          <div className="form-group col-md-4">
            <input name="amount" type="text" className="form-control" placeholder="Amount" onChange={handleInput} required/>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </>
  )
}

export default AddUtilities