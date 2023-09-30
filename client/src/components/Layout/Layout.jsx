import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const Layout = () => {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3002/')
        .then(res => {
            if (res.data.Status === 'Success') {
                setAuth(true);
                setName(res.data.name)
                navigate('/dashboard')
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
                    <p>Welcome back, {name}</p>
                </nav>
                <Outlet/>
            </div>
        </div>
            :
        <div className="home">
            <div className="home_content">
                <h1 className="home_logo">SMS</h1>
                <h3>Welcome to One_Stop Shop</h3>
                <p>Login or register to proceed</p>
                <div>
                    <Link to="/login" className="btn btn-success me-3">Sign In</Link>
                    <Link to="/register" className="btn btn-success">Sign Up</Link>
                </div>
            </div>
        </div>
    }
    </>
  )
}

export default Layout