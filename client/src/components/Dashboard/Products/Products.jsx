import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3002/api/products')
    .then(response => {
      setProducts(response.data)
    })
  }, [])

  let grand_total_purchase = 0;
  let grand_total_sales = 0;
  let grand_total_profit = 0;
  return (
    <>      
      <Link to='/addproduct' className="btn btn-primary m-1">Add Product</Link>
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
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) => {
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
    </>
  )
}

export default Products