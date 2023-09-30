import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsTable from "./ProductsTable";

const Products = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')

  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchProducts = async () => {
      await axios.get(`http://localhost:3002/api/products?q=${search}`)
      .then(response => {
        setProducts(response.data)
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
    
    if (search.length === 0 || search.length > 2) fetchProducts()
    checkRole()
  }, [search])
  
  return (
    <>
      <div className="products-grp">
        {
          role === 'admin' && (<Link to='/addproduct' className="btn btn-primary m-1">Add Product</Link>)
        }
        <input type="text" placeholder="Search..." className="m-1" 
        onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ProductsTable data={products}/>
    </>
  )
}

export default Products