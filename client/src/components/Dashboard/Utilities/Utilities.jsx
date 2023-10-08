import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Utilities = () => {

  const [utilities, setUtilities] = useState([])
  const [search, setSearch] = useState([])
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchUtilities = async () => {
      await axios.get(`http://localhost:3002/api/utilities?q=${search}`)
      .then(response => {
        setUtilities(response.data)
      })
    }

    const checkRole = async () => {
      await axios.get('http://localhost:3002/')
      .then(res => {
        if (res.data.Status === 'Success') {
          setRole(res.data.role)
        }
      })
    }

    if (search.length === 0 || search.length > 2) fetchUtilities()
    checkRole()
    
  }, [search])
  
  let total_amount = 0
  
  return (
    <>
    <div className="products-grp">
      {
        role === 'admin' && (<Link to='/addutilities' className="btn btn-primary m-1">Add Utility</Link>)
      }
      <input type="text" placeholder="Search..." className="m-1" 
      onChange={(e) => setSearch(e.target.value)} />
    </div>
    <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">purpose</th>
            <th scope="col">Amount</th>
            <th scope="col">Added by</th>
          </tr>
        </thead>
        <tbody>
          {
            utilities.map((utility) => {

              const amount = utility.amount
              total_amount += amount

              return (
                <tr key={utility.id}>
                  <th scope="row">{utility.id}</th>
                  <td>{utility.username}</td>
                  <td>{utility.purpose}</td>
                  <td>{utility.amount}</td>
                  <td>{utility.user}</td>
                </tr>
              )
            })
          }
          
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3}>Totals</th>
            <th scope="row">{ total_amount }</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </>
  )
}

export default Utilities