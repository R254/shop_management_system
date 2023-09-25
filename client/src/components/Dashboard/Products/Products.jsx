import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsTable from "./ProductsTable";
// import { productsList } from "../../Products";

const Products = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:3002/api/products`)
    .then(response => {
      setProducts(response.data)
    })
  }, [])

  const handleSearch = (data) => {
    return data.filter(product => 
      product.category.toLowerCase().includes(search) ||
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
      )
  }
  
  return (
    <>
      <div className="products-grp">
        <Link to='/addproduct' className="btn btn-primary m-1">Add Product</Link>
        <input type="text" placeholder="Search..." className="m-1" 
        onChange={(e) => setSearch(e.target.value)} />
      </div>
      <ProductsTable data={handleSearch(products)}/>
    </>
  )
}

export default Products