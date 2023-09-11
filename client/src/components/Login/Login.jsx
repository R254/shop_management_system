import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Layout from "../Layout/Layout";

const Login = () => {
  const [values, setValues] = useState([]);
  const [error, setError] = useState('');
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
    setValues
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3002/login', values)
    .then(res => {
      if (res.data.Status === 'Success') {
        navigate('/');
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
        <form onSubmit={handleLogin} className="form mt-4 form__user">
            <h1 className="text-center fs-3">PLease Login</h1>
            { error && (<p className='text-center text-danger'>{error}</p>) }
            <input 
                type="text" 
                name='email'
                onChange={handleInput}
                placeholder="Username" 
                className="form-control" 
            />
            <input 
                type="password" 
                name='password'
                onChange={handleInput} 
                placeholder="Enter Password" 
                className="form-control" 
            />
            <button 
                type="submit"
                className="btn__custom btn__signin"
            >Sign In</button>

            <p className="text-center">OR</p>

            <div>
            <p className="text-center">Forgot Password? <Link to='/signin' className="warning-a">Reset password</Link></p>
            <p className="text-center">Not Yet Registered? <Link to='/register' className='warning-a'>Sign Up</Link></p>
            </div>
            
        </form>
    </div>
    }
    </>
  )
}

export default Login