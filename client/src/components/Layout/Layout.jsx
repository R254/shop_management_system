import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const Layout = () => {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3002/')
        .then(res => {
            if (res.data.Status === 'Success') {
                setAuth(true);
                setName(res.data.name)
                setRole(res.data.role)
                navigate('/products')
            }else {
                setAuth(false)
            }
        })
    }, [])
    
  return (
    <>
    {
        auth 
            ?
        <div className="layout">
            <Sidebar/>
            <div className="content">
                <nav className="content_banner">
                    <Link to='/dashboard'>One-Stop Shop</Link>
                    <p>Welcome back, {name}, {role}</p>
                </nav>
                <Outlet/>
            </div>
        </div>
            :
        <div>
            <h1>SMS</h1>
          <h3>Welcome to our site</h3>
          <p>Login or register to proceed</p>
          <Link to="/login" className="btn btn-success me-3">Sign In</Link>
          <Link to="/register" className="btn btn-success">Sign Up</Link>
        </div>
    }
    </>
  )
}

export default Layout