import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsTable = ({ data }) => {
  const [role, setRole] = useState('')


  axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkRole = async () => {
      await axios.get('http://localhost:3002/')
      .then(res => {
        if (res.data.Status === 'Success') {
          setRole(res.data.role)
        }
      })
    }
    checkRole()
  }, [])
  
  

    let grand_total_purchase = 0;
    let grand_total_sales = 0;
    let grand_total_profit = 0;
  return (
    <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">Qty/Units</th>
            <th scope="col">Buying</th>
            <th scope="col">Selling</th>
            <th scope="col">profit P/U</th>
            <th scope="col">T. Purchase</th>
            <th scope="col">T. Sales</th>
            <th scope="col">Profit/Item</th>
            {
              role === 'admin' || role === 'user' 
              ?
              <th scope="col" colSpan={3}>Action</th>
              :
              <></>
            }
            
          </tr>
        </thead>
        <tbody>
          {
            data.map((product) => {
              const profit_per_unit = Math.round((product.selling - product.buying) * 100)/100;
              const profit_per_item = Math.round((profit_per_unit * product.quantity) * 100)/100;
              const sub_total_purchase = Math.round((product.buying * product.quantity) * 100)/100;
              const sub_total_sales = product.selling * product.quantity;

              grand_total_purchase += sub_total_purchase;
              grand_total_purchase = Math.round(grand_total_purchase * 100)/100
              grand_total_sales += sub_total_sales;
              grand_total_profit += profit_per_item;
              grand_total_profit = Math.round(grand_total_profit * 100)/100

              return (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.category}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>{Math.round(product.buying * 100)/100}</td>
                  <td>{product.selling}</td>
                  <td>{profit_per_unit}</td>
                  <th scope="col">{sub_total_purchase}</th>
                  <th scope="col">{sub_total_sales}</th>
                  <td>{profit_per_item}</td>
                  {
                    role === "admin" 
                    ? 
                    <>
                      <td><Link className="btn btn-primary" to={`/sell/${product.id}`}>Sell</Link></td>
                      <td><Link className="btn btn-success" to={`/restock/${product.id}`}>Add</Link></td>
                      <td><Link className="btn btn-warning" to={`/edit/${product.id}`}>Edit</Link></td>
                    </>
                    : role === "user" ?
                    <td><Link className="btn btn-primary" to={`/sell/${product.id}`}>Sell</Link></td>
                    : 
                    <></>
                  }
                  
                  
                </tr>
              )
            })
          }
          
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={8}>Totals</th>
            <th>{grand_total_purchase}</th>
            <th>{grand_total_sales}</th>
            <th>{grand_total_profit}</th>
          </tr>
        </tfoot>
      </table>
  )
}

export default ProductsTable