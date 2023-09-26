import axios from "axios"
import { useEffect, useState } from "react"

const Selling = () => {
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
        <input type="text" placeholder="Search..." className="m-1" 
        onChange={(e) => setSearch(e.target.value)} />
      </div>
     <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">description</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product) =>{
              return (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.selling}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default Selling