import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsTable from "./ProductsTable";

const Products = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      await axios.get(`http://localhost:3002/api/products?q=${search}`)
      .then(response => {
        setProducts(response.data)
      })
    }
    if (search.length === 0 || search.length > 2) fetchProducts()
  }, [search])

 
  
  return (
    <>
      <div className="products-grp">
        <Link to='/addproduct' className="btn btn-primary m-1">Add Product</Link>
        <input type="text" placeholder="Search..." className="m-1" 
        onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ProductsTable data={products}/>
    </>
  )
}

export default Products