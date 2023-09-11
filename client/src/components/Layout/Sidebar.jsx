import axios from "axios";
import { Link } from "react-router-dom"

const Sidebar = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    axios.get('http://localhost:3002/logout')
    .then(res => {
      if (res.data.Status === 'Success') {
        location.reload(true)
      }
    }).catch(err => console.log(err))
    }
  return (
    <div className="sidebar">
        <h1>Menu</h1>
        <ul className="sidebar_menu">
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/products'>products</Link>
            <Link to='/selling'>Prices</Link>
            <Link to='/expense'>expense</Link>
            <Link to='/sales'>Sales</Link>
            <Link onClick={handleLogout}>logout</Link>
        </ul>
    </div>
  )
}

export default Sidebar