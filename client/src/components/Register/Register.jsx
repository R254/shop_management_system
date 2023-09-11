import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';

const Login = () => {
  const [values, setValues] = useState([]);
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  axios.defaults.withCredentials = true;
  useEffect(() => {
      axios.get('http://localhost:3002/')
      .then(res => {
          if (res.data.Status === 'Success') {
              setAuth(true);
          }else {
              setAuth(false)
          }
      })
    }, [])

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name] : [e.target.value]}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/register', values)
    .then(res => {
      if (res.data.Status === 'Success') {
        navigate('/login');
      }else{
        setError(res.data.error)
      }
    })
  };

  return (
    <>
      {
        auth
          ?
        <Layout/>
          :
        <div className='main_form'>
          <form onSubmit={handleSubmit} className="form mt-4 form__user">
              <h1 className="text-center fs-3">PLease Sign Up</h1>
              { error && (<p className='text-center text-danger'>{error}</p>) }
              <input 
                  type="text" 
                  name='firstname'
                  onChange={handleInput}
                  placeholder="First Name" 
                  className="form-control" 
              />
              <input 
                  type="text" 
                  name='lastname'
                  onChange={handleInput}
                  placeholder="Last Name" 
                  className="form-control" 
              />
              <input 
                  type="email" 
                  name='email'
                  onChange={handleInput}
                  placeholder="Enter Email" 
                  className="form-control" 
              />
              <input 
                  type="text" 
                  name='role'
                  onChange={handleInput}
                  placeholder="Enter Role" 
                  className="form-control" 
              />
              <input 
                  type="password"
                  name='password'
                  onChange={handleInput} 
                  placeholder="Enter Password" 
                  className="form-control" 
              />
              <div className="text-danger error-txt"></div>
              <button 
                  type="submit"
                  className="btn__custom btn__signin"
              >
                Sign Up
              </button>

              <p className="text-center">OR</p>

              <div>
              <p className="text-center">Already Registered? <Link to="/login" className="warning-a">Sign In</Link></p>
              </div>
              
          </form>
        </div>
      }
    </>
  );
};

export default Login;
